import React from "react"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Bell, HelpCircle, Search, User, LogOut, ChevronDown, } from "lucide-react"
import logo from "../../Image/square.png";

export default function Header() {
  const [activeTab, setActiveTab] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  const profileMenuRef = useRef(null)
  const settingsMenuRef = useRef(null)
  const notificationsRef = useRef(null)
  const helpMenuRef = useRef(null)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

 
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
    if (isHelpMenuOpen) setIsHelpMenuOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    if (isProfileMenuOpen) setIsProfileMenuOpen(false)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isHelpMenuOpen) setIsHelpMenuOpen(false)

  }

  const toggleHelpMenu = () => {
    setIsHelpMenuOpen(!isHelpMenuOpen)
    if (isProfileMenuOpen) setIsProfileMenuOpen(false)
    if (isSettingsMenuOpen) setIsSettingsMenuOpen(false)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
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
  const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) {
        setUserName(user.nom), 
        setUserEmail(user.email) 
      }
    }, [])



  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center mr-4">
              <Link to="/HomePageAdmine">
              <div className="text-gray-500 p-2 rounded hover:bg-gray-100">
                <img  src={logo}/>
              </div>
              </Link>
              <span className="text-xl font-bold ml-1">PlanIt</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <Link
                to="/adminhome"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "dashboards"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"}`}>
                Dashboards
              </Link>

              <Link
                to="/projects"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "projects"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`} >
                Projects
              </Link>
              <Link
                to="/clients"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "clients"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}>
                Clients
              </Link>

              <Link
                to="/tasks"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "tasks"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`} >
                Tasks
              </Link>
              <Link
                to="/users"
                className={`px-3 py-2 rounded flex items-center ${
                  activeTab === "users"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Utilisateurs
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
                placeholder="Search"
              />
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
                  </div>

            {/* Help Button with Documentation Popup */}
             <div className="relative" ref={helpMenuRef}>
                  <Link to="/documentationAdmin">
                    <button onClick={toggleHelpMenu} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none" >
                            <HelpCircle className="h-5 w-5" />
                    </button>
                  </Link>
              </div>

            {/* Profile Button with Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center focus:outline-none"
              >
                <span className="font-medium text-sm">H</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
                    </div>

                    <Link
                      to="/profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Votre profil
                    </Link>

                    <Link
                      to="/settings/profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Paramètres du profil
                    </Link>
                    <div className="border-t border-gray-200 mt-1"></div>
                    <Link
                      to="/"
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
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
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "dashboards"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Dashboards
            </Link>
            <Link
              to="/projects"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "projects"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Projets
            </Link>
          
            <Link
              to="/clients"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "clients"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Clients
            </Link>
            <Link
              to="/tasks"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "taches"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Taches
            </Link>
            <Link
              to="/creatUser"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "user"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Utilisateur
            </Link>

         
            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="recherche"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}