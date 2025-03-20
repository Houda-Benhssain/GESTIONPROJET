import React from "react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet"
import FooterChefProjet from "./FooterChefProjet"

const EditerProchetCf = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    client_id: "",
    statut: "",
    dateDebut: "",
  })
  const [originalData, setOriginalData] = useState(null)
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [notFound, setNotFound] = useState(false)

  // Load project and clients on component mount
  useEffect(() => {
    loadProject()
    loadClients()
  }, [id])

  const loadProject = async () => {
    try {
      // This would be replaced with your actual API call
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock data - in a real app, you would fetch this from an API
        const mockProjects = [
          {
            id: 1,
            nom: "E-commerce Platform",
            description: "A comprehensive e-commerce solution with payment integration",
            client_id: 1,
            statut: "en cours",
            dateDebut: "2023-11-15",
          },
          {
            id: 2,
            nom: "Mobile Banking App",
            description: "Secure mobile banking application with biometric authentication",
            client_id: 2,
            statut: "en attente",
            dateDebut: "2024-01-30",
          },
          {
            id: 3,
            nom: "Healthcare Dashboard",
            description: "Interactive dashboard for healthcare professionals",
            client_id: 3,
            statut: "termine",
            dateDebut: "2023-10-05",
          },
          {
            id: 4,
            nom: "Inventory Management System",
            description: "Real-time inventory tracking and management system",
            client_id: 1,
            statut: "en cours",
            dateDebut: "2023-11-20",
          },
        ]

        const project = mockProjects.find((p) => p.id === Number.parseInt(id))

        if (project) {
          setFormData({
            nom: project.nom,
            description: project.description,
            client_id: project.client_id,
            statut: project.statut,
            dateDebut: project.dateDebut,
          })
          setOriginalData(project)
        } else {
          setNotFound(true)
        }

        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching project:", error)
      setIsLoading(false)
      setNotFound(true)
    }
  }

  const loadClients = async () => {
    try {
      // This would be replaced with your actual API call
      setTimeout(() => {
        const data = [
          { id: 1, utilisateur: { nom: "Acme Corporation" } },
          { id: 2, utilisateur: { nom: "TechStart Inc." } },
          { id: 3, utilisateur: { nom: "Healthcare Solutions" } },
        ]
        setClients(data)
      }, 800)
    } catch (error) {
      console.error("Error fetching clients:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field when user starts typing
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
      newErrors.nom = "Le nom du projet est requis"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise"
    }

    if (!formData.client_id) {
      newErrors.client_id = "Veuillez sélectionner un client"
    }

    if (!formData.dateDebut) {
      newErrors.dateDebut = "La date de début est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // This would be replaced with your actual API call
      // Simulating API call with timeout
      setTimeout(() => {
        console.log("Project data updated:", formData)
        setSuccessMessage("Projet mis à jour avec succès!")
        setIsSubmitting(false)

        // Clear success message after 3 seconds and redirect
        setTimeout(() => {
          setSuccessMessage("")
          navigate("/projects")
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error("Error updating project:", error)
      setIsSubmitting(false)
      setErrors({
        ...errors,
        submit: "Une erreur s'est produite lors de la mise à jour du projet",
      })
    }
  }

 

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="mb-6">
            <Link to="/projects/ChefProjet" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux projets
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Modifier le projet</h1>
            {originalData && <p className="text-gray-500">{originalData.nom}</p>}
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {errors.submit}
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du projet*
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${
                        errors.nom ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="Entrez le nom du projet"
                    />
                    {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className={`block w-full px-3 py-2 border ${
                        errors.description ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="Décrivez le projet"
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div>
                    <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Client*
                    </label>
                    <select
                      id="client_id"
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${
                        errors.client_id ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    >
                      <option value="">Sélectionnez un client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.utilisateur.nom}
                        </option>
                      ))}
                    </select>
                    {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
                  </div>

                  <div>
                    <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="en attente">En attente</option>
                      <option value="en cours">En cours</option>
                      <option value="termine">Terminé</option>
                      <option value="annule">Annulé</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de début*
                    </label>
                    <input
                      type="date"
                      id="dateDebut"
                      name="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${
                        errors.dateDebut ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {errors.dateDebut && <p className="mt-1 text-sm text-red-600">{errors.dateDebut}</p>}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    to="/projects/ChefProjet"
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <FooterChefProjet />
    </div>
  )
}
export default EditerProchetCf


