import React from "react";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, X, Calendar } from "lucide-react"
import Header from "./Header";
import Footer from "./Footer";

const AddTaches = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [assignees, setAssignees] = useState([])
  const [loading, setLoading] = useState(true)

  const [task, setTask] = useState({
    title: "",
    description: "",
    project: "",
    status: "not-started",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    assignedToAvatar: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // In a real app, you would fetch projects and assignees from an API
    // For now, we'll use mock data
    fetchProjectsAndAssignees()
  }, [])

  const fetchProjectsAndAssignees = () => {
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
      setLoading(false)
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

    // In a real app, this would be an API call to create the task
    // For now, we'll simulate an API delay
    setTimeout(() => {
      // Generate a new ID for the task
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completedAt: null,
      }

      // In a real app, you would add this to your database
      // For now, we'll just navigate back to the tasks list
      setSaving(false)
      navigate("/tasks")
    }, 1000)
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
            <h1 className="text-2xl font-bold text-gray-900">Add New Task</h1>
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Task
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

export default AddTaches

