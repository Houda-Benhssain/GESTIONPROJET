import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Save, Calendar, Clock, Users, AlertCircle, Loader2, Video, ChevronDown, Calendar1Icon } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const AddReunions = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [projects, setProjects] = useState([]) // State for projects from API
  const [users, setUsers] = useState([]) // State for users with project manager role
  const [reunion, setReunion] = useState({
    type: "Réunion de lancement", // Default type
    date: "", // Format: 2025-03-25
    heure_debut: "",
    heure_fin: "",
    user_id: 2, // Assuming a static user_id for now, or it could come from user authentication context
    project_id: "",

  })

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/projets/") // Replace with your API URL
        const data = await response.json()
        setProjects(data) // Assuming the API returns an array of projects
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  // Fetch users with "chef de projet" role
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs/") // Replace with your API URL
        const data = await response.json()
        // Assuming the API returns users with roles, filter users with "chef de projet" role
        const projectManagers = data.filter(user => user.role === "chef de projet")
        setUsers(projectManagers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReunion((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      const firstError = document.querySelector(".text-red-600")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setLoading(true)

    // Prepare data for submission
    const requestData = {
      type: reunion.type,
      date: reunion.date, // Format: 2025-03-25
      heure_debut: reunion.heure_debut, // Including the time (2025-03-25 10:00:00)
      heure_fin: reunion.heure_fin, // Including the time (2025-03-25 12:00:00)
      user_id: reunion.user_id,
      project_id: reunion.project_id,
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/reunions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
      const data = await response.json()

      // Handle response from API
      setLoading(false)
      navigate("/adminhome")
    } catch (error) {
      setLoading(false)
      console.error("Error creating reunion:", error)
      alert("Une erreur est survenue lors de la création de la réunion.")
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!reunion.date) {
      newErrors.date = "La date est requise"
    }
    if (!reunion.heure_debut) {
      newErrors.heure_debut = "L'heure de début est requise"
    }
    if (!reunion.heure_fin) {
      newErrors.heure_fin = "L'heure de fin est requise"
    } else if (reunion.dateDebut && new Date(reunion.dateFin) <= new Date(reunion.dateDebut)) {
      newErrors.dateFin = "La date de fin doit être postérieure à la date de début"
    }
    if (!reunion.project_id) {
      newErrors.project_id = "Le projet est requis"
    }
    if (!reunion.user_id) {
      newErrors.user_id = "Le chef de projet est requis"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/adminhome"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux réunions
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Video className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Planifier une nouvelle réunion</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {errors.submit && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-blue-600" />
                  Informations de la réunion
                </h3>

                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-blue-800 mb-1">
                    Type de réunion
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={reunion.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Réunion de lancement">Réunion de lancement</option>
                    <option value="Réunion de planification">Réunion de planification</option>
                    <option value="Réunion de suivi">Réunion de suivi</option>
                    <option value="Réunion de revue">Réunion de revue</option>
                    <option value="Réunion de rétrospective">Réunion de rétrospective</option>
                    <option value="Réunion de clôture">Réunion de clôture</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="project_id" className="block text-sm font-medium text-blue-800 mb-1">
                    Projet associé <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-blue-400" />
                    </div>
                    <select
                      id="project_id"
                      name="project_id"
                      value={reunion.project_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner un projet</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.project_id && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.project_id}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="user_id" className="block text-sm font-medium text-blue-800 mb-1">
                    Chef de projet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="user_id"
                      name="user_id"
                      value={reunion.user_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner un chef de projet</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.user_id && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.user_id}
                    </p>
                  )}
                </div>
                
                
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
              <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Calendar1Icon className="h-5 w-5 mr-2 text-blue-600" />
                  L'heure de la réunion
                </h3>
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-blue-800 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={reunion.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.date && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.date}
                    </p>
                  )}
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-blue-800 mb-1">
                    Heure de début <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="heure_debut"
                    name="heure_debut"
                    type="time"
                    value={reunion.heure_debut}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.heure_debut && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.heure_debut}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="dateFin" className="block text-sm font-medium text-blue-800 mb-1">
                    Heure de fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="heure_fin"
                    name="heure_fin"
                    type="time"
                    value={reunion.heure_fin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.heure_fin && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.heure_fin}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center bg-blue-600 text-white font-semibold rounded-full py-2 px-8 hover:bg-blue-700 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && <Loader2 className="animate-spin mr-2" />}
                  {loading ? "Création..." : "Planifier la réunion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AddReunions





