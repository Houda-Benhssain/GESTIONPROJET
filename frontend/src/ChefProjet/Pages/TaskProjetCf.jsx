import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown } from "lucide-react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"
import TaskFilter from "../component/TasksFilterCf"

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

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await fetch(`http://127.0.0.1:8000/taches/${taskToDelete.id}`, {
        method: "DELETE",
      });
      // Supprimer la tâche de la liste sans recharger la page
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
      case "terminee":
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
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
              <p className="text-gray-500 mt-1">Gérez et suivez toutes vos tâches</p>
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune tâche trouvée</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ||
                  filters.statut !== "all" ||
                  filters.project !== "all" ||
                  filters.priorite !== "all" ||
                  filters.assignedTo !== "all" ||
                  filters.dueDate !== "all"
                    ? "Essayez d'ajuster vos critères de recherche."
                    : "Il semble que vous n'ayez encore aucune tâche."}
                </p>
                <Link
                  to="/create-task"
                  className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Ajouter une tâche
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tâche
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Projet
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priorité
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'échéance
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attribuer à
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
                            <span className="text-red-500 ml-2">(En retard)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.user.nom}</td>
                        <td className="px-4 py-3 text-sm font-medium">
  <div className="flex justify-start gap-4 items-center">
    <Link to={`/tasks/edit/${task.id}`} className="text-blue-600 hover:text-blue-800">
      <Edit className="h-5 w-5" />
    </Link>
    <button
      onClick={() => openDeleteModal(task)}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  </div>
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
      <FooterChefProjet />

      {/* Modal de confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900">Êtes-vous sûr ?</h3>
            <p className="text-sm text-gray-500 mt-2">Voulez-vous vraiment supprimer cette tâche ? Cette action est irréversible.</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TachesProjetCf

