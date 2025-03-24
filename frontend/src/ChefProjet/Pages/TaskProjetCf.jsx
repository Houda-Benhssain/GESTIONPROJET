import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"

const TachesProjetCf = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [filters, setFilters] = useState({
    statut: "all",
    project: "all",
    priorite: "all",
    assignedTo: "all",
    dueDate: "all",
  })

  // Sample data for demonstration
  const tasksData = [
    {
      id: 1,
      nom: "Créer maquette UI",
      statut: "completed",
      priorite: "haute",
      dateFin: "2025-04-15",
      projet: { nom: "Refonte Site Web" },
      user: { nom: "Sophie Martin" },
    },
    {
      id: 2,
      nom: "Développer API REST",
      statut: "in-progress",
      priorite: "critique",
      dateFin: "2025-03-30",
      projet: { nom: "Application Mobile" },
      user: { nom: "Thomas Dubois" },
    },
    {
      id: 3,
      nom: "Tester fonctionnalités",
      statut: "not-started",
      priorite: "moyenne",
      dateFin: "2025-04-20",
      projet: { nom: "Refonte Site Web" },
      user: { nom: "Julie Leroy" },
    },
    {
      id: 4,
      nom: "Déployer en production",
      statut: "blocked",
      priorite: "critique",
      dateFin: "2025-03-25",
      projet: { nom: "Application Mobile" },
      user: { nom: "Thomas Dubois" },
    },
    {
      id: 5,
      nom: "Rédiger documentation",
      statut: "in-progress",
      priorite: "basse",
      dateFin: "2025-04-10",
      projet: { nom: "Système CRM" },
      user: { nom: "Sophie Martin" },
    },
  ]

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [searchTerm, filters, tasks])

  const loadTasks = async () => {
    // Load tasks immediately without delay
    setTasks([...tasksData])
    setFilteredTasks([...tasksData])
  }

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

  const handleDeleteClick = (task) => {
    setTaskToDelete(task)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (taskToDelete) {
      // Remove from local data immediately
      const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id)
      // Update state
      setTasks(updatedTasks)
      setShowDeleteModal(false)
      setTaskToDelete(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "blocked":
        return "bg-red-100 text-red-800 border border-red-200"
      case "not-started":
        return "bg-gray-100 text-gray-800 border border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in-progress":
        return "En cours"
      case "blocked":
        return "Bloqué"
      case "not-started":
        return "Non démarré"
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600 mr-1" />
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-600 mr-1" />
      case "not-started":
        return <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />
      default:
        return null
    }
  }

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case "critique":
        return "bg-red-100 text-red-800 border border-red-200"
      case "haute":
        return "bg-orange-100 text-orange-800 border border-orange-200"
      case "moyenne":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "basse":
        return "bg-green-100 text-green-800 border border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getPriorityText = (priorite) => {
    switch (priorite) {
      case "critique":
        return "Critique"
      case "haute":
        return "Haute"
      case "moyenne":
        return "Moyenne"
      case "basse":
        return "Basse"
      default:
        return priorite
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const isOverdue = (dateFin, statut) => {
    return new Date(dateFin) < new Date() && statut !== "completed"
  }

  // TaskFilter component
  const TaskFilter = ({ filters, onFilterChange, projects, assignees }) => {
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            className="block w-full pl-3 pr-10 py-2 text-sm border border-blue-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            value={filters.statut}
            onChange={(e) => onFilterChange("statut", e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Terminé</option>
            <option value="in-progress">En cours</option>
            <option value="blocked">Bloqué</option>
            <option value="not-started">Non démarré</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Projet</label>
          <select
            className="block w-full pl-3 pr-10 py-2 text-sm border border-blue-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            value={filters.project}
            onChange={(e) => onFilterChange("project", e.target.value)}
          >
            <option value="all">Tous les projets</option>
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            className="block w-full pl-3 pr-10 py-2 text-sm border border-blue-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            value={filters.priorite}
            onChange={(e) => onFilterChange("priorite", e.target.value)}
          >
            <option value="all">Toutes les priorités</option>
            <option value="critique">Critique</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigné à</label>
          <select
            className="block w-full pl-3 pr-10 py-2 text-sm border border-blue-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            value={filters.assignedTo}
            onChange={(e) => onFilterChange("assignedTo", e.target.value)}
          >
            <option value="all">Tous les membres</option>
            {assignees.map((assignee, index) => (
              <option key={index} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
          <select
            className="block w-full pl-3 pr-10 py-2 text-sm border border-blue-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            value={filters.dueDate}
            onChange={(e) => onFilterChange("dueDate", e.target.value)}
          >
            <option value="all">Toutes les dates</option>
            {Array.from(new Set(tasks.map((task) => task.dateFin))).map((date, index) => (
              <option key={index} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderChefProjet />

      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Tâches</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestion des Tâches</h1>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 py-8 -mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <p className="text-gray-600 mt-1">Gérer et suivre toutes les tâches du projet</p>
          </div>
          <Link
            to="/create-task"
            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une tâche
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-100 mb-6">
          <div className="p-4 border-b border-blue-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Rechercher des tâches..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
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

          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                <Filter className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune tâche trouvée</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm ||
                filters.statut !== "all" ||
                filters.project !== "all" ||
                filters.priorite !== "all" ||
                filters.assignedTo !== "all" ||
                filters.dueDate !== "all"
                  ? "Essayez d'ajuster vos critères de recherche ou de filtrage"
                  : "Commencez par créer votre première tâche"}
              </p>
              {!searchTerm &&
                filters.statut === "all" &&
                filters.project === "all" &&
                filters.priorite === "all" &&
                filters.assignedTo === "all" &&
                filters.dueDate === "all" && (
                  <Link
                    to="/create-task"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une tâche
                  </Link>
                )}
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
                      Assigné à
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Date d'échéance
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-700">{task.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.projet.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-semibold inline-flex items-center rounded-full ${getStatusColor(
                            task.statut,
                          )}`}
                        >
                          {getStatusIcon(task.statut)}
                          {getStatusText(task.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-semibold inline-block rounded-full ${getPriorityColor(
                            task.priorite,
                          )}`}
                        >
                          {getPriorityText(task.priorite)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.user.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                          <span className="text-sm text-gray-900">{formatDate(task.dateFin)}</span>
                          {isOverdue(task.dateFin, task.statut) && (
                            <span className="flex items-center text-xs text-red-600 ml-2">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              En retard
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/tasks/edit/${task.id}`}
                            className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            title="Modifier la tâche"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(task)}
                            className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                            title="Supprimer la tâche"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="p-4 border-t border-blue-100 flex justify-between items-center text-sm text-gray-600">
              <div>
                Affichage de {filteredTasks.length} tâche{filteredTasks.length > 1 ? "s" : ""}
              </div>
              <div className="text-gray-500">
                <span>Mis à jour il y a 2 minutes</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterChefProjet />

      {/* Delete task confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer la tâche</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-red-600">{taskToDelete?.nom}</span>
              ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TachesProjetCf

