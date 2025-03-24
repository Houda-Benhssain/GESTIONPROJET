import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  ChevronRight,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Flag,
  Users,
} from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"
import TaskFilter from "../component/TaskFilter"

const DeleteTaskModal = ({ task, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer la tâche</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-blue-600">{task.nom}</span>? Cette
          action ne peut pas être annulée.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

const TasksPage = () => {
<<<<<<< HEAD
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
=======
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0

  const [filters, setFilters] = useState({
    statut: "all",
    project: "all",
    priorite: "all",
    assignedTo: "all",
    dueDate: "all",
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [searchTerm, filters, tasks])

  const loadTasks = async () => {
    setLoading(true)
    try {
<<<<<<< HEAD
      const response = await fetch("http://127.0.0.1:8000/taches/")
      const data = await response.json()
      setTasks(data)
      setFilteredTasks(data)
=======
      const response = await fetch("http://127.0.0.1:8000/taches/");
      const data = await response.json();
      console.log(data); // Vérifie la structure des données ici
      setTasks(data);
      setFilteredTasks(data);
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error)
    }
<<<<<<< HEAD
    setLoading(false)
  }
=======
    setLoading(false);
  };
  
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0

  const filterTasks = () => {
    let result = [...tasks]

    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.projet.nom.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.statut !== "all") {
      result = result.filter((task) => task.statut === filters.statut)
    }

    if (filters.project !== "all") {
      result = result.filter((task) => task.projet.nom === filters.project)
    }

    if (filters.priorite !== "all") {
      result = result.filter((task) => task.priorite === filters.priorite)
    }

    if (filters.assignedTo !== "all") {
      result = result.filter((task) => task.user.nom === filters.assignedTo)
    }

    if (filters.dueDate !== "all") {
      result = result.filter((task) => task.dateFin === filters.dueDate)
    }

    setFilteredTasks(result)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleDelete = async () => {
    if (!taskToDelete) return

    try {
      await fetch(`http://127.0.0.1:8000/taches/${taskToDelete.id}`, {
        method: "DELETE",
      })
      // Supprimer la tâche de la liste sans recharger la page
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
      setFilteredTasks(filteredTasks.filter((task) => task.id !== taskToDelete.id))
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error)
    }
    setIsModalOpen(false)
    setTaskToDelete(null)
  }

  const openDeleteModal = (task) => {
    setTaskToDelete(task)
    setIsModalOpen(true)
  }

  const getStatusColor = (statut) => {
    switch (statut) {
      case "en attente":
        return "bg-yellow-100 text-yellow-800"
      case "en cours":
        return "bg-blue-100 text-blue-800"
      case "terminee":
        return "bg-green-100 text-green-800"
      case "annulee":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut) => {
    switch (statut) {
      case "en attente":
        return <Clock className="h-3 w-3 mr-1" />
      case "en cours":
        return <Clock className="h-3 w-3 mr-1" />
      case "terminee":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "annulee":
        return <AlertCircle className="h-3 w-3 mr-1" />
      default:
        return <Clock className="h-3 w-3 mr-1" />
    }
  }

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case "critique":
        return "bg-red-100 text-red-800"
      case "haute":
        return "bg-orange-100 text-orange-800"
      case "moyenne":
        return "bg-yellow-100 text-yellow-800"
      case "basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const isOverdue = (dateFin, statut) => {
    return new Date(dateFin) < new Date() && statut !== "terminé"
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-6 px-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Tâches</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestion des Tâches</h1>
        </div>
      </div>

      <main className="flex-grow p-4 md:p-6 -mt-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Stats card */}
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <div className="text-sm text-gray-500">Tâches totales</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
=======
    
    <div className="flex flex-col min-h-screen bg-blue-50">
  <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center text-xs text-blue-100 mb-2">
        <span>Projets</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Gestion des Taches</h1>
    </div>
  </div>
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">


          <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{tasks.length}</div>
                      <div className="text-sm text-gray-500">Nombre de projets</div>
                    </div>
                  </div>
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0
            <div>
              <h2 className="text-xl font-bold text-gray-800">Liste des Tâches</h2>
              <p className="text-sm text-gray-500 mt-1">Gérez et suivez toutes vos tâches</p>
            </div>
            <Link
              to="/create-task"
              className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une nouvelle tâche
            </Link>
          </div>

          {/* Filters and search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des tâches..."
                  className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-blue-100">
                <TaskFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  projects={Array.from(new Set(tasks.map((task) => task.projet.nom)))}
                  assignees={Array.from(new Set(tasks.map((task) => task.user.nom)))}
                />
              </div>
            )}
          </div>

          {/* Tasks table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-blue-600">Chargement des tâches...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-blue-600" />
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
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Tâche
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Projet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Priorité
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Date d'échéance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Assigné à
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{task.nom}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600">{task.projet.nom}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex items-center text-xs font-semibold rounded-full ${getStatusColor(
                              task.statut,
                            )}`}
                          >
                            {getStatusIcon(task.statut)}
                            {task.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex items-center text-xs font-semibold rounded-full ${getPriorityColor(
                              task.priorite,
                            )}`}
                          >
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priorite}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700">{formatDate(task.dateFin)}</span>
                            {isOverdue(task.dateFin, task.statut) && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                                En retard
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <Users className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">{task.user.nom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/tasks/${task.id}/edit`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => openDeleteModal(task)}
                              className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
<<<<<<< HEAD
=======
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {task.user.nom}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex justify-start gap-4 items-center">
                          <Link to={`/tasks/${task.id}/edit`} className="text-blue-600 hover:text-blue-800">
                               <Edit className="h-5 w-5" />
                           </Link>
                          <button
                            onClick={() => openDeleteModal(task)}
                            className="text-red-600 hover:text-red-800"  >
                         <Trash2 className="h-5 w-5" />
                         </button>
                         </div>
                      </td>
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0
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

      {/* Modal de confirmation */}
      {isModalOpen && taskToDelete && (
        <DeleteTaskModal task={taskToDelete} onCancel={() => setIsModalOpen(false)} onConfirm={handleDelete} />
      )}
    </div>
<<<<<<< HEAD
  )
}

export default TasksPage
=======
    </div>
  );
};
>>>>>>> 21e0198e247f1c500c979e8b47dcc03834bda3a0

