import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, X, Save, Calendar, Flag, User, Briefcase, CheckCircle } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const EditTaches = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [task, setTask] = useState({
    nom: "",
    statut: "",
    dateDebut: "",
    dateFin: "",
    priorite: "",
    project_id: "",
    user_id: "",
  })
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchTaskAndOptions()
  }, [id])

  const fetchTaskAndOptions = async () => {
    setLoading(true)

    try {
      const taskResponse = await fetch(`http://127.0.0.1:8000/taches/${id}`)
      const taskData = await taskResponse.json()

      if (!taskResponse.ok) {
        setNotFound(true)
        setLoading(false)
        return
      }

      // Set task data directly from the response
      setTask({
        nom: taskData.nom,
        statut: taskData.statut,
        dateDebut: taskData.dateDebut,
        dateFin: taskData.dateFin,
        priorite: taskData.priorite,
        project_id: taskData.project_id, // Project ID from response
        user_id: taskData.user_id, // User ID from response
      })

      // Fetch projects and users (filter users by role "membre")
      const projectsResponse = await fetch("http://127.0.0.1:8000/projets")
      const usersResponse = await fetch("http://127.0.0.1:8000/utilisateurs")
      const projectsData = await projectsResponse.json()
      const usersData = await usersResponse.json()

      // Filter users with role "membre"
      const filteredUsers = usersData.filter((user) => user.role === "membre equipe")

      setProjects(projectsData)
      setUsers(filteredUsers)

      setLoading(false)
    } catch (error) {
      setNotFound(true)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prev) => ({
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

  const validateForm = () => {
    const newErrors = {}
    if (!task.nom.trim()) newErrors.nom = "Le nom de la tâche est requis."
    if (!task.statut) newErrors.statut = "Le statut est requis."
    if (!task.dateDebut) newErrors.dateDebut = "La date de début est requise."
    if (!task.dateFin) newErrors.dateFin = "La date de fin est requise."
    if (!task.priorite) newErrors.priorite = "La priorité est requise."
    if (!task.project_id) newErrors.project_id = "Le projet est requis."
    if (!task.user_id) newErrors.user_id = "Le responsable est requis."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

    setSaving(true)

    try {
      const response = await fetch(`http://127.0.0.1:8000/taches/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nom: task.nom,
          statut: task.statut,
          dateDebut: task.dateDebut,
          dateFin: task.dateFin,
          priorite: task.priorite,
          project_id: task.project_id,
          user_id: task.user_id,
        }),
        headers: { "Content-Type": "application/json" },
      })

      const updatedTask = await response.json()
      setSaving(false)
      navigate("/tasks")
    } catch (error) {
      setSaving(false)
      console.error(error)
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "en attente":
        return "bg-blue-100 text-blue-800"
      case "en cours":
        return "bg-blue-500 text-white"
      case "terminee":
        return "bg-green-500 text-white"
      case "annulee":
        return "bg-gray-500 text-white"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "basse":
        return "bg-blue-100 text-blue-800"
      case "moyenne":
        return "bg-blue-300 text-blue-800"
      case "haute":
        return "bg-blue-500 text-white"
      case "critique":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }


  // if (notFound) {
  //   return (
  //     <div className="flex flex-col min-h-screen bg-blue-50">
  //       <Header />
  //       <main className="flex-grow">
  //         <div className="max-w-screen-lg mx-auto px-4 py-8">
  //           <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-blue-600">
  //             <h2 className="text-2xl font-bold text-blue-900 mb-4">Tâche non trouvée</h2>
  //             <p className="text-blue-700 mb-6">La tâche que vous recherchez n'existe pas ou a été supprimée</p>
  //             <Link
  //               to="/tasks"
  //               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
  //             >
  //               <ArrowLeft className="h-4 w-4 mr-2" />
  //               Retour aux tâches
  //             </Link>
  //           </div>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Modifier la tâche</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="mb-4">
                  <label htmlFor="nom" className="block text-sm font-medium text-blue-800 mb-1">
                    Nom de la tâche
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={task.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Entrez le nom de la tâche"
                  />
                  {errors.nom && <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="statut" className=" text-sm font-medium text-blue-800 mb-1 flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${task.statut ? getStatusColor(task.statut).split(" ")[0] : "bg-gray-300"} mr-2`}
                      ></div>
                      Statut
                    </label>
                    <div className="relative">
                      <select
                        id="statut"
                        name="statut"
                        value={task.statut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" >
                        <option value="en attente">En attente</option>
                        <option value="en cours">En cours</option>
                        <option value="terminee">Terminé</option>
                        <option value="annulee">Annulé</option>
                      </select>
                    </div>
                    {errors.statut && <p className="text-red-600 mt-1 text-sm">{errors.statut}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="priorite"
                      className=" text-sm font-medium text-blue-800 mb-1 flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${task.priorite ? getPriorityColor(task.priorite).split(" ")[0] : "bg-gray-300"} mr-2`}
                      ></div>
                      Priorité
                    </label>
                    <div className="relative">
                      <select
                        id="priorite"
                        name="priorite"
                        value={task.priorite}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                        <option value="critique">Critique</option>
                      </select>
                    </div>
                    {errors.priorite && <p className="text-red-600 mt-1 text-sm">{errors.priorite}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-4">Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateDebut" className="block text-sm font-medium text-blue-800 mb-1">
                      Date de début
                    </label>
                    <div className="relative">
                      <input
                        id="dateDebut"
                        name="dateDebut"
                        type="date"
                        value={task.dateDebut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    {errors.dateDebut && <p className="text-red-600 mt-1 text-sm">{errors.dateDebut}</p>}
                  </div>

                  <div>
                    <label htmlFor="dateFin" className="block text-sm font-medium text-blue-800 mb-1">
                      Date de fin
                    </label>
                    <div className="relative">
                      <input
                        id="dateFin"
                        name="dateFin"
                        type="date"
                        value={task.dateFin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                    </div>
                    {errors.dateFin && <p className="text-red-600 mt-1 text-sm">{errors.dateFin}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-4">Assignation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="project_id" className="block text-sm font-medium text-blue-800 mb-1">
                      Projet
                    </label>
                    <div className="relative">
                      <select
                        id="project_id"
                        name="project_id"
                        value={task.project_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionner un projet</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.project_id && <p className="text-red-600 mt-1 text-sm">{errors.project_id}</p>}
                  </div>

                  <div>
                    <label htmlFor="user_id" className="block text-sm font-medium text-blue-800 mb-1">
                      Attribuer à
                    </label>
                    <div className="relative">
                      <select
                        id="user_id"
                        name="user_id"
                        value={task.user_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" >
                        <option value="">Sélectionner un utilisateur</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.user_id && <p className="text-red-600 mt-1 text-sm">{errors.user_id}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center"
                  disabled={saving}
                >
                  {saving ? "Enregistrement en cours..." : "Sauvegarder les modifications"}
                </button>
                <Link
                  to="/tasks"
                  className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors flex items-center">
                  Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditTaches

