import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserPlus, Edit, Trash2, Eye, Search, ChevronRight, ChevronLeft, Filter, Users } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const DeleteClientModal = ({ client, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer le client</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Êtes-vous sûr de vouloir supprimer
          <span className="font-semibold text-blue-600">{client.utilisateur.nom}</span>? Cette action ne peut pas être
          annulée.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700" >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

const ClientsPage = () => {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [clientToDelete, setClientToDelete] = useState(null)

  useEffect(() => {
    const mockClients = [
      {
        id: 1,
        utilisateur: {
          nom: "Jean Dupont",
          email: "jean.dupont@example.com",
        },
        telephone: "0612345678",
        status: "active",
        projets: [
          { id: 1, nom: "Site Web E-commerce" },
          { id: 2, nom: "Application Mobile" },
        ],
      },
      {
        id: 2,
        utilisateur: {
          nom: "Marie Martin",
          email: "marie.martin@example.com",
        },
        telephone: "0687654321",
        status: "active",
        projets: [{ id: 3, nom: "Refonte Site Vitrine" }],
      },
      {
        id: 3,
        utilisateur: {
          nom: "Pierre Durand",
          email: "pierre.durand@example.com",
        },
        telephone: "0698765432",
        status: "inactive",
        projets: [],
      },
      {
        id: 4,
        utilisateur: {
          nom: "Sophie Leroy",
          email: "sophie.leroy@example.com",
        },
        telephone: "0654321987",
        status: "active",
        projets: [{ id: 4, nom: "Application Web" }],
      },
      {
        id: 5,
        utilisateur: {
          nom: "Thomas Bernard",
          email: "thomas.bernard@example.com",
        },
        telephone: "0632165498",
        status: "inactive",
        projets: [{ id: 5, nom: "Maintenance" }],
      },
    ]

    setClients(mockClients)
  }, [])

  // Filter clients based on search term and status
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.toString().includes(searchTerm) ||
      client.utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination
  const indexOfLastClient = currentPage * itemsPerPage
  const indexOfFirstClient = indexOfLastClient - itemsPerPage
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient)

  const handleDeleteClick = (client) => {
    setClientToDelete(client)
  }

  const cancelDelete = () => {
    setClientToDelete(null)
  }

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter((client) => client.id !== clientToDelete.id))
      // Close the modal
      setClientToDelete(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Clients</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestion des Clients</h1>
        </div>
      </div>

      <main className="flex-grow p-4 md:p-6 -mt-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Stats card */}
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{clients.length}</div>
                <div className="text-sm text-gray-500">Clients totaux</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Liste des Clients</h2>
              <p className="text-sm text-gray-500 mt-1">Gérez vos relations avec les clients</p>
            </div>
            <Link
              to="/add"
              className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              <UserPlus className="h-4 w-4 mr-2" />
              Ajouter un nouveau client
            </Link>
          </div>

          {/* Filters and search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des clients..."
                  className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Clients table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider" >
                      Client
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider hidden lg:table-cell">
                      Projet
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider" >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {currentClients.length > 0 ? (
                    currentClients.map((client) => (
                      <tr key={client.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{client.utilisateur.nom}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">{client.telephone}</div>
                          <div className="text-sm text-gray-500">{client.utilisateur.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                            {client.projets.map((projet) => (
                              <div key={projet.id} className="text-blue-600 mb-1">
                                {projet.nom}
                              </div>))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/DetailClient/${client.id}`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              to={`/editClientCf/${client.id}`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(client)}
                              className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                        Aucun client trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delete  */}
          {clientToDelete && (
            <DeleteClientModal client={clientToDelete} onCancel={cancelDelete} onConfirm={confirmDelete} /> )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ClientsPage

