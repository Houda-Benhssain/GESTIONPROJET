import React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Briefcase, Save, Camera, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Project Manager",
    avatar: null,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...profile })

  useEffect(() => {}, [])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call to save profile
    setTimeout(() => {
      setProfile({ ...formData })
      setSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const roleOptions = [
    "Project Manager",
    "Developer",
    "Designer",
    "Product Owner",
    "Business Analyst",
    "QA Engineer",
    "DevOps Engineer",
    "Team Lead",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
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
                </div>

              </div>
            </div>

            {/* Edit Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditing ? "Edit Profile" : "Profile Information"}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {isEditing && (
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                            {formData.avatar ? (
                              <img
                                src={formData.avatar || "/placeholder.svg"}
                                alt={formData.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User className="h-12 w-12 text-gray-400" />
                            )}
                          </div>
                          
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        ) : (
                          <div className="block w-full pl-10 border border-gray-200 bg-gray-50 rounded-md py-2 px-3 sm:text-sm text-gray-800">
                            {profile.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        ) : (
                          <div className="block w-full pl-10 border border-gray-200 bg-gray-50 rounded-md py-2 px-3 sm:text-sm text-gray-800">
                            {profile.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                        </div>
                        {isEditing ? (
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required>
                            {roleOptions.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}</select>
                        ) : (
                          <div className="block w-full pl-10 border border-gray-200 bg-gray-50 rounded-md py-2 px-3 sm:text-sm text-gray-800">
                            {profile.role}
                          </div>
                        )}
                      </div>
                    </div>   
                  </div>
                </form>
              </div>

              {/* Additional sections could go here */}
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
                <p className="text-gray-500 mb-4">Manage your password and account security settings.</p>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Change Password
                </button>
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

