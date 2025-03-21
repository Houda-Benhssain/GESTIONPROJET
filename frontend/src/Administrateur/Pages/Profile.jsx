import React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Briefcase, ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"

const ProfilePage = () => {
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
        <div key={`prev-${i}`} className="text-gray-400 p-2 text-center">
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
          className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded-md ${
            isToday(date) ? "border border-blue-500" : ""
          } ${isSelected(date) ? "bg-blue-500 text-white hover:bg-blue-600" : ""} ${
            hasEvent && !isSelected(date) ? "font-bold" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {i}
          {hasEvent && !isSelected(date) && <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>}
        </div>,
      )
    }

    // Next month's days
    const totalCells = 42 // 6 rows of 7 days
    const remainingCells = totalCells - days.length

    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i)
      days.push(
        <div key={`next-${i}`} className="text-gray-400 p-2 text-center">
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/adminhome" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex flex-col items-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-blue-500" />
                    )}
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-blue-100">{profile.role}</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-gray-800">{profile.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800">{profile.address}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link
                    to="/editProfileAdmin"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* Calendar */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-full hover:bg-gray-100"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">{formatMonthYear(currentDate)}</h2>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-gray-500 font-medium text-center p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                </div>

                {/* Events for selected date */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Events for{" "}
                      {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </h3>
                  </div>

                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getEventsForDate(selectedDate).map((event, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <p className="font-bold text-gray-800">{event.title}</p>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No events scheduled for this day.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage

