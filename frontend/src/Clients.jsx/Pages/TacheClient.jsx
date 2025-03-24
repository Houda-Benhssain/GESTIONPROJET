import React from "react"
import { useState } from "react"
import HeaderClient from "../component/HeaderClient"
import FooterClient from "../component/FooterClient"
import { Search, Filter, Calendar, MoreHorizontal, ChevronDown, CheckCircle, XCircle, Clock, AlertTriangle, Tag, ArrowUp, ArrowDown,
} from "lucide-react"

const TacheClient = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("deadline")

  // Sample data for tasks
  const tasks = [
    {
      id: 1,
      title: "Valider les maquettes de la page d'accueil",
      description: "Examiner et approuver les designs proposés pour la nouvelle page d'accueil",
      status: "pending",
      priority: "high",
      deadline: "2023-04-10",
      createdAt: "2023-03-25",
      projectId: 1,
      projectName: "Refonte du site web",
      attachments: 2,
      comments: 3,
    },
    {
      id: 2,
      title: "Fournir le contenu pour la section 'À propos'",
      description: "Rédiger et envoyer le texte pour la section 'À propos' du nouveau site",
      status: "completed",
      priority: "medium",
      deadline: "2023-04-05",
      completedAt: "2023-04-03",
      createdAt: "2023-03-20",
      projectId: 1,
      projectName: "Refonte du site web",
      attachments: 1,
      comments: 2,
    },
    {
      id: 3,
      title: "Tester la version beta de l'application mobile",
      description: "Installer et tester la version beta de l'application sur différents appareils",
      status: "in-progress",
      priority: "high",
      deadline: "2023-04-15",
      createdAt: "2023-03-30",
      projectId: 2,
      projectName: "Application mobile",
      attachments: 0,
      comments: 5,
    },
    {
      id: 4,
      title: "Valider les fonctionnalités de l'application",
      description: "Vérifier que toutes les fonctionnalités demandées sont présentes et fonctionnelles",
      status: "pending",
      priority: "medium",
      deadline: "2023-04-20",
      createdAt: "2023-03-28",
      projectId: 2,
      projectName: "Application mobile",
      attachments: 1,
      comments: 0,
    },
    {
      id: 5,
      title: "Approuver le budget marketing Q2",
      description: "Examiner et approuver le budget proposé pour la campagne marketing du Q2",
      status: "completed",
      priority: "high",
      deadline: "2023-03-25",
      completedAt: "2023-03-24",
      createdAt: "2023-03-15",
      projectId: 3,
      projectName: "Campagne marketing Q2",
      attachments: 3,
      comments: 4,
    },
    {
      id: 6,
      title: "Fournir les accès au système actuel",
      description: "Partager les identifiants et accès nécessaires pour l'intégration CRM",
      status: "delayed",
      priority: "high",
      deadline: "2023-04-01",
      createdAt: "2023-03-20",
      projectId: 4,
      projectName: "Intégration CRM",
      attachments: 0,
      comments: 2,
    },
    {
      id: 7,
      title: "Valider la politique de sécurité",
      description: "Examiner et approuver la nouvelle politique de sécurité proposée",
      status: "pending",
      priority: "low",
      deadline: "2023-04-25",
      createdAt: "2023-04-01",
      projectId: 5,
      projectName: "Mise à jour sécurité",
      attachments: 1,
      comments: 0,
    },
  ]

  // Filter tasks based on status, priority and search term
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline)
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    } else if (sortBy === "created") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return 0
  })

  // Get status badge color and text
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", text: "En attente" }
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", text: "En cours" }
      case "completed":
        return { color: "bg-green-100 text-green-800", text: "Terminé" }
      case "delayed":
        return { color: "bg-red-100 text-red-800", text: "En retard" }
      default:
        return { color: "bg-gray-100 text-gray-800", text: "Inconnu" }
    }
  }

  // Get priority badge color and text
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return { color: "text-red-600", text: "Haute", icon: <ArrowUp className="h-3 w-3" /> }
      case "medium":
        return { color: "text-orange-600", text: "Moyenne", icon: <div className="h-3 w-3">-</div> }
      case "low":
        return { color: "text-blue-600", text: "Basse", icon: <ArrowDown className="h-3 w-3" /> }
      default:
        return { color: "text-gray-600", text: "Inconnue", icon: null }
    }
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get days remaining text and color
  const getDaysRemainingText = (deadline, status) => {
    if (status === "completed") {
      return { text: "Terminé", color: "text-green-600" }
    }

    const days = getDaysRemaining(deadline)

    if (days < 0) {
      return { text: "En retard de " + Math.abs(days) + " jours", color: "text-red-600" }
    } else if (days === 0) {
      return { text: "Dû aujourd'hui", color: "text-orange-600" }
    } else if (days === 1) {
      return { text: "Dû demain", color: "text-orange-600" }
    } else if (days <= 3) {
      return { text: `${days} jours restants`, color: "text-orange-600" }
    } else {
      return { text: `${days} jours restants`, color: "text-blue-600" }
    }
  }

  // Count tasks by status
  const countTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status).length
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <HeaderClient />

      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>Client</span>
                <span className="mx-2">›</span>
                <span>Tâches</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Vos tâches</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards overlapping the gradient header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{countTasksByStatus("pending")}</div>
                <div className="text-sm text-gray-500">En attente</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{countTasksByStatus("in-progress")}</div>
                <div className="text-sm text-gray-500">En cours</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{countTasksByStatus("completed")}</div>
                <div className="text-sm text-gray-500">Terminées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{countTasksByStatus("delayed")}</div>
                <div className="text-sm text-gray-500">En retard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto mt-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-blue-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                placeholder="Rechercher une tâche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-blue-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-blue-50"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="delayed">En retard</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 text-blue-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-blue-50"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)} >
                    <option value="all">Toutes les priorités</option>
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <ChevronDown className="h-4 w-4 text-blue-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-blue-50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="deadline">Trier par échéance</option>
                    <option value="priority">Trier par priorité</option>
                    <option value="created">Trier par date de création</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-blue-900">{task.title}</h2>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(task.status).color}`}
                        >
                          {getStatusBadge(task.status).text}
                        </span>
                        <span
                          className={`text-xs font-medium flex items-center gap-1 ${getPriorityBadge(task.priority).color}`}
                        >
                          Priorité {getPriorityBadge(task.priority).text}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                      <div className="text-xs text-blue-600 font-medium">Projet: {task.projectName}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Échéance: {formatDate(task.deadline)}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 sm:mt-0">
                      {task.attachments > 0 && (
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          {task.attachments}
                        </span>
                      )}

                     
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-md text-center">
              <XCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-blue-800 mb-1">Aucune tâche trouvée</h3>
              <p className="text-blue-500">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          )}
        </div>
      </div>
      <FooterClient />
    </div>
  )
}

export default TacheClient

