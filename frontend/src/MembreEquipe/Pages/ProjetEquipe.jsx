import React from "react"
import { useState } from "react"
import HeaderEquipe from "../component/HeaderEquipe"
import FooterEquipe from "../component/FooterEquipe"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MoreHorizontal,
  ChevronDown,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

const ProjetEquipe = () => {
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
      teamMembers: [
        { id: 1, name: "Jean Dupont", avatar: "JD", role: "Chef de projet", online: true },
        { id: 2, name: "Marie Lefebvre", avatar: "ML", role: "Développeur", online: true },
        { id: 3, name: "Pierre Bernard", avatar: "PB", role: "Designer", online: false },
      ],
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
      teamMembers: [
        { id: 2, name: "Marie Lefebvre", avatar: "ML", role: "Développeur", online: true },
        { id: 4, name: "Sophie Martin", avatar: "SM", role: "Développeur mobile", online: true },
      ],
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
      teamMembers: [
        { id: 5, name: "Lucas Petit", avatar: "LP", role: "Marketing", online: false },
        { id: 1, name: "Jean Dupont", avatar: "JD", role: "Chef de projet", online: true },
      ],
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
      teamMembers: [
        { id: 1, name: "Jean Dupont", avatar: "JD", role: "Chef de projet", online: true },
        { id: 6, name: "Emma Dubois", avatar: "ED", role: "Analyste", online: false },
      ],
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
      teamMembers: [
        { id: 7, name: "Thomas Leroy", avatar: "TL", role: "Sécurité IT", online: true },
        { id: 2, name: "Marie Lefebvre", avatar: "ML", role: "Développeur", online: true },
      ],
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
        return { color: "bg-purple-100 text-purple-800", text: "Planifié" }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderEquipe />
      <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-2">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>Équipes</span>
            <span className="mx-2">/</span>
            <span>Projets</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Projets de l'équipe</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
              <span>+ Nouveau projet</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total des projets</p>
                <h3 className="text-2xl font-bold text-gray-800">{projects.length}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En cours</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {projects.filter((p) => p.status === "in-progress").length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Terminés</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {projects.filter((p) => p.status === "completed").length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En retard</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {projects.filter((p) => p.status === "delayed").length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(project.status).color}`}
                        >
                          {getStatusBadge(project.status).text}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                        Détails
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>Échéance: {formatDate(project.deadline)}</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progression</span>
                          <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
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

                    <div className="sm:w-64">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Membres de l'équipe</h3>
                      <div className="space-y-2">
                        {project.teamMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                                member.online ? "bg-blue-600" : "bg-gray-400"
                              }`}
                            >
                              <span className="text-xs font-medium">{member.avatar}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                            <div
                              className={`w-2 h-2 rounded-full ml-auto ${
                                member.online ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm text-center">
              <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">Aucun projet trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          )}
        </div>
      </div>
      <FooterEquipe/>
    </div>
  )
}

export default ProjetEquipe

