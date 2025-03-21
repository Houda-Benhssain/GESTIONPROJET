import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, UserPlus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

// Modal Composant avec Design Amélioré
const Modal = ({ isOpen, onClose, onConfirm, clientName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Confirmer la suppression</h3>
        <p className="text-sm text-gray-700 text-center">Êtes-vous sûr de vouloir supprimer le client <strong>{clientName}</strong> ?</p>
        <div className="mt-6 flex justify-center space-x-6">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none transition-all duration-300"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none transition-all duration-300"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

// Page des Clients avec Intégration du Modal
const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the clients:", error);
      });
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.toString().includes(searchTerm) ||
      client.utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handleDelete = (clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setModalOpen(true); // Ouvrir le modal
  };

  const confirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/clients/${clientToDelete.id}`)
      .then((response) => {
        setClients(clients.filter(client => client.id !== clientToDelete.id));
        setModalOpen(false); // Fermer le modal après suppression
        alert('Client supprimé avec succès');
      })
      .catch((error) => {
        console.error('Il y a eu une erreur lors de la suppression du client:', error);
        alert('Une erreur est survenue lors de la suppression');
        setModalOpen(false); // Fermer le modal en cas d'erreur
      });
  };

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
              to="/add"
              className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
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
                  onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Clients table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Projet</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentClients.length > 0 ? (
                    currentClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{client.utilisateur.nom.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{client.utilisateur.nom}</div>
                              <div className="text-sm text-gray-500 md:hidden">{client.telephone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">{client.telephone}</div>
                          <div className="text-sm text-gray-500">{client.utilisateur.email}</div>
                        </td>
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
                            <Link to="/detailsclient" className="text-blue-600 hover:text-blue-900" title="View details">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              to={`/editClient/${client.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit client">
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="Delete client"
                              onClick={() => handleDelete(client.id, client.utilisateur.nom)}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">Aucun client trouvé</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300">
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= filteredClients.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300">
              Suivant
            </button>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Modal de confirmation */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        clientName={clientToDelete ? clientToDelete.name : ""}
      />
    </div>
  );
};

export default ClientsPage;


