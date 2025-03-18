import React from "react";
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, X, Calendar } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const EditTaches = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [assignees, setAssignees] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [task, setTask] = useState({
    title: "",
    description: "",
    project: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    assignedToAvatar: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Fetch task data and options
    fetchTaskAndOptions()
  }, [id])

  const fetchTaskAndOptions = () => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // Mock projects data
      const mockProjects = [
        "Website Redesign",
        "Mobile App Development",
        "E-commerce Platform",
        "CRM Implementation",
        "Data Migration",
      ]

      // Mock assignees data
      const mockAssignees = [
        { name: "John Doe", avatar: "JD" },
        { name: "Sarah Johnson", avatar: "SJ" },
        { name: "Michael Brown", avatar: "MB" },
        { name: "Emily Davis", avatar: "ED" },
      ]

      setProjects(mockProjects)
      setAssignees(mockAssignees)

      // Mock tasks data
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

      // Find the task with the matching ID
      const foundTask = mockTasks.find((task) => task.id === id)

      if (foundTask) {
        setTask(foundTask)
        setLoading(false)
      } else {
        setNotFound(true)
        setLoading(false)
      }
    }, 800)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "assignedTo") {
      // Find the corresponding avatar for the selected assignee
      const selectedAssignee = assignees.find((assignee) => assignee.name === value)
      if (selectedAssignee) {
        setTask((prev) => ({
          ...prev,
          assignedTo: value,
          assignedToAvatar: selectedAssignee.avatar,
        }))
      } else {
        setTask((prev) => ({
          ...prev,
          assignedTo: value,
          assignedToAvatar: "",
        }))
      }
    } else {
      setTask((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!task.title.trim()) newErrors.title = "Task title is required"
    if (!task.description.trim()) newErrors.description = "Description is required"
    if (!task.project) newErrors.project = "Project is required"
    if (!task.dueDate) newErrors.dueDate = "Due date is required"
    if (!task.assignedTo) newErrors.assignedTo = "Assignee is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector(".text-red-600")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setSaving(true)

    // In a real app, this would be an API call to update the task
    // For now, we'll simulate an API delay
    setTimeout(() => {
      // In a real app, you would update the task in your database
      // For now, we'll just navigate back to the tasks list
      setSaving(false)
      navigate("/tasks")
    }, 1000)
  }

 
  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
              <p className="text-gray-500 mb-6">The task you're looking for doesn't exist or has been deleted.</p>
              <Link
                to="/tasks"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tasks
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Link to="/tasks" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.title ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={task.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.description ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Project*
                </label>
                <select
                  id="project"
                  name="project"
                  value={task.project}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.project ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a project</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
                {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border ${errors.dueDate ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To*
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={task.assignedTo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.assignedTo ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select an assignee</option>
                  {assignees.map((assignee, index) => (
                    <option key={index} value={assignee.name}>
                      {assignee.name}
                    </option>
                  ))}
                </select>
                {errors.assignedTo && <p className="mt-1 text-sm text-red-600">{errors.assignedTo}</p>}
              </div>

              {task.assignedTo && (
                <div className="flex items-center mt-2">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                    {task.assignedToAvatar}
                  </div>
                  <span className="ml-3 text-sm text-gray-700">{task.assignedTo}</span>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/tasks"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditTaches

