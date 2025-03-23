import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown,ChevronRight, Calendar, Users, Folder } from "lucide-react"
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
    <div className="flex flex-col min-h-screen bg-blue-50">
  <div className="flex flex-col min-h-screen bg-blue-50">
  <Header />
  <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center text-xs text-blue-100 mb-2">
        <span>Projets</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Gestion des Projets</h1>
    </div>
  </div>

  <main className="flex-grow px-4 py-8 -mt-6">
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Folder className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{projects.length}</div>
                      <div className="text-sm text-gray-500">Nombre de projets</div>
                    </div>
                  </div>
                </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Liste des Projets</h2>
          <p className="text-sm text-gray-500">Gérez et suivez vos projets</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher des projets..."
              className="pl-70 pr-4 py-2 w-full rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
          <Link
  to="/addProjet"  // Make sure this matches the route for adding a project
  className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
>
  <Plus className="h-4 w-4 mr-2" />
  Ajouter projet
</Link>

        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <ProjectFilter filters={filters} onFilterChange={handleFilterChange} clients={clients} />
        </div>
      )}

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
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-blue-100">
        <div className="overflow-x-auto">
          <table  className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Projet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Date debut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Date fin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              {filteredProjects.map((project) => {
                const client = clients.find((client) => client.id === project.client_id)
                return (
                  <tr key={project.id} className="hover:bg-blue-50">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(project.dateFin).toLocaleDateString()}</div>
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
        </div>
      )}
    </div>
  </main>
  <Footer />
</div>


  {/* Delete Confirmation Modal */}
  {showDeleteModal && (
    <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Confirmer la suppression</h3>
        <p className="text-center">Êtes-vous sûr de vouloir supprimer ce projet ?</p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
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

export default ProjectsPage
