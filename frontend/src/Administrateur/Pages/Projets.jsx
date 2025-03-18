import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown, Calendar, Users } from "lucide-react"
import ProjectFilter from "../component/FilterProjet"
import Header from "../component/Header"
import Footer from "../component/Footer"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    client: "Acme Inc",
    status: "in-progress",
    startDate: "2023-01-15",
    endDate: "2023-04-30",
    teamSize: 5,
    budget: "25000",
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a native mobile app for iOS and Android platforms",
    client: "Globex Corporation",
    status: "not-started",
    startDate: "2023-05-01",
    endDate: "2023-09-30",
    teamSize: 8,
    budget: "75000",
    priority: "medium",
  },
  {
    id: "3",
    name: "E-commerce Platform",
    description: "Build an online store with payment processing and inventory management",
    client: "Stark Industries",
    status: "completed",
    startDate: "2022-10-01",
    endDate: "2023-02-28",
    teamSize: 6,
    budget: "50000",
    priority: "high",
  },
  {
    id: "4",
    name: "CRM Implementation",
    description: "Implement and customize a CRM solution for sales team",
    client: "Wayne Enterprises",
    status: "on-hold",
    startDate: "2023-02-15",
    endDate: "2023-06-30",
    teamSize: 4,
    budget: "35000",
    priority: "medium",
  },
  {
    id: "5",
    name: "Data Migration",
    description: "Migrate legacy data to new cloud-based platform",
    client: "Umbrella Corporation",
    status: "in-progress",
    startDate: "2023-03-01",
    endDate: "2023-05-15",
    teamSize: 3,
    budget: "20000",
    priority: "urgent",
  },
]

// Create a copy of the mock data to work with
let projectsData = [...mockProjects]

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    client: "all",
    dateRange: "all",
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [searchTerm, filters, projects])

  const loadProjects = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setProjects([...projectsData])
      setFilteredProjects([...projectsData])
      setLoading(false)
    }, 800)
  }

  const filterProjects = () => {
    let result = [...projects]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((project) => project.status === filters.status)
    }

    // Apply client filter
    if (filters.client !== "all") {
      result = result.filter((project) => project.client === filters.client)
    }

    // Apply date range filter
    if (filters.dateRange !== "all") {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
      const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90))

      if (filters.dateRange === "30days") {
        result = result.filter((project) => new Date(project.startDate) >= thirtyDaysAgo)
      } else if (filters.dateRange === "90days") {
        result = result.filter((project) => new Date(project.startDate) >= ninetyDaysAgo)
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
      // Simulate API delay
      setTimeout(() => {
        // Remove from local data
        projectsData = projectsData.filter((p) => p.id !== projectToDelete.id)
        // Update state
        setProjects(projectsData)
        setShowDeleteModal(false)
        setProjectToDelete(null)
      }, 800)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
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
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-500 mt-1">Manage and track all your projects</p>
            </div>
            <Link
              to="/addProjet"
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
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

              {showFilters && <ProjectFilter filters={filters} onFilterChange={handleFilterChange} />}
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
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
                    Add Project
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
                        Project
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
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Timeline
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Team
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold">
                              {project.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.client}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              project.status,
                            )}`}
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {new Date(project.startDate).toLocaleDateString()} -{" "}
                            {new Date(project.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {project.teamSize} members
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/edit/${project.id}`}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(project)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
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

          {showDeleteModal && (
            <DeleteConfirmModal
              project={projectToDelete}
              onCancel={() => {
                setShowDeleteModal(false)
                setProjectToDelete(null)
              }}
              onConfirm={confirmDelete}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProjectsPage

