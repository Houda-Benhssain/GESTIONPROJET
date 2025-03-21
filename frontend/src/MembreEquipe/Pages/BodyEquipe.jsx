import React from "react"
import { useState } from "react"
import HeaderEquipe from "../component/HeaderEquipe"
import FooterEquipe from "../component/FooterEquipe"
import imagePlanIt from "../../Image/imagePlanIt.jpg";
import {
  CheckCircle,
  FileText,
  Calendar,
  Maximize2,
  X,
  RefreshCw,
  Link2,
  Users,
  MessageSquare,
  Clock,
} from "lucide-react"

const HomeEquipe = () => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [welcomeVisible, setWelcomeVisible] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderEquipe />
      <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
        {/* Team Summary Section */}
        <div className="mb-2">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>Équipes</span>
            <span className="mx-2">/</span>
            <span>Mon équipe</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tableau de bord d'équipe</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold">12 tâches</div>
                  <div className="text-xs text-gray-500">terminées ce mois-ci</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold">5 membres</div>
                  <div className="text-xs text-gray-500">dans l'équipe</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold">3 projets</div>
                  <div className="text-xs text-gray-500">en cours</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold">2 réunions</div>
                  <div className="text-xs text-gray-500">prévues cette semaine</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {welcomeVisible && (
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Bienvenue dans votre espace équipe</h2>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Maximize">
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Link">
                  <Link2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setWelcomeVisible(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={imagePlanIt}
                  alt="Team collaboration"
                  className="max-w-full h-auto max-h-48"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Collaborez efficacement</h3>
                <p className="text-gray-700 mb-3">
                  Bienvenue dans votre espace d'équipe. Ici, vous pouvez suivre les projets en cours, communiquer avec
                  vos collègues et gérer vos tâches quotidiennes.
                </p>
                <div className="flex items-center text-gray-500 text-sm mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Mis à jour aujourd'hui</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-base font-bold mb-4 text-gray-800">Activité de l'équipe</h2>

            <div className="relative w-36 h-36 mx-auto mb-4">
              {/* Placeholder for chart */}
              <svg className="absolute inset-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1C8.61116 1 1 8.61116 1 18C1 27.3888 8.61116 35 18 35Z"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-800 text-sm font-semibold">85%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Mise à jour du site web</h3>
                  <p className="text-gray-500 text-xs">Aujourd'hui, 10:45</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Terminé</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Réunion hebdomadaire</h3>
                  <p className="text-gray-500 text-xs">Hier, 14:30</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Terminé</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Préparation présentation</h3>
                  <p className="text-gray-500 text-xs">20 Mars, 16:00</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  En cours
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-gray-800">Membres de l'équipe</h2>
              <span className="text-gray-500 text-xs">5 membres actifs</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-medium">JD</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Jean Dupont</h3>
                    <span className="text-gray-500 text-xs">Chef d'équipe</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-gray-500 text-xs">jean.dupont@example.com</p>
                    <span className="text-xs font-medium px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                      En ligne
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-medium">ML</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Marie Lefebvre</h3>
                    <span className="text-gray-500 text-xs">Développeur</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-gray-500 text-xs">marie.lefebvre@example.com</p>
                    <span className="text-xs font-medium px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                      En ligne
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-medium">PB</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Pierre Bernard</h3>
                    <span className="text-gray-500 text-xs">Designer</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-gray-500 text-xs">pierre.bernard@example.com</p>
                    <span className="text-xs font-medium px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded-full">
                      Absent
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                Voir tous les membres
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 bg-white rounded-lg p-4 flex flex-col items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-base font-bold mb-3 text-gray-800 self-start">Tâches d'équipe</h2>

            <form onSubmit={handleSubmit} className="mb-3 w-full max-w-md">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Ajouter une tâche d'équipe..."
                  className="flex-1 bg-gray-100 text-gray-800 px-2 py-1.5 text-sm rounded-l border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-r font-medium transition-colors shadow-sm"
                >
                  Ajouter
                </button>
              </div>
            </form>

            <div className="space-y-1.5 w-full max-w-md">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center bg-gray-50 rounded-lg p-1.5 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-4 h-4 rounded-sm border ${
                      task.completed ? "bg-blue-500 border-blue-500" : "border-blue-500"
                    } flex items-center justify-center mr-2`}
                  >
                    {task.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-sm text-gray-800 flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-0.5 rounded transition-colors ml-2"
                    aria-label="Delete task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  Aucune tâche d'équipe. Ajoutez-en une ci-dessus.
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-gray-800">Prochaines réunions</h2>
              <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors text-xs">
                Voir tout
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-blue-700 text-xs font-bold">24</span>
                  <span className="text-blue-700 text-xs">Mar</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-800">Réunion hebdomadaire</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">10:00 - 11:00</span>
                    <MessageSquare className="h-3 w-3 text-gray-500 ml-2" />
                    <span className="text-xs text-gray-500">Salle de conférence A</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-purple-700 text-xs font-bold">26</span>
                  <span className="text-purple-700 text-xs">Mar</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-800">Revue de projet</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">14:30 - 15:30</span>
                    <MessageSquare className="h-3 w-3 text-gray-500 ml-2" />
                    <span className="text-xs text-gray-500">Visioconférence</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 text-blue-600 hover:text-blue-700 text-sm font-medium border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors mt-2">
                + Planifier une réunion
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterEquipe />
    </div>
  )
}

export default HomeEquipe

