import React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {ArrowLeft,User,Phone,Mail,MapPin,
} from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const DetailClient = () => {
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchClientDetails = () => {
      setLoading(true)

      // Mock data for a specific client
      setTimeout(() => {
        const clientData = {
          id: Number.parseInt(id),
          utilisateur: {
            nom: "Jean Dupont",
            prenom: "Jean",
            nom_famille: "Dupont",
            email: "jean.dupont@example.com",
            date_inscription: "2022-05-15",
            avatar: null,
          },
          telephone: "0612345678",
          status: "active",
          adresse: {
            rue: "123 Rue de la Paix",
            ville: "Paris",
            code_postal: "75001",
            pays: "France",
          },
          projets: [
            {
              id: 1,
              nom: "Site Web E-commerce",
              status: "in-progress",
              date_debut: "2023-01-10",
              date_fin_estimee: "2023-04-30",
              budget: 15000,
              description:
                "Création d'un site e-commerce complet avec système de paiement intégré et gestion des stocks.",
            },
            {
              id: 2,
              nom: "Application Mobile",
              status: "planning",
              date_debut: "2023-05-15",
              date_fin_estimee: "2023-08-30",
              budget: 25000,
              description:
                "Développement d'une application mobile iOS et Android pour la gestion des commandes clients.",
            },
          ],
          factures: [
            {
              id: 101,
              numero: "FACT-2023-101",
              date: "2023-02-15",
              montant: 5000,
              status: "paid",
            },
            {
              id: 102,
              numero: "FACT-2023-102",
              date: "2023-03-20",
              montant: 7500,
              status: "pending",
            },
          ],
          notes: [
            {
              id: 1,
              date: "2023-02-10",
              contenu: "Réunion initiale pour discuter des besoins du projet e-commerce.",
            },
            {
              id: 2,
              date: "2023-03-05",
              contenu:
                "Client satisfait de l'avancement du projet. Demande quelques ajustements mineurs sur la page d'accueil.",
            },
          ],
          statistiques: {
            valeur_totale_projets: 40000,
            projets_completes: 1,
            projets_en_cours: 2,
            factures_payees: 1,
            factures_en_attente: 1,
          },
        }

        setClient(clientData)
        setLoading(false)
      }, 800)
    }

    fetchClientDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des informations client...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-6">
            <Link to="/clients" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour à la liste des clients
            </Link>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-500">
                Vue d'ensemble
              </button>  
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations de contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Nom complet</p>
                      <p className="text-gray-800">
                        {client.utilisateur.prenom} {client.utilisateur.nom_famille}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{client.utilisateur.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-gray-800">{client.telephone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-gray-800">{client.adresse.rue}</p>
                      <p className="text-gray-800">
                        {client.adresse.code_postal} {client.adresse.ville}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistiques</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-1">Valeur totale</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatCurrency(client.statistiques.valeur_totale_projets)}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 mb-1">Projets terminés</p>
                    <p className="text-xl font-bold text-green-900">{client.statistiques.projets_completes}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-700 mb-1">Projets en cours</p>
                    <p className="text-xl font-bold text-purple-900">{client.statistiques.projets_en_cours}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>

                <div className="space-y-4">
                  {client.projets.length > 0 && (
                    <div className="border-l-2 border-blue-500 pl-4 py-1">
                      <p className="text-sm font-medium text-gray-800">Nouveau projet: {client.projets[0].nom}</p>
                      <p className="text-xs text-gray-500">{formatDate(client.projets[0].date_debut)}</p>
                    </div>
                  )}

                  <div className="border-l-2 border-gray-300 pl-4 py-1">
                    <p className="text-sm font-medium text-gray-800">Client créé</p>
                    <p className="text-xs text-gray-500">{formatDate(client.utilisateur.date_inscription)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DetailClient

