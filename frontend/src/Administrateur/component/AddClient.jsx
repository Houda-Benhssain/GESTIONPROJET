import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Building, AlertCircle } from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"

const AddClientPage = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [client, setClient] = useState({
    nom: "",
    email: "",
    role: "client",  // Assurez-vous que le rôle est défini
    telephone: "",
    adresse: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value, // Mise à jour directe des champs dans client
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError("")

    // Vérification des champs obligatoires
    if (!client.nom || !client.email) {
      setFormError("Veuillez remplir tous les champs obligatoires")
      setSaving(false)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client), // On envoie directement client sans 'utilisateur'
      })

      if (response.ok) {
        navigate("/clients")
      } else {
        setFormError("Échec de l'ajout du client")
      }
    } catch (error) {
      setFormError("Erreur lors de l'ajout : " + error.message)
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/clients")}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Retour à la liste</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg border-t-4 border-blue-600 overflow-hidden">
            <div className="flex items-center p-6 bg-gradient-to-r">
              <div className="bg-white p-3 rounded-full mr-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-black">Ajouter un client</h1>
            </div>

            {formError && (
              <div className="p-4 mx-6 mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h2 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Informations personnelles
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-blue-800 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="nom" // Accès directement à nom dans l'objet client
                          value={client.nom}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Nom du client"
                          required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email" // Accès directement à email dans l'objet client
                          value={client.email}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="email@exemple.com"
                          required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Téléphone</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="telephone" // Accès directement à telephone dans l'objet client
                          value={client.telephone}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+33 6 12 34 56 78" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h2 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Adresse
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Adresse complète</label>
                    <div className="relative">
                      <textarea
                        name="adresse" // Accès directement à adresse dans l'objet client
                        rows="3"
                        value={client.adresse}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Numéro, rue, code postal, ville, pays"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Champs obligatoires
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center"
                  disabled={saving}
                >
                  {saving ? (
                    "Enregistrement..."
                  ) : (
                    <>
                      Enregistrer le client
                    </>
                  )}
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

export default AddClientPage
