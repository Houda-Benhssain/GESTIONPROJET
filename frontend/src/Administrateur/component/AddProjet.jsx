import React from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, X } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const AddProject = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState({
    name: "",
    description: "",
    client: "",
    status: "not-started",
    startDate: "",
    endDate: "",
    teamSize: 1,
    budget: "",
    priority: "medium",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }))

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

    if (!project.name.trim()) newErrors.name = "Project name is required"
    if (!project.description.trim()) newErrors.description = "Description is required"
    if (!project.client.trim()) newErrors.client = "Client name is required"
    if (!project.startDate) newErrors.startDate = "Start date is required"
    if (!project.endDate) newErrors.endDate = "End date is required"
    if (project.startDate && project.endDate && new Date(project.startDate) > new Date(project.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }
    if (!project.budget) newErrors.budget = "Budget is required"
    if (isNaN(Number(project.budget))) newErrors.budget = "Budget must be a number"
    if (!project.teamSize || project.teamSize < 1) newErrors.teamSize = "Team size must be at least 1"

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

    // In a real app, this would be an API call to create the project
    // For now, we'll simulate an API delay
    setTimeout(() => {
      // Generate a new ID for the project
      const newProject = {
        ...project,
        id: Date.now().toString(),
      }

      // In a real app, you would add this to your database
      // For now, we'll just navigate back to the projects list
      setSaving(false)
      navigate("/projects")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={project.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.description ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                  Client*
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={project.client}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.client ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.startDate ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.endDate ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <input
                  type="number"
                  id="teamSize"
                  name="teamSize"
                  min="1"
                  value={project.teamSize}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.teamSize ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.teamSize && <p className="mt-1 text-sm text-red-600">{errors.teamSize}</p>}
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget ($)*
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={project.budget}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.budget ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={project.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/projects"
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
                    Create Project
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

export default AddProject

