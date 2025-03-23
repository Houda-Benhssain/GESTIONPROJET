import React from "react"
import { useState, useRef, useEffect } from "react"
import { Bell, HelpCircle, Settings, Search, User, LogOut, Globe, ChevronDown, Check } from "lucide-react"
import { Link } from "react-router-dom"
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
              <div className="text-gray-500 p-2 rounded hover:bg-gray-100">
                <img  src={logo}/>
              </div>
              <span className="text-xl font-bold ml-1">PlanIt</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <div className="relative group">
                <button
                  className={`px-3 py-2 rounded flex items-center ${
                    activeTab === "your-work"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabClick("your-work")}
                >
                  Your work
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200 hidden group-hover:block">
                  <div className="py-1">
                    <Link to="/your-work/boards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Boards
                    </Link>
                  </div>
                </div>
              </div>

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
            <Link
              to="/createUser"
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hidden md:block hover:bg-blue-700" >
              Create
            </Link>

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
            <div className="relative" ref={helpMenuRef}>
              {isHelpMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-3 px-4">
                    <div className="text-lg font-medium mb-2">Documentation</div>
                    <p className="text-sm text-gray-600 mb-3">
                    PlanIt est un outil de gestion de projet qui aide les équipes à organiser les tâches, suivre les progrès et collaborer efficacement. Utilisez le menu de navigation pour accéder à vos projets, tableaux de bord et tâches. Le bouton de création vous permet d'ajouter de nouveaux éléments à votre espace de travail.
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                    La section Projets vous permet de créer et de gérer vos projets. Vous pouvez attribuer des membres d'équipe, définir des échéances et suivre les progrès. Le tableau de bord offre une vue d'ensemble de tous vos projets et tâches. Utilisez la section Clients pour gérer les informations des clients et les affectations de projets.
                    </p>
                    <p className="text-sm text-gray-600">
                    Les tâches peuvent être créées, attribuées et suivies via la section Tâches. Vous pouvez définir des priorités, des dates d'échéance et suivre l'état de chaque tâche. Utilisez la fonction de notifications pour rester informé des changements et des affectations. Pour des instructions plus détaillées, veuillez contacter le support.
                    </p>
                  </div>
                </div>
              )}
            </div>


            {/* Settings Button with Dropdown */}
            <div className="relative" ref={settingsMenuRef}>
              <button
                onClick={toggleSettingsMenu}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none" >
                <Settings className="h-5 w-5" />
              </button>

              {isSettingsMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200">Settings</div>

                    <Link
                      to="/settings/profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile settings
                    </Link>

                    <Link
                      to="/settings/language"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
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
            <div className="space-y-1">
              <button
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeTab === "your-work"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleTabClick("your-work")}
              >
                Your work
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-3">
                <Link
                  to="/your-work/boards"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Gant
                </Link>
              </div>
            </div>
            <Link
              to="/projects"
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === "projects"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Projects
            </Link>
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
                activeTab === "status"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Tasks
            </Link>

            <Link
              to="/creatUser"
              className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700" >
              Create
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