import React from "react"
import { useState } from "react"
import HeaderEquipe from "../component/HeaderEquipe"
import FooterEquipe from "../component/FooterEquipe"
import {CheckCircle,FileText,Calendar,X,Users,MessageSquare,Clock,ExternalLink,User,DollarSign,ShoppingCart,Plus,Trash2,Bell,ChevronRight,BarChart2,Zap,Star,} from "lucide-react"

const HomeEquipe = () => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([
    { id: 5, text: "Meeting at 12", completed: false, color: "pink" },
    { id: 6, text: "Meeting at 10", completed: false, color: "cyan" },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim() !== "") {
      // Assign a random color from the available colors
      const colors = ["blue", "green", "orange", "pink", "cyan", "purple"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, color: randomColor }])
      setNewTask("")
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Delete all completed tasks
  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed))
  }

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Chef d'équipe",
      time: "En ligne",
      avatars: ["JD"],
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Marie Lefebvre",
      role: "Développeur",
      time: "En ligne",
      avatars: ["ML", "JD"],
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Pierre Bernard",
      role: "Designer",
      time: "Absent",
      avatars: ["PB", "ML", "JD"],
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Sophie Martin",
      role: "Marketing",
      time: "En pause",
      avatars: ["SM", "PB"],
      color: "bg-amber-500",
    },
  ]

  // Current date
  const today = new Date()
  const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" }
  const formattedDate = today.toLocaleDateString("fr-FR", options)

  // Function to get the appropriate color class for the task circle
  const getColorClass = (color) => {
    const colorClasses = {
      blue: "border-blue-400 text-blue-500 bg-blue-50",
      green: "border-green-400 text-green-500 bg-green-50",
      orange: "border-orange-400 text-orange-500 bg-orange-50",
      pink: "border-pink-400 text-pink-500 bg-pink-50",
      cyan: "border-cyan-400 text-cyan-500 bg-cyan-50",
      purple: "border-purple-400 text-purple-500 bg-purple-50",
    }
    return colorClasses[color] || colorClasses.blue
  }

  // Count completed tasks
  const completedTasksCount = tasks.filter((task) => task.completed).length

  return (
    <div className="min-h-screen bg-blue-50">
      <HeaderEquipe />

      {/* Modern gradient header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>Équipes</span>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>Mon équipe</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Tableau de bord d'équipe</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards with shadow and hover effects */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">Tâches terminées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-500">Membres d'équipe</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-500">Projets en cours</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-gray-500">Réunions prévues</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto mt-6">
    
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="border-b border-gray-200 pb-4 mb-5">
              <div className="text-sm text-blue-600 font-medium">{formattedDate}</div>
              <h2 className="text-2xl font-bold text-gray-800">Bonjour, Houda!</h2>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-medium text-blue-700">Visiteurs</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">2,110</div>
                  <div className="flex items-center mt-2 text-xs text-blue-600">
                    <BarChart2 className="h-3 w-3 mr-1" />
                    <span>+12% par rapport à la semaine dernière</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-500 p-2 rounded-lg mr-3">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-medium text-green-700">Revenus</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">8.2M€</div>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <Zap className="h-3 w-3 mr-1" />
                    <span>+8.3% par rapport au mois dernier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Membres de l'équipe</h2>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center text-white font-medium mr-3`}
                      >
                        {member.avatars[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          member.time === "En ligne"
                            ? "bg-green-100 text-green-700"
                            : member.time === "En pause"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-right">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-end"
              >
                Voir tous les membres
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Modern To-Do List Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">To Do List</h2>
              {completedTasksCount > 0 && (
                <button
                  onClick={deleteCompletedTasks}
                  className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 rounded-full" >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer terminées
                </button>
              )}
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-3 mb-6">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl flex items-center justify-between ${
                      task.completed ? "bg-gray-50" : getColorClass(task.color)
                    } transition-colors`}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg ${
                          task.completed ? "bg-gray-200 text-gray-500" : `border-2 ${getColorClass(task.color)}`
                        } flex items-center justify-center mr-3 transition-colors`}
                      >
                        {task.completed && <CheckCircle className="h-4 w-4" />}
                      </button>
                      <span
                        className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {task.completed && (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                Aucune tâche d'équipe. Ajoutez-en une ci-dessous.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex items-center bg-gray-50 rounded-xl p-3">
                <button
                  type="submit"
                  className="text-blue-700 hover:text-indigo-700 mr-2 p-1 rounded-full hover:bg-indigo-50"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Ajouter une nouvelle tâche..."
                  className="flex-1 bg-transparent border-none text-gray-800 px-2 py-2 text-sm focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ajouter
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Prochaines réunions</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <span className="text-sm font-bold">24</span>
                  <span className="text-xs">Mar</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Réunion hebdomadaire</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10:00 - 11:00</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>Salle de conférence A</span>
                    </div>
                  </div>
                  <div className="flex -space-x-2 mt-3">
                    {teamMembers.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-white text-xs border-2 border-white`} >
                        {member.avatars[0]}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                      +2
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <span className="text-sm font-bold">26</span>
                  <span className="text-xs">Mar</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Revue de projet</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>14:30 - 15:30</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>Visioconférence</span>
                    </div>
                  </div>
                  <div className="flex -space-x-2 mt-3">
                    {teamMembers.slice(1, 4).map((member, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-white text-xs border-2 border-white`}
                      >
                        {member.avatars[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <FooterEquipe />
    </div>
  )
}

export default HomeEquipe

