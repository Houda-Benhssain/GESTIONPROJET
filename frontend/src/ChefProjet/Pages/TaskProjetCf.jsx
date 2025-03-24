import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Edit, Trash2, ChevronDown } from "lucide-react";
import HeaderChefProjet from "../component/HeaderChefProjet";
import FooterChefProjet from "../component/FooterChefProjet";
import TaskFilter from "../component/TasksFilterCf";

const TachesProjetCf = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/taches");
      const data = await response.json();

      // Filtrer les tâches pour l'utilisateur actuel
      const userTasks = data.filter((task) => task.projet.user_id === userId);
      setTasks(userTasks);
      setFilteredTasks(userTasks);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

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

  useEffect(() => {
    filterTasks();
  }, [searchTerm, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await fetch(`http://127.0.0.1:8000/taches/${taskToDelete.id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setFilteredTasks(filteredTasks.filter((task) => task.id !== taskToDelete.id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case "en attente":
        return "bg-gray-100 text-gray-800";
      case "en cours":
        return "bg-blue-100 text-blue-800";
      case "terminée":
        return "bg-green-100 text-green-800";
      case "annulée":
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
    return new Date(dateFin) < new Date() && statut !== "terminée";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
              <p className="text-gray-500 mt-1">Gérez et suivez toutes vos tâches</p>
            </div>
            <Link
              to="/create-task-cf"
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une tâche
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
                    placeholder="Rechercher des tâches..."
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
                <p className="mt-4 text-gray-500">Chargement des tâches...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <p className="mt-4 text-gray-500">Aucune tâche trouvée</p>
              </div>
            ) : (
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nom de la tâche</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Projet</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Statut</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Priorité</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Échéance</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className={isOverdue(task.dateFin, task.statut) ? "bg-red-100" : ""}>
                      <td className="px-4 py-2">{task.nom}</td>
                      <td className="px-4 py-2">{task.projet.nom}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.statut)}`}>
                          {task.statut}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priorite)}`}>
                          {task.priorite}
                        </span>
                      </td>
                      <td className="px-4 py-2">{formatDate(task.dateFin)}</td>
                      <td className="px-4 py-2">
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="text-yellow-600 hover:text-yellow-800 mr-2"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(task)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Modal de suppression */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-900">Êtes-vous sûr ?</h2>
            <p className="mt-2 text-gray-600">Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 mr-2 bg-gray-200 text-gray-900 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterChefProjet />
    </div>
  );
};

export default TachesProjetCf;


