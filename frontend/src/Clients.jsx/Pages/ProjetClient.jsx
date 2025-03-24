import React from "react"
import { useState } from "react"
import HeaderClient from "../component/HeaderClient"
import FooterClient from "../component/FooterClient"
import {Search,Filter,Calendar,MoreHorizontal,ChevronDown,CheckCircle,XCircle,FileText,Clock,} from "lucide-react"

const ProjectClient = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Sample data for projects
  const projects = [
    {
      id: 1,
      name: "Refonte du site web",
      description: "Mise à jour complète du site web de l'entreprise avec nouveau design et fonctionnalités",
      status: "in-progress",
      progress: 65,
      deadline: "2023-04-15",
      startDate: "2023-01-10",
      tasks: { total: 24, completed: 16 },
    },
    {
      id: 2,
      name: "Application mobile",
      description: "Développement d'une application mobile pour les clients avec fonctionnalités de suivi",
      status: "in-progress",
      progress: 40,
      deadline: "2023-05-20",
      startDate: "2023-02-05",
      tasks: { total: 32, completed: 13 },
    },
    {
      id: 3,
      name: "Campagne marketing Q2",
      description: "Planification et exécution de la campagne marketing pour le deuxième trimestre",
      status: "completed",
      progress: 100,
      deadline: "2023-03-30",
      startDate: "2023-02-15",
      tasks: { total: 18, completed: 18 },
    },
    {
      id: 4,
      name: "Intégration CRM",
      description: "Intégration du nouveau système CRM avec les outils existants",
      status: "planned",
      progress: 0,
      deadline: "2023-06-10",
      startDate: "2023-04-20",
      tasks: { total: 15, completed: 0 },
    },
    {
      id: 5,
      name: "Mise à jour sécurité",
      description: "Audit et mise à jour des protocoles de sécurité sur tous les systèmes",
      status: "delayed",
      progress: 25,
      deadline: "2023-03-15",
      startDate: "2023-02-01",
      tasks: { total: 20, completed: 5 },
    },
  ]

  // Filter projects based on status and search term
  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.startDate) - new Date(b.startDate)
    } else if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline)
    } else if (sortBy === "progress") {
      return b.progress - a.progress
    }
    return 0
  })

  // Get status badge color and text
  const getStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", text: "En cours" }
      case "completed":
        return { color: "bg-green-100 text-green-800", text: "Terminé" }
      case "planned":
        return { color: "bg-indigo-100 text-indigo-800", text: "Planifié" }
      case "delayed":
        return { color: "bg-red-100 text-red-800", text: "En retard" }
      default:
        return { color: "bg-gray-100 text-gray-800", text: "Inconnu" }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderClient />

      {/* Blue gradient header like in the image */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>Client</span>
                <span className="mx-2">›</span>
                <span>Projets</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Vos projets</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards overlapping the gradient header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {projects.reduce((acc, project) => acc + project.tasks.completed, 0)}
                </div>
                <div className="text-sm text-gray-500">Tâches terminées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{projects.filter((p) => p.status === "in-progress").length}</div>
              <div className="text-sm text-gray-500">Projets en cours</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg flex items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-gray-500">Réunions prévues</div>
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
                placeholder="Rechercher un projet..."
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
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="planned">Planifié</option>
                    <option value="delayed">En retard</option>
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
                    <option value="date">Trier par date</option>
                    <option value="deadline">Trier par échéance</option>
                    <option value="progress">Trier par progression</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-blue-900">{project.name}</h2>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(project.status).color}`}
                        >
                          {getStatusBadge(project.status).text}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-blue-50 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 mb-4">
                    <div>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <Calendar className="h-4 w-4" />
                          <span>Échéance: {formatDate(project.deadline)}</span>
                        </div>

                        {project.status !== "completed" && (
                          <div className="flex items-center gap-1 text-sm text-orange-600">
                            <Clock className="h-4 w-4" />
                            <span>
                              {getDaysRemaining(project.deadline) > 0
                                ? `${getDaysRemaining(project.deadline)} jours restants`
                                : "Délai dépassé"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progression</span>
                          <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              project.status === "delayed"
                                ? "bg-red-500"
                                : project.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">
                            {project.tasks.completed}/{project.tasks.total} tâches
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-md text-center">
              <XCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-blue-800 mb-1">Aucun projet trouvé</h3>
              <p className="text-blue-500">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          )}
        </div>
      </div>
      <FooterClient />
    </div>
  )
}

export default ProjectClient

