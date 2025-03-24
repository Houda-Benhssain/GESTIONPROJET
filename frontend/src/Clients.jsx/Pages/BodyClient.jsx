import React from "react"
import { useState } from "react"
import { CheckCircle, FileText, Calendar, Users, Plus, Trash2, ChevronRight } from "lucide-react"
import FooterClient from "../component/FooterClient"
import HeaderClient from "../component/HeaderClient"
import IntroductionPanel from "./introduction-panel"
import ProjectProgress from "./project-progress"

export default function ClientDashboard() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design a facebook ad", completed: false, color: "blue" },
    { id: 2, text: "Analyze Data", completed: false, color: "blue" },
    { id: 3, text: "Youtube campaign", completed: false, color: "blue" },
    { id: 4, text: "Assign 10 employee", completed: false, color: "blue" },
    { id: 5, text: "Meeting at 12", completed: false, color: "blue" },
    { id: 6, text: "Meeting at 10", completed: false, color: "blue" },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim() !== "") {
      // Assign a random color from the available colors - now all blue shades
      const colors = ["blue", "indigo", "sky", "blue", "blue", "indigo"]
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

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed))
  }

  // Current date
  const today = new Date()
  const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" }

  // Function to get the appropriate color class for the task circle
  const getColorClass = (color) => {
    const colorClasses = {
      blue: "border-blue-400 text-blue-500 bg-blue-50",
      indigo: "border-indigo-400 text-indigo-500 bg-indigo-50",
      sky: "border-sky-400 text-sky-500 bg-sky-50",
      cyan: "border-cyan-400 text-cyan-500 bg-cyan-50",
    }
    return colorClasses[color] || colorClasses.blue
  }

  // Count completed tasks
  const completedTasksCount = tasks.filter((task) => task.completed).length

  return (
    <div className="min-h-screen bg-blue-50">
      <HeaderClient />

      {/* Modern gradient header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-xs text-blue-100 mb-2">
                <span>équipe</span>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>Client</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Tableau de bord du client</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards with shadow and hover effects */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">12</div>
                <div className="text-sm text-blue-500">Tâches terminées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">5</div>
                <div className="text-sm text-blue-500">Membres de l'équipe</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-700">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">3</div>
                <div className="text-sm text-blue-500"> Projets actifs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-400">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">2</div>
                <div className="text-sm text-blue-500">Réunions planifiées</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Panel */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <IntroductionPanel />
      </div>

      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Project Progress Component */}
          <div className="w-full lg:w-1/2">
            <ProjectProgress />
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Projets actifs</h2>
              <span className="text-blue-500 text-xs">Mises à jour du statut</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-600 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
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
                    <h3 className="font-semibold text-xs text-blue-800">Website Redesign Project</h3>
                    <span className="text-blue-500 text-[10px]">15 minutes ago</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-blue-500 text-[10px]">Frontend development in progress</p>
                    <span className="text-blue-500 text-[10px]">30 tasks, 5 issues</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
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
                    <h3 className="font-semibold text-xs text-blue-800">Social Media Campaign</h3>
                    <span className="text-blue-500 text-[10px]">2 hours ago</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <p className="text-blue-500 text-[10px]">Content creation phase</p>
                    <span className="text-blue-500 text-[10px]">15 tasks, 2 issues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Modern To-Do List Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">To Do List</h2>
              {completedTasksCount > 0 && (
                <button
                  onClick={deleteCompletedTasks}
                  className="flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium px-3 py-1 bg-blue-50 rounded-full"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer les terminés
                </button>
              )}
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-2 mb-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl flex items-center justify-between ${
                      task.completed ? "bg-red-50" : getColorClass(task.color)
                    } transition-colors`}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-lg ${
                          task.completed ? "bg-blue-200 text-red-500" : `border-2 ${getColorClass(task.color)}`
                        } flex items-center justify-center mr-2 transition-colors`}
                      >
                        {task.completed && <CheckCircle className="h-3 w-3" />}
                      </button>
                      <span
                        className={`font-medium text-sm ${task.completed ? "line-through text-indigo-700" : "text-indigo-700"}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {task.completed && (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-blue-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-blue-500 bg-blue-50 rounded-xl">Aucune tâche d'équipe. Ajoutez-en une ci-dessous.</div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex items-center bg-blue-50 rounded-xl p-3">
                <button
                  type="submit"
                  className="text-blue-700 hover:text-blue-800 mr-2 p-1 rounded-full hover:bg-blue-100"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Ajouter une nouvelle tâche..."
                  className="flex-1 bg-transparent border-none text-blue-800 px-2 py-2 text-sm focus:outline-none focus:ring-0 placeholder-blue-300"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                 Ajouter
                </button>
              </div>
            </form>
          </div>

          {/* Simple Calendar Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <SimpleCalendar />
          </div>
        </div>
      </div>
      <FooterClient />
    </div>
  )
}

// Simple Calendar Component
function SimpleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get month and year for display
  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Get days in month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-7 text-[10px] text-blue-300 py-1"></div>)
    }

    // Add days of the month
    const today = new Date()

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => setSelectedDate(new Date(year, month, day))}
          className={`h-7 flex items-center justify-center text-[11px] rounded-full cursor-pointer
            ${isToday ? "border border-blue-500" : ""}
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${!isToday && !isSelected ? "hover:bg-blue-100 text-blue-700" : ""}
          `}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Calendrier</h2>
        <div className="flex items-center space-x-2">
          <button onClick={prevMonth} className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <span className="text-sm font-medium text-blue-700">{monthYear}</span>
          <button onClick={nextMonth} className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
          <div key={i} className="text-[10px] font-medium text-blue-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">{generateCalendarDays()}</div>

      <div className="mt-4 text-center">
        <div className="text-sm text-blue-600 font-medium">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </>
  )
}

