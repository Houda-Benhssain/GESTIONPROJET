import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Edit, Trash2, ChevronDown, Calendar } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import TaskFilter from "../component/TaskFilter";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    statut: "all",
    project: "all",
    priorite: "all",
    assignedTo: "all",
    dueDate: "all",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, filters, tasks]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/taches");
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error);
    }
    setLoading(false);
  };

  const filterTasks = () => {
    let result = [...tasks];
  
   
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.projet.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (filters.statut !== "all") {
      result = result.filter((task) => task.statut === filters.statut);
    }
  
    if (filters.project !== "all") {
      result = result.filter((task) => task.projet.nom === filters.project);
    }

    if (filters.priorite !== "all") {
      result = result.filter((task) => task.priorite === filters.priorite);
    }
  
    
    if (filters.assignedTo !== "all") {
      result = result.filter((task) => task.user.nom === filters.assignedTo);
    }
  
    if (filters.dueDate !== "all") {
      result = result.filter((task) => task.dateFin === filters.dueDate);
    }
  
    setFilteredTasks(result);
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case "en attente":
        return "bg-gray-100 text-gray-800";
      case "en cours":
        return "bg-blue-100 text-blue-800";
      case "terminé":
        return "bg-green-100 text-green-800";
      case "annulee":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case "critique":
        return "bg-red-100 text-red-800";
      case "haute":
        return "bg-orange-100 text-orange-800";
      case "moyenne":
        return "bg-yellow-100 text-yellow-800";
      case "basse":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (dateFin, statut) => {
    return new Date(dateFin) < new Date() && statut !== "terminé";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-500 mt-1">Manage and track all your tasks</p>
            </div>
            <Link
              to="/create-task"
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>

              {showFilters && (
                <TaskFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  projects={Array.from(new Set(tasks.map((task) => task.projet.nom)))}
                  assignees={Array.from(new Set(tasks.map((task) => task.user.nom)))}
                />
              )}
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ||
                  filters.statut !== "all" ||
                  filters.project !== "all" ||
                  filters.priorite !== "all" ||
                  filters.assignedTo !== "all" ||
                  filters.dueDate !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first task"}
                </p>
                {!searchTerm &&
                  filters.statut === "all" &&
                  filters.project === "all" &&
                  filters.priorite === "all" &&
                  filters.assignedTo === "all" &&
                  filters.dueDate === "all" && (
                    <Link
                      to="/create-task"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Link>
                  )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.nom}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.projet.nom}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${getStatusColor(
                              task.statut
                            )}`}
                          >
                            {task.statut}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${getPriorityColor(
                              task.priorite
                            )}`}
                          >
                            {task.priorite}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(task.dateFin)}
                          {isOverdue(task.dateFin, task.statut) && (
                            <span className="text-red-500 ml-2">(Overdue)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <Link to={`/tasks/${task.id}/edit`} className="text-blue-600 hover:text-blue-800">
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button className="text-red-600 hover:text-red-800 ml-4">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TasksPage;
