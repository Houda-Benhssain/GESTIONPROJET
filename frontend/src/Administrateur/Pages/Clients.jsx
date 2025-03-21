import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserPlus, Edit, Trash2, Eye, Search } from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const DeleteClientModal = ({ client, onCancel, onConfirm }) => {
  if (!client) return null
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer le client</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Êtes-vous sûr de vouloir supprimer{" "}
          <span className="font-semibold text-red-600">{client.utilisateur.nom}</span>? Cette action ne peut pas être
          annulée.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

const ClientsPage = () => {
<<<<<<< HEAD
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [clientToDelete, setClientToDelete] = useState(null)

=======
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
>>>>>>> 03da35fc5043c1b69cde32cbf4c2e69753f34b7f
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
      // Remove from local data
      setClients(clients.filter((client) => client.id !== clientToDelete.id))
      // Close the modal
      setClientToDelete(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez vos relations avec les clients</p>
            </div>
            <Link
              to="/add_clients"
              className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Ajouter un nouveau client
            </Link>
          </div>

          {/* Filters and search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
<<<<<<< HEAD
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
=======
                  onChange={(e) => setSearchTerm(e.target.value)} />
              </div>

  
>>>>>>> 03da35fc5043c1b69cde32cbf4c2e69753f34b7f
            </div>
          </div>

          {/* Clients table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                    >
                      Contact
                    </th>
<<<<<<< HEAD
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
=======
                    
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
>>>>>>> 03da35fc5043c1b69cde32cbf4c2e69753f34b7f
                      Projet
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentClients.length > 0 ? (
                    currentClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">{client.telephone}</div>
                          <div className="text-sm text-gray-500">{client.utilisateur.email}</div>
                        </td>
<<<<<<< HEAD

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {client.projets && client.projets.length > 0 ? (
                            client.projets.map((projet) => (
                              <div key={projet.id} className="text-blue-600">
                                {projet.nom}
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-500">No projects</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
=======
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
  {client.projets && client.projets.length > 0 ? (
    client.projets.map((projet) => (
      <div key={projet.id} className="text-blue-600">{projet.nom}</div>
    ))
  ) : (
    <span className="text-gray-500">Aucun projet</span>
  )}
</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link to  ="/detailsclient"className="text-blue-600 hover:text-blue-900" title="View details">
                              <Eye className="h-4 w-4" />
                            </Link>
>>>>>>> 03da35fc5043c1b69cde32cbf4c2e69753f34b7f
                            <Link
                              to={`/DetailClientCF/${client.id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              to={`/editClientCf/${client.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit client"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(client)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete client"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        Aucun client trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {clientToDelete && (
            <DeleteClientModal client={clientToDelete} onCancel={cancelDelete} onConfirm={confirmDelete} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ClientsPage

