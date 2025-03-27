import React from "react"
import { useState, useEffect } from "react"
import { User, Rocket } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { Link } from "react-router-dom"

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  

  const [previewAvatar, setPreviewAvatar] = useState(null)

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const storedRole = localStorage.getItem("role")
    if (storedUser) {
      setProfile({
        name: storedUser.nom || "Chef de Projet",
        email: storedUser.email || "chef.projet@example.com",
        role: storedRole || "Project Manager",
      })
      console.log(storedUser)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = storedUser.id;
  
    const updatedUser = {
      name: profile.name,
      email: profile.email,
      password: profile.password || undefined, // N'inclure que si un nouveau mot de passe est saisi
      role: profile.role,
    };
  
    try {
      const response = await fetch(`http://ton-api.com/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Si nécessaire
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }
  
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data)); // Mettre à jour les infos stockées
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Échec de la mise à jour du profil");
    }
  };
  
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden m-0 p-0">
      <Header />
      <main className="flex-grow flex w-full h-full overflow-hidden">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left side with gradient background */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 p-8 text-white md:w-1/3 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 right-0 h-full w-16 md:block hidden">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0,0 L100,0 C50,50 50,50 0,100 Z" fill="white" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <Rocket className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Welcome</h2>
              <p className="text-sm opacity-90 mb-8">You are 30 seconds away from updating your profile information!</p>
              <Link to="/profile">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md font-medium w-full transition-colors">
                  Back to Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Right side with form */}
          <div className="bg-white p-6 md:p-8 md:w-2/3 overflow-y-auto">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-blue-100 shadow-md">
                    {previewAvatar || profile.avatar ? (
                      <img
                        src={previewAvatar || profile.avatar}
                        className="h-full w-full object-cover" />
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
                    onChange={handleAvatarChange}/>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required />
              </div>

              <div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Nouveau mot de passe
  </label>
  <input
    type="password"
    id="password"
    name="password"
    value={profile.password}
    onChange={handleChange}
    className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Laisser vide si inchangé"
  />
</div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditProfile

