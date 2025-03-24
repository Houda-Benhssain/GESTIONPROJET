import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Save, Calendar, Clock, Users, AlertCircle, Loader2, Video, ChevronDown } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const AddReunions = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Mock data for projects
  const projectsData = [
    { id: 1, nom: "Refonte du site web" },
    { id: 2, nom: "Application mobile" },
    { id: 3, nom: "Système de gestion de contenu" },
    { id: 4, nom: "Plateforme e-commerce" },
    { id: 5, nom: "Dashboard analytique" },
  ]

  // Mock data for users
  const usersData = [
    { id: 1, nom: "Jean Dupont", role: "chef de projet" },
    { id: 2, nom: "Marie Martin", role: "membre equipe" },
    { id: 3, nom: "Pierre Durand", role: "membre equipe" },
    { id: 4, nom: "Sophie Lefebvre", role: "membre equipe" },
    { id: 5, nom: "Thomas Bernard", role: "membre equipe" },
    { id: 6, nom: "Camille Petit", role: "client" },
    { id: 7, nom: "Lucas Moreau", role: "membre equipe" },
  ]

  // Filter users to only include team members
  const filteredUsers = usersData.filter((user) => user.role === "membre equipe")

  const [reunion, setReunion] = useState({
    nom: "",
    dateDebut: "",
    dateFin: "",
    duree: "",
    project_id: "",
    participants: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setReunion((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleParticipantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
    setReunion((prev) => ({
      ...prev,
      participants: selectedOptions,
    }))

    // Clear error when field is edited
    if (errors.participants) {
      setErrors((prev) => ({
        ...prev,
        participants: undefined,
      }))
    }
  }

  // Calculate duration when start and end dates change
  useEffect(() => {
    if (reunion.dateDebut && reunion.dateFin) {
      try {
        const start = new Date(reunion.dateDebut)
        const end = new Date(reunion.dateFin)

        // Calculate difference in milliseconds
        const diff = end - start

        // Convert to minutes
        const minutes = Math.floor(diff / 60000)

        if (minutes > 0) {
          // Format as hours and minutes
          const hours = Math.floor(minutes / 60)
          const remainingMinutes = minutes % 60

          let durationStr = ""
          if (hours > 0) {
            durationStr += `${hours} heure${hours > 1 ? "s" : ""}`
          }
          if (remainingMinutes > 0) {
            durationStr += `${hours > 0 ? " " : ""}${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
          }

          setReunion((prev) => ({
            ...prev,
            duree: durationStr,
          }))
        }
      } catch (error) {
        console.error("Erreur lors du calcul de la durée:", error)
      }
    }
  }, [reunion.dateDebut, reunion.dateFin])

  const validateForm = () => {
    const newErrors = {}

    if (!reunion.nom.trim()) {
      newErrors.nom = "Le nom de la réunion est requis"
    }

    if (!reunion.dateDebut) {
      newErrors.dateDebut = "La date de début est requise"
    }

    if (!reunion.dateFin) {
      newErrors.dateFin = "La date de fin est requise"
    } else if (reunion.dateDebut && new Date(reunion.dateFin) <= new Date(reunion.dateDebut)) {
      newErrors.dateFin = "La date de fin doit être postérieure à la date de début"
    }

    if (!reunion.project_id) {
      newErrors.project_id = "Le projet est requis"
    }

    if (!reunion.participants || reunion.participants.length === 0) {
      newErrors.participants = "Au moins un participant est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".text-red-600")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Données de la réunion soumises:", reunion)

      // Simulate successful submission
      setLoading(false)

      // Show success message or redirect
      alert("Réunion créée avec succès!")
      navigate("/")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux réunions
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
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
                  <label htmlFor="nom" className="block text-sm font-medium text-blue-800 mb-1">
                    Nom de la réunion <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={reunion.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Ex: Réunion de lancement du projet"
                  />
                  {errors.nom && (
                    <p className="text-red-600 mt-1 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.nom}
                    </p>
                  )}
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
                      className="w-full pl-10 pr-10 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner un projet</option>
                      {projectsData.map((project) => (
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
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Planification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="dateDebut" className="block text-sm font-medium text-blue-800 mb-1">
                      Date et heure de début <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        id="dateDebut"
                        name="dateDebut"
                        type="datetime-local"
                        value={reunion.dateDebut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.dateDebut && (
                      <p className="text-red-600 mt-1 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.dateDebut}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateFin" className="block text-sm font-medium text-blue-800 mb-1">
                      Date et heure de fin <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        id="dateFin"
                        name="dateFin"
                        type="datetime-local"
                        value={reunion.dateFin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.dateFin && (
                      <p className="text-red-600 mt-1 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.dateFin}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="duree" className="block text-sm font-medium text-blue-800 mb-1">
                    Durée (calculée automatiquement)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="duree"
                      name="duree"
                      type="text"
                      value={reunion.duree}
                      readOnly
                      className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md bg-gray-50 text-gray-700"
                      placeholder="La durée sera calculée automatiquement"
                    />
                  </div>
                </div>
              </div>

          

              <div className="flex justify-between items-center pt-6 border-t border-blue-100">
                <div className="text-sm text-blue-600">
                  <span className="text-red-500">*</span> Champs obligatoires
                </div>
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors flex items-center"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Planifier la réunion
                      </>
                    )}
                  </button>
                </div>
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

