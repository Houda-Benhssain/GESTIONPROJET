import React from "react"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Briefcase, ArrowLeft } from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet"
import FooterChefProjet from "./FooterChefProjet"

const EditProjectCf = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clients, setClients] = useState([])
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    date_debut: "",
    date_fin: "",
    statut: "En cours",
    client_id: "",
  })

  // Fetch project data
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/projets/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            nom: data.nom || "",
            description: data.description || "",
            date_debut: data.date_debut ? data.date_debut.split("T")[0] : "",
            date_fin: data.date_fin ? data.date_fin.split("T")[0] : "",
            statut: data.statut || "En cours",
            client_id: data.client_id || "",
          })
        })
        .catch((error) => console.error("Error fetching project:", error))
    }
  }, [id])

  // Fetch clients for dropdown
  useEffect(() => {
    fetch("http://127.0.0.1:8000/clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data)
      })
      .catch((error) => console.error("Error fetching clients:", error))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nom.trim()) {
      newErrors.nom = "Project name is required"
    }

    if (!formData.date_debut) {
      newErrors.date_debut = "Start date is required"
    }

    if (!formData.client_id) {
      newErrors.client_id = "Client selection is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation du formulaire
    if (!project.nom || !project.client_id || !project.statut) {
      setFormError("Please fill in all required fields");
      setSaving(false);
      return;
    }

    setIsSubmitting(true)

    const projectData = {
      nom: formData.nom,
      description: formData.description,
      date_debut: formData.date_debut,
      date_fin: formData.date_fin,
      statut: formData.statut,
      client_id: formData.client_id,
    }

    const url = id ? `http://127.0.0.1:8000/projets/${id}` : "http://127.0.0.1:8000/projets"

    const method = id ? "PUT" : "POST"

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Unknown error")

        setIsSubmitting(false)
        navigate("/projects", {
          state: { message: id ? "Project updated successfully!" : "Project created successfully!" },
        })
      })
      .catch((error) => {
        setIsSubmitting(false)
        console.error("Error:", error)
      })
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <HeaderChefProjet />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate("/projects/ChefProjet")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </button>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{id ? "Edit Project" : "Add New Project"}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {id ? "Update project information" : "Create a new project record"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Project Information</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${
                        errors.nom ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
                  </div>

                  <div>
                    <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                      Client *
                    </label>
                    <select
                      id="client_id"
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${
                        errors.client_id ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.nom || `Client #${client.id}`}
                        </option>
                      ))}
                    </select>
                    {errors.client_id && <p className="mt-1 text-sm text-red-500">{errors.client_id}</p>}
                  </div>

                  <div>
                    <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="date_debut"
                      name="date_debut"
                      value={formData.date_debut}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border ${
                        errors.date_debut ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.date_debut && <p className="mt-1 text-sm text-red-500">{errors.date_debut}</p>}
                  </div>

                  <div>
                    <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="date_fin"
                      name="date_fin"
                      value={formData.date_fin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="En cours">En cours</option>
                      <option value="Terminé">Terminé</option>
                      <option value="En attente">En attente</option>
                      <option value="Annulé">Annulé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0114.933-3.014M12 4v8l6 2"
                        ></path>
                      </svg>
                      {id ? "Updating..." : "Creating..."}
                    </>
                  ) : id ? (
                    "Update Project"
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterChefProjet />
    </div>
  )
}

export default EditProjectCf

