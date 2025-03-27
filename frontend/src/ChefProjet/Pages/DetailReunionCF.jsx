import React from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, MapPin } from "lucide-react"
import FooterChefProjet from "../component/FooterChefProjet"
import HeaderChefProjet from "../component/HeaderChefProjet"

export default function DetailReunionPageCF({
  reunion = {
    id: "123",
    name: "Réunion de planification Sprint 4",
    projet: "Système de Gestion des Tâches",
    dateDebut: "2023-11-15T09:00:00",
    dateFin: "2023-11-15T10:30:00",
    location: "Salle de conférence A",
  },
}) {
  // Calculate duration in hours and minutes
  const calculateDuration = () => {
    const start = new Date(reunion.dateDebut)
    const end = new Date(reunion.dateFin)
    const diffMs = end - start
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${diffHrs}h ${diffMins}min`
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <HeaderChefProjet />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    to="/HomePageAdmine"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    <svg
                      className="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Accueil
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Détails de la réunion</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            

              <div className="bg-blue-700 p-4 text-white">
                <h2 className="text-xl font-bold">{reunion.name}</h2>
                <p className="text-blue-100">{reunion.projet}</p>
              </div>

              <div className="p-6 bg-gradient-to-b from-blue-50 to-white">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(reunion.dateDebut)}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Heure</p>
                    <p className="font-medium">
                      {formatTime(reunion.dateDebut)} - {formatTime(reunion.dateFin)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="h-5 w-5 text-blue-600 mr-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">⏱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">{calculateDuration()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{reunion.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional information section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Participants</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                  <span className="text-sm font-medium">Jean Dupont</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    ML
                  </div>
                  <span className="text-sm font-medium">Marie Lefebvre</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    PB
                  </div>
                  <span className="text-sm font-medium">Pierre Bernard</span>
                </div>
              </div>
            </div>

            {/* Agenda section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Ordre du jour</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Revue des tâches de la semaine précédente</p>
                    <p className="text-sm text-gray-500">15 minutes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Planification du sprint</p>
                    <p className="text-sm text-gray-500">30 minutes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Questions et discussions</p>
                    <p className="text-sm text-gray-500">15 minutes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <FooterChefProjet />
    </div>
  )
}

