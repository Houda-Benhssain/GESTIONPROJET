import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Save } from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet"
import FooterChefProjet from "./FooterChefProjet"

const EditTaskCf = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    description: "",
    statut: "",
    priorite: "",
    dateDebut: "",
    dateFin: "",
    projetId: "",
    userId: "",
  })

  // Sample data for demonstration
  const projectsData = [
    { id: 1, nom: "Refonte Site Web" },
    { id: 2, nom: "Application Mobile" },
    { id: 3, nom: "Système CRM" },
  ]

  const usersData = [
    { id: 1, nom: "Sophie Martin" },
    { id: 2, nom: "Thomas Dubois" },
    { id: 3, nom: "Julie Leroy" },
  ]

  // Sample tasks data
  const tasksData = [
    {
      id: 1,
      nom: "Créer maquette UI",
      description: "Concevoir les maquettes pour la nouvelle interface utilisateur",
      statut: "completed",
      priorite: "haute",
      dateDebut: "2025-04-01",
      dateFin: "2025-04-15",
      projetId: 1,
      userId: 1,
    },
    {
      id: 2,
      nom: "Développer API REST",
      description: "Implémenter les endpoints API pour le nouveau service",
      statut: "in-progress",
      priorite: "critique",
      dateDebut: "2025-03-15",
      dateFin: "2025-03-30",
      projetId: 2,
      userId: 2,
    },
    {
      id: 3,
      nom: "Tester fonctionnalités",
      description: "Effectuer les tests fonctionnels sur les nouvelles fonctionnalités",
      statut: "not-started",
      priorite: "moyenne",
      dateDebut: "2025-04-10",
      dateFin: "2025-04-20",
      projetId: 1,
      userId: 3,
    },
    {
      id: 4,
      nom: "Déployer en production",
      description: "Déployer la nouvelle version sur les serveurs de production",
      statut: "blocked",
      priorite: "critique",
      dateDebut: "2025-03-20",
      dateFin: "2025-03-25",
      projetId: 2,
      userId: 2,
    },
    {
      id: 5,
      nom: "Rédiger documentation",
      description: "Créer la documentation technique et utilisateur",
      statut: "in-progress",
      priorite: "basse",
      dateDebut: "2025-04-01",
      dateFin: "2025-04-10",
      projetId: 3,
      userId: 1,
    },
  ]

  useEffect(() => {
    // Load task data and related data
    loadTaskData()
  }, [id])

  const loadTaskData = async () => {
    setLoading(true)
    try {
      // In a real app, you would fetch this data from an API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Load projects and users
      setProjects(projectsData)
      setUsers(usersData)

      // Find the task by ID
      const taskId = Number.parseInt(id)
      const task = tasksData.find((t) => t.id === taskId)

      if (task) {
        setFormData({
          id: task.id,
          nom: task.nom,
          description: task.description || "",
          statut: task.statut,
          priorite: task.priorite,
          dateDebut: task.dateDebut,
          dateFin: task.dateFin,
          projetId: task.projetId,
          userId: task.userId,
        })
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error("Error loading task data:", error)
      alert("Une erreur s'est produite lors du chargement des données de la tâche.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // In a real app, you would send this data to an API
      console.log("Form data to submit:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect back to tasks list
      navigate("/tasks")
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Une erreur s'est produite lors de la mise à jour de la tâche.")
    } finally {
      setSaving(false)
    }
  }

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderChefProjet />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Tâche non trouvée</h2>
              <p className="text-gray-600 mb-4">La tâche que vous recherchez n'existe pas ou a été supprimée.</p>
              <button
                onClick={() => navigate("/tasks")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste des tâches
              </button>
            </div>
          </div>
        </main>
        <FooterChefProjet />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Retour"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Modifier la tâche</h1>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow p-6 flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-gray-200 rounded col-span-2"></div>
                      <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom de la tâche */}
                  <div className="col-span-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la tâche *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Entrez le nom de la tâche"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez la tâche en détail"
                    ></textarea>
                  </div>

                  {/* Projet */}
                  <div>
                    <label htmlFor="projetId" className="block text-sm font-medium text-gray-700 mb-1">
                      Projet *
                    </label>
                    <select
                      id="projetId"
                      name="projetId"
                      required
                      value={formData.projetId}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez un projet</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assigné à */}
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                      Assigné à *
                    </label>
                    <select
                      id="userId"
                      name="userId"
                      required
                      value={formData.userId}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez un utilisateur</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Statut */}
                  <div>
                    <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="not-started">Non commencé</option>
                      <option value="in-progress">En cours</option>
                      <option value="blocked">Bloqué</option>
                      <option value="completed">Terminé</option>
                    </select>
                  </div>

                  {/* Priorité */}
                  <div>
                    <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">
                      Priorité
                    </label>
                    <select
                      id="priorite"
                      name="priorite"
                      value={formData.priorite}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="basse">Basse</option>
                      <option value="moyenne">Moyenne</option>
                      <option value="haute">Haute</option>
                      <option value="critique">Critique</option>
                    </select>
                  </div>

                  {/* Date de début */}
                  <div>
                    <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de début
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dateDebut"
                        name="dateDebut"
                        value={formData.dateDebut}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Date de fin */}
                  <div>
                    <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'échéance *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dateFin"
                        name="dateFin"
                        required
                        value={formData.dateFin}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Enregistrement..." : "Enregistrer"}
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

export default EditTaskCf

