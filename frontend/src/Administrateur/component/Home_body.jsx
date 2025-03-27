import React from "react"
import { useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import {
  CheckCircle,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
} from "lucide-react"

const HomeBody = () => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([
    { id: 5, text: "Meeting at 12", completed: false, color: "pink" },
    { id: 6, text: "Meeting at 10", completed: false, color: "cyan" },
  ])

  // Sample meetings data with IDs for routing
  const meetings = [
    {
      id: "101",
      title: "Réunion hebdomadaire",
      date: { day: "24", month: "Mar" },
      time: "10:00 - 11:00",
      location: "Salle de conférence A",
      color: "blue",
      attendees: [0, 1, 2],
    },
    {
      id: "102",
      title: "Revue de projet",
      date: { day: "26", month: "Mar" },
      time: "14:30 - 15:30",
      location: "Visioconférence",
      color: "purple",
      attendees: [1, 2, 3],
    },
  ]

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

  // Get gradient class for meeting cards
  const getGradientClass = (color) => {
    const gradientClasses = {
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
      green: "from-green-400 to-green-600",
      amber: "from-amber-400 to-amber-600",
    }
    return gradientClasses[color] || gradientClasses.blue
  }

  // Count completed tasks
  const completedTasksCount = tasks.filter((task) => task.completed).length

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      {/* Modern gradient header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>Équipes</span>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>Administrateur</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Tableau de bord d'administrateur</h1>
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

            <h2 className="text-base font-bold mb-4 text-gray-800">Historique des transactions</h2>

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
                <span className="text-gray-800 text-sm font-semibold">75%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Transférer vers PayPal</h3>
                  <p className="text-gray-500 text-xs">07 Jan 2019, 09:12AM</p>
                </div>
                <span className="text-base font-bold text-blue-600">$236</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Transférer vers Stripe</h3>
                  <p className="text-gray-500 text-xs">07 Jan 2019, 09:12AM</p>
                </div>
                <span className="text-base font-bold text-blue-600">$593</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-gray-800">Projets ouverts</h2>
              <span className="text-gray-500 text-xs">Statut de vos données</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">
                      Conception du tableau de bord administrateur
                    </h3>
                    <span className="text-gray-500 text-xs">Il y a 15 minutes</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-gray-500 text-xs">Maquette d'application web de diffusion</p>
                    <span className="text-gray-500 text-xs">30 tâches, 5 problèmes</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-500 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">
                      Conception du tableau de bord administrateur
                    </h3>
                    <span className="text-gray-500 text-xs">Il y a 15 minutes</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-gray-500 text-xs">Maquette d'application web de diffusion</p>
                    <span className="text-gray-500 text-xs">30 tâches, 5 problèmes</span>
                  </div>
                </div>
              </div>
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
                  className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 rounded-full"
                >
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
                          className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                        >
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
                  className="bg-blue-700 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>

          {/* Réunions Section (Added as requested) */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Prochaines réunions</h2>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="relative group">
                  {/* Added Link wrapper around each meeting card */}
                  <Link to={`/DetailReunion/${meeting.id}`} className="block">
                    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${getGradientClass(meeting.color)} rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm`}
                      >
                        <span className="text-sm font-bold">{meeting.date.day}</span>
                        <span className="text-xs">{meeting.date.month}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{meeting.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center text-gray-500 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-xs">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{meeting.location}</span>
                          </div>
                        </div>
                        <div className="flex -space-x-2 mt-3">
                          {meeting.attendees.map((memberIndex) => (
                            <div
                              key={memberIndex}
                              className={`w-6 h-6 rounded-full ${teamMembers[memberIndex].color} flex items-center justify-center text-white text-xs border-2 border-white`}
                            >
                              {teamMembers[memberIndex].avatars[0]}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* View details button that appears on hover */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/reunion/${meeting.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}

              <Link to="/AddReunionAdmin">
                <button className="w-full py-3 text-blue-700 hover:text-indigo-800 text-sm font-medium border border-dashed border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier une réunion
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeBody

