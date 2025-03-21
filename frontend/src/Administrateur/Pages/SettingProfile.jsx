import React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Briefcase, ArrowLeft, MapPin, Save } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"

const EditProfileAdmin = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    avatar: null,
  })

  const [previewAvatar, setPreviewAvatar] = useState(null)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result)
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get existing user data
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}

    // Update with new profile data
    const updatedUser = {
      ...storedUser,
      nom: profile.name,
      email: profile.email,
      address: profile.address,
      avatar: profile.avatar,
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))
    localStorage.setItem("role", profile.role)

    // Navigate back to profile page
    navigate("/profile")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/profile" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-white-500 to-white-600 p-6 flex flex-col items-center">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  {previewAvatar || profile.avatar ? (
                    <img
                      src={previewAvatar || profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-blue-500" />
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" >
                  <span className="text-white text-sm">Change</span>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Link
                    to="/profile"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditProfileAdmin

