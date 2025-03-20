import React from "react"
import { useState, useRef, useEffect } from "react"
import { Bell, HelpCircle, Settings, Search, User, LogOut, Globe, Check, Users,MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../../Image/square.png";

export default function HeaderChefProjet() {
  const [activeTab, setActiveTab] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const profileMenuRef = useRef(null)
  const settingsMenuRef = useRef(null)
  const notificationsRef = useRef(null)
  const helpMenuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
    if (isHelpMenuOpen) setIsHelpMenuOpen(false)
  }

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen)
    if (isProfileMenuOpen) setIsProfileMenuOpen(false)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
    if (isHelpMenuOpen) setIsHelpMenuOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    if (isProfileMenuOpen) setIsProfileMenuOpen(false)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isHelpMenuOpen) setIsHelpMenuOpen(false)

    if (!isNotificationsOpen) {
      loadNotifications()
    }
  }

  const toggleHelpMenu = () => {
    setIsHelpMenuOpen(!isHelpMenuOpen)
    if (isProfileMenuOpen) setIsProfileMenuOpen(false)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
  }

  const loadNotifications = async () => {
    setLoading(true)
    try {
      // Mock data for notifications since fetchNotifications is not available
      const mockNotifications = [
        {
          id: 1,
          title: "New Task Assigned",
          message: "You have been assigned a new task",
          time: "10 minutes ago",
          read: false,
        },
        {
          id: 2,
          title: "Project Update",
          message: "Dashboard project has been updated",
          time: "1 hour ago",
          read: true,
        },
      ]
      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation()
    try {
      // Mock markAsRead functionality
      setNotifications(
        notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async (e) => {
    e.stopPropagation()
    try {
      // Mock markAllAsRead functionality
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target)) {
        setIsHelpMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Load notifications on component mount
  useEffect(() => {
    loadNotifications()
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center mr-4">
              <div className="text-gray-500 p-2 rounded hover:bg-gray-100">
                <Link to="/dashbord">
                <img src={logo} />
                </Link>
              </div>
              <span className="text-xl font-bold ml-1">PlanIt</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "dashboard"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100" }`} >
                Dashboard
              </Link>

              <Link
                to="/projects/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "projects"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100" }`}>
                Projects
              </Link>

              <Link
                to="/clients/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "clients"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100" }`}>
                Clients
              </Link>

              <Link
                to="/tasks/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "tasks"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100" }`}  >
                Taches
              </Link>

              <Link
                to="/team/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "team"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}  >
                <Users className="h-4 w-4 mr-1" />
                Membres d'équipe
              </Link>
              <Link
                to="/chat/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "messages"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`} >
                <MessageSquare className="h-4 w-4 mr-1" />
                Messages
              </Link>
            </nav>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"/>
            </div>

            {/* Notifications Button with Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative" >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>)}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="py-1">
                    <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <button onClick={handleMarkAllAsRead} className="text-xs text-blue-600 hover:text-blue-800">
                        Mark all as read
                      </button>
                    </div>

                    {loading ? (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500 mx-auto mb-2"></div>
                        <p>Loading notifications...</p>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                            notification.read ? "bg-white" : "bg-blue-50"
                          }`}
                        >
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={(e) => handleMarkAsRead(notification.id, e)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Mark as read" >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}

                    <div className="px-4 py-2 text-center border-t border-gray-200">
                      <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help Button with Documentation Popup */}
            <div className="relative" ref={helpMenuRef}>
             <Link to="/documentation">
             <button
                onClick={toggleHelpMenu}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none" >
                <HelpCircle className="h-5 w-5" />
              </button>

             </Link>
            </div>

            {/* Settings Button with Dropdown */}
            <div className="relative" ref={settingsMenuRef}>
              <button
                onClick={toggleSettingsMenu}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none">
                <Settings className="h-5 w-5" />
              </button>

              {isSettingsMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200">Settings</div>

                    <Link
                      to="/profile/ChefProjet"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile settings
                    </Link>
                    <Link
                      to="/settings/language"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" >
                      <Globe className="h-4 w-4 mr-2" />
                      Language & region
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button with Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center focus:outline-none">
                <span className="font-medium text-sm">C</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Chef de Projet</p>
                      <p className="text-xs text-gray-500 mt-1">chef.projet@example.com</p>
                    </div>

                    <Link
                      to="/profile/chefProjet"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Your profile
                    </Link>

                    <Link
                      to="/settings"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-200 mt-1"></div>

                    <Link
                      to="/login"
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`} >
              Dashboard
            </Link>

            <Link
              to="/projects/ChefProjet"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "projects"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`} >
              Projects
            </Link>

            <Link
              to="/clients/ChefProjet"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "clients"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}  >
              Clients
            </Link>

            <Link
              to="/tasks/ChefProjet"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "tasks"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`} >
              Taches
            </Link>

            <Link
              to="/team/ChefProjet"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "team" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}>
              Membres d'équipe
            </Link>
          
              <Link
                to="/chat/ChefProjet"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "messages"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Messages
              </Link>

            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"/>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

