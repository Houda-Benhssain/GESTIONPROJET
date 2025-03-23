import React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Briefcase, ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import HeaderEquipe from "../component/HeaderEquipe"
import FooterEquipe from "../component/FooterEquipe"

const ProfileEquipe = () => {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Chef de Projet",
    email: "chef.projet@example.com",
    address: "123 Rue de la Gestion, 75001 Paris",
    role: "Project Manager",
    avatar: null,
  })

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([
    { date: new Date(2025, 2, 21), title: "Team Meeting", time: "10:00 AM" },
    { date: new Date(2025, 2, 23), title: "Client Presentation", time: "2:00 PM" },
    { date: new Date(2025, 2, 25), title: "Project Deadline", time: "5:00 PM" },
  ])

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const storedRole = localStorage.getItem("role")
    if (storedUser) {
      setProfile({
        name: storedUser.nom || "Chef de Projet",
        email: storedUser.email || "chef.projet@example.com",
        address: storedUser.address || "123 Rue de la Gestion, 75001 Paris",
        role: storedRole || "Project Manager",
        avatar: storedUser.avatar || null,
      })
    }
  }, [])

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Check if a date has events
  const hasEvents = (date) => {
    return events.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Check if date is today
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if date is selected
  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Render calendar
  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const daysInPrevMonth = getDaysInMonth(year, month - 1)

    const days = []

    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i)
      days.push(
        <div
          key={`prev-${i}`}
          className="text-gray-400 p-1 text-center text-xs h-7 w-7 flex items-center justify-center"
        >
          {daysInPrevMonth - i}
        </div>,
      )
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const hasEvent = hasEvents(date)

      days.push(
        <div
          key={`current-${i}`}
          className={`p-1 text-center text-xs cursor-pointer transition-all duration-200 ${
            isToday(date) ? "border border-primary" : ""
          } ${isSelected(date) ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-gray-100"} ${
            hasEvent && !isSelected(date) ? "font-medium" : ""
          } rounded-full h-7 w-7 flex items-center justify-center`}
          onClick={() => setSelectedDate(date)}
        >
          {i}
          {hasEvent && !isSelected(date) && <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>}
        </div>,
      )
    }

    // Next month's days
    const totalCells = 42 // 6 rows of 7 days
    const remainingCells = totalCells - days.length

    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i)
      days.push(
        <div
          key={`next-${i}`}
          className="text-gray-400 p-1 text-center text-xs h-7 w-7 flex items-center justify-center"
        >
          {i}
        </div>,
      )
    }

    return days
  }

  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderEquipe />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-8 px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-xs text-blue-100 mb-2">
                  <span>Équipes</span>
                  <span className="mx-2">›</span>
                  <span>Profil</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Profil</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link
              to="/Home/Equipe"
              className="text-gray-500 hover:text-primary transition-colors mr-4 flex items-center gap-1"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 border-l-4 border-l-primary">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 flex flex-col items-center">
                <div className="relative">
                  <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-14 w-14 text-primary" />
                    )}
                  </div>
                </div>
                <h2 className="mt-4 text-lg font-bold text-gray-900">{profile.name}</h2>
                <p className="text-primary font-medium">{profile.role}</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="text-gray-800 font-medium">{profile.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-800 font-medium">{profile.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="md:col-span-2">
              <div className="space-y-8">
                {/* Calendar */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 border-l-4 border-l-blue-500">
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h2 className="text-base font-bold text-gray-800">{formatMonthYear(currentDate)}</h2>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-gray-500 font-medium text-center p-1 text-xs">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 relative">{renderCalendar()}</div>
                </div>

                {/* Events for selected date */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 border-l-4 border-l-orange-500">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Events for{" "}
                      {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </h3>
                  </div>

                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getEventsForDate(selectedDate).map((event, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-primary pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors"
                        >
                          <p className="font-bold text-gray-800 text-sm">{event.title}</p>
                          <p className="text-primary font-medium text-xs">{event.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No events scheduled for this day.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterEquipe />
    </div>
  )
}

export default ProfileEquipe

