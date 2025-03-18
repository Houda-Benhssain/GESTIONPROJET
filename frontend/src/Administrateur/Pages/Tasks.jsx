import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, Edit, Trash2, ChevronDown, Calendar } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"
import TaskFilter from "../component/TaskFilter"

// Mock data for tasks
const mockTasks = [
  {
    id: "1",
    title: "Design Homepage Wireframes",
    description: "Create wireframes for the new homepage design",
    project: "Website Redesign",
    status: "completed",
    priority: "high",
    dueDate: "2023-03-15",
    assignedTo: "John Doe",
    assignedToAvatar: "JD",
    createdAt: "2023-03-01",
    completedAt: "2023-03-14",
  },
  {
    id: "2",
    title: "Implement User Authentication",
    description: "Set up user authentication system with JWT",
    project: "Mobile App Development",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-04-10",
    assignedTo: "Sarah Johnson",
    assignedToAvatar: "SJ",
    createdAt: "2023-03-20",
    completedAt: null,
  },
  {
    id: "3",
    title: "Database Schema Design",
    description: "Design the database schema for the e-commerce platform",
    project: "E-commerce Platform",
    status: "completed",
    priority: "medium",
    dueDate: "2023-02-28",
    assignedTo: "Michael Brown",
    assignedToAvatar: "MB",
    createdAt: "2023-02-10",
    completedAt: "2023-02-25",
  },
  {
    id: "4",
    title: "API Integration",
    description: "Integrate payment gateway API",
    project: "E-commerce Platform",
    status: "blocked",
    priority: "high",
    dueDate: "2023-04-05",
    assignedTo: "Emily Davis",
    assignedToAvatar: "ED",
    createdAt: "2023-03-15",
    completedAt: null,
  },
  {
    id: "5",
    title: "Mobile Responsive Design",
    description: "Ensure all pages are responsive on mobile devices",
    project: "Website Redesign",
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-04-20",
    assignedTo: "John Doe",
    assignedToAvatar: "JD",
    createdAt: "2023-03-25",
    completedAt: null,
  },
  {
    id: "6",
    title: "User Testing",
    description: "Conduct user testing sessions for the new features",
    project: "Mobile App Development",
    status: "not-started",
    priority: "medium",
    dueDate: "2023-05-10",
    assignedTo: "Sarah Johnson",
    assignedToAvatar: "SJ",
    createdAt: "2023-03-30",
    completedAt: null,
  },
  {
    id: "7",
    title: "Security Audit",
    description: "Perform security audit on the application",
    project: "CRM Implementation",
    status: "not-started",
    priority: "urgent",
    dueDate: "2023-04-30",
    assignedTo: "Michael Brown",
    assignedToAvatar: "MB",
    createdAt: "2023-04-01",
    completedAt: null,
  },
  {
    id: "8",
    title: "Performance Optimization",
    description: "Optimize application performance and loading times",
    project: "Website Redesign",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-04-15",
    assignedTo: "Emily Davis",
    assignedToAvatar: "ED",
    createdAt: "2023-03-20",
    completedAt: null,
  },
]

// Create a copy of the mock data to work with
let tasksData = [...mockTasks]

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    project: "all",
    priority: "all",
    assignedTo: "all",
    dueDate: "all",
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [searchTerm, filters, tasks])

  const loadTasks = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setTasks([...tasksData])
      setFilteredTasks([...tasksData])
      setLoading(false)
    }, 800)
  }

  const filterTasks = () => {
    let result = [...tasks]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.project.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((task) => task.status === filters.status)
    }

    // Apply project filter
    if (filters.project !== "all") {
      result = result.filter((task) => task.project === filters.project)
    }

    // Apply priority filter
    if (filters.priority !== "all") {
      result = result.filter((task) => task.priority === filters.priority)
    }

    // Apply assignedTo filter
    if (filters.assignedTo !== "all") {
      result = result.filter((task) => task.assignedTo === filters.assignedTo)
    }

    // Apply due date filter
    if (filters.dueDate !== "all") {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)

      if (filters.dueDate === "overdue") {
        result = result.filter((task) => new Date(task.dueDate) < today && task.status !== "completed")
      } else if (filters.dueDate === "today") {
        result = result.filter((task) => new Date(task.dueDate).toDateString() === today.toDateString())
      } else if (filters.dueDate === "tomorrow") {
        result = result.filter((task) => new Date(task.dueDate).toDateString() === tomorrow.toDateString())
      } else if (filters.dueDate === "week") {
        result = result.filter((task) => new Date(task.dueDate) <= nextWeek && new Date(task.dueDate) >= today)
      }
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
      // Simulate API delay
      setTimeout(() => {
        // Remove from local data
        tasksData = tasksData.filter((t) => t.id !== taskToDelete.id)
        // Update state
        setTasks(tasksData)
        setShowDeleteModal(false)
        setTaskToDelete(null)
      }, 800)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "not-started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date() && status !== "completed"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-500 mt-1">Manage and track all your tasks</p>
            </div>
            <Link
              to="/addTache"
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
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
                    placeholder="Search tasks..."
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
                  projects={Array.from(new Set(tasks.map((task) => task.project)))}
                  assignees={Array.from(new Set(tasks.map((task) => task.assignedTo)))}
                />
              )}
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ||
                  filters.status !== "all" ||
                  filters.project !== "all" ||
                  filters.priority !== "all" ||
                  filters.assignedTo !== "all" ||
                  filters.dueDate !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first task"}
                </p>
                {!searchTerm &&
                  filters.status === "all" &&
                  filters.project === "all" &&
                  filters.priority === "all" &&
                  filters.assignedTo === "all" &&
                  filters.dueDate === "all" && (
                    <Link
                      to="/addTache"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
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
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Task
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Assigned To
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-xs font-medium text-gray-900">{task.title}</div>
                              <div className="text-xs text-gray-500 truncate max-w-xs">{task.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{task.project}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-1.5 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(
                              task.status,
                            )}`}
                          >
                            {task.status === "in-progress"
                              ? "In Progress"
                              : task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-1.5 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getPriorityColor(
                              task.priority,
                            )}`}
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div
                            className={`flex items-center ${isOverdue(task.dueDate, task.status) ? "text-red-600" : "text-gray-500"}`}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(task.dueDate)}
                            {isOverdue(task.dueDate, task.status) && (
                              <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                                Overdue
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                              {task.assignedToAvatar}
                            </div>
                            <div className="ml-3 text-sm text-gray-900">{task.assignedTo}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/edit-task/${task.id}`}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(task)}
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
            <DeleteTaskModal
              task={taskToDelete}
              onCancel={() => {
                setShowDeleteModal(false)
                setTaskToDelete(null)
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

// Delete task confirmation modal component
const DeleteTaskModal = ({ task, onCancel, onConfirm }) => {
  if (!task) return null

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Task</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-red-600">{task.title}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TasksPage

