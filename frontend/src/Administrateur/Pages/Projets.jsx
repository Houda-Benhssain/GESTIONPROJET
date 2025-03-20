import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown, Calendar, Users } from "lucide-react"
import ProjectFilter from "../component/FilterProjet"
import Header from "../component/Header"
import Footer from "../component/Footer"

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    client: "all",
    dateRange: "all",
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [clients, setClients] = useState([]) // Nouveau state pour les clients

  // Effect pour charger les projets et clients
  useEffect(() => {
    loadProjects()
    loadClients()
  }, [])

  // Effect pour filtrer les projets selon les critères
  useEffect(() => {
    filterProjects()
  }, [searchTerm, filters, projects])

  const loadProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/projets")
      const data = await response.json()
      setProjects(data) // Définir les projets récupérés
      setFilteredProjects(data) // Initialiser les projets filtrés
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const loadClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/clients") // Adapter l'URL si nécessaire
      const data = await response.json()
      setClients(data) // Définir les clients récupérés
    } catch (error) {
      console.error("Error fetching clients:", error)
    }
  }

  const filterProjects = () => {
    let result = [...projects]

    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.status !== "all") {
      result = result.filter((project) => project.statut === filters.status)
    }

    if (filters.client !== "all") {
      result = result.filter((project) => String(project.client_id) === String(filters.client))
    }

    if (filters.dateRange !== "all") {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
      const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90))

      if (filters.dateRange === "30days") {
        result = result.filter((project) => new Date(project.dateDebut) >= thirtyDaysAgo)
      } else if (filters.dateRange === "90days") {
        result = result.filter((project) => new Date(project.dateDebut) >= ninetyDaysAgo)
      }
    }

    setFilteredProjects(result)
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

  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setShowDeleteModal(true)
}

const confirmDelete = async () => {
    if (projectToDelete) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/projets/${projectToDelete.id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                // Mettre à jour les états après la suppression du projet
                setProjects(projects.filter((p) => p.id !== projectToDelete.id))
                setFilteredProjects(filteredProjects.filter((p) => p.id !== projectToDelete.id))
                setShowDeleteModal(false)
                setProjectToDelete(null)
            } else {
                // Gérer l'échec de la suppression
                console.error("Error deleting project")
            }
        } catch (error) {
            console.error("Error deleting project:", error)
        }
    }
}


  

  const getStatusColor = (status) => {
    switch (status) {
      case "termine":
        return "bg-green-100 text-green-800"
      case "en cours":
        return "bg-blue-100 text-blue-800"
      case "en attente":
        return "bg-yellow-100 text-yellow-800"
      case "annule":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
              <p className="text-gray-500 mt-1">Gérer et suivre tous vos projets</p>
            </div>
            <Link
              to="/addProjet"
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter projet
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
                    placeholder="Search projects..."
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

              {showFilters && <ProjectFilter filters={filters} onFilterChange={handleFilterChange} clients={clients} />}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun projet trouvé</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || filters.status !== "all" || filters.client !== "all" || filters.dateRange !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first project"}
                </p>
                {!searchTerm && filters.status === "all" && filters.client === "all" && filters.dateRange === "all" && (
                  <Link
                    to="/addProjet"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter projet
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Projet
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => {
                      const client = clients.find((client) => client.id === project.client_id) // Trouver le client par ID
                      return (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold">
                                {project.nom.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{project.nom}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{client ? client.utilisateur.nom : "Client non trouvé"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold inline-block rounded-full ${getStatusColor(project.statut)}`}>
                              {project.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Date(project.dateDebut).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <div className="flex justify-start gap-4 items-center">
    <Link to={`/edit/${project.id}`} className="text-blue-600 hover:text-blue-800">
      <Edit className="h-5 w-5" />
    </Link>
    <button
      onClick={() => handleDeleteClick(project)}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 className="h-5 w-5" />
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
        </div>
      </main>
      <Footer />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="mt-2">Are you sure you want to delete this project?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
