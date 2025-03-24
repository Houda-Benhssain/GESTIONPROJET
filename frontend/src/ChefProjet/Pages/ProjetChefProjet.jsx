import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown, ChevronRight, Briefcase, Calendar } from "lucide-react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"

const ProjectChefProjet = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    client: "all",
    dateRange: "all",
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [clients, setClients] = useState([])

  // Effect to load projects and clients
  useEffect(() => {
    loadProjects()

  }, [])

  // Effect to filter projects based on criteria
  useEffect(() => {
    filterProjects()
  }, [searchTerm, filters, projects])

  const loadProjects = async () => {
    try {
      // This would be replaced with your actual API call
      const data = [
        {
          id: 1,
          nom: "E-commerce Platform",
          description: "A comprehensive e-commerce solution with payment integration",
          client_id: 1,
          statut: "en cours",
          dateDebut: "2023-11-15",
          progress: 65,
          team: ["JD", "ML", "PB"],
        },
        {
          id: 2,
          nom: "Mobile Banking App",
          description: "Secure mobile banking application with biometric authentication",
          client_id: 2,
          statut: "en attente",
          dateDebut: "2024-01-30",
          progress: 20,
          team: ["SM", "JD"],
        },
        {
          id: 3,
          nom: "Healthcare Dashboard",
          description: "Interactive dashboard for healthcare professionals",
          client_id: 3,
          statut: "termine",
          dateDebut: "2023-10-05",
          progress: 100,
          team: ["PB", "ML"],
        },
        {
          id: 4,
          nom: "Inventory Management System",
          description: "Real-time inventory tracking and management system",
          client_id: 1,
          statut: "en cours",
          dateDebut: "2023-11-20",
          progress: 45,
          team: ["JD", "SM", "ML"],
        },
        {
          id: 5,
          nom: "Educational Platform",
          description: "Online learning platform with interactive courses and assessments",
          client_id: 2,
          statut: "en attente",
          dateDebut: "2024-02-10",
          progress: 10,
          team: ["PB"],
        },
      ]
      setProjects(data)
      setFilteredProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

 
  const filterProjects = () => {
    let result = [...projects]

    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.status !== "all") {
      result = result.filter((project) => project.statut === filters.status)
    }

    if (filters.client !== "all") {
      const clientId = Number.parseInt(filters.client)
      result = result.filter((project) => project.client_id === clientId)
    }

    if (filters.dateRange !== "all") {
      const now = new Date()
      const thirtyDaysAgo = new Date(now)
      thirtyDaysAgo.setDate(now.getDate() - 30)

      const ninetyDaysAgo = new Date(now)
      ninetyDaysAgo.setDate(now.getDate() - 90)

   
    }

    setFilteredProjects(result)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

 
  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (projectToDelete) {
      // This would be replaced with your actual API call
      try {
        // Simulate successful deletion
        setProjects(projects.filter((p) => p.id !== projectToDelete.id))
        setFilteredProjects(filteredProjects.filter((p) => p.id !== projectToDelete.id))
        setShowDeleteModal(false)
        setProjectToDelete(null)
      } catch (error) {
        console.error("Error deleting project:", error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "termine":
        return "bg-green-100 text-green-800 border border-green-200"
      case "en cours":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "en attente":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "annule":
        return "bg-red-100 text-red-800 border border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "termine":
        return "Terminé"
      case "en cours":
        return "En cours"
      case "en attente":
        return "En attente"
      case "annule":
        return "Annulé"
      default:
        return status
    }
  }

  // ProjectFilter component
 
  return (
    <div className="min-h-screen bg-ehite">
      <HeaderChefProjet />

      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Projets</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestion des Projets</h1>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 py-8 -mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <p className="text-gray-600 mt-1">Gérer et suivre tous vos projets</p>
          </div>
          <Link
            to="/add_project"
            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un projet
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
                  placeholder="Rechercher des projets..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun projet trouvé</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || filters.status !== "all" || filters.client !== "all" || filters.dateRange !== "all"
                  ? "Essayez d'ajuster vos critères de recherche ou de filtrage"
                  : "Commencez par créer votre premier projet"}
              </p>
              {!searchTerm && filters.status === "all" && filters.client === "all" && filters.dateRange === "all" && (
                <Link
                  to="/add_project"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un projet
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Projet
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider" >
                      Statut
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Progression
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Équipe
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {filteredProjects.map((project) => {
                    const client = clients.find((client) => client.id === project.client_id)
                    return (
                      <tr key={project.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold shadow-sm">
                              {project.nom.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-blue-700">{project.nom}</div>
                              <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {client ? client.utilisateur.nom : "Client non trouvé"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 text-xs font-semibold inline-block rounded-full ${getStatusColor(project.statut)}`}
                          >
                            {getStatusText(project.statut)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                            {new Date(project.dateDebut).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-32">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-blue-600">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2">
                            {project.team.map((member, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs border-2 border-white"
                              >
                                {member}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/edit-project/${project.id}`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                              title="Modifier le projet">
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(project)}
                              className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                              title="Supprimer le projet">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

      
        </div>
      </main>

      <FooterChefProjet />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer le projet</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-blue-600">{projectToDelete?.nom}</span>? Cette action ne peut pas être
              annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectChefProjet

