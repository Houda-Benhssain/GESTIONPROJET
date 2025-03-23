import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Edit, Trash2, Eye, Search, ChevronRight, ChevronLeft, Filter, Users } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";


const Modal = ({ isOpen, onClose, onConfirm, clientName }) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Confirmer la suppression</h3>
            <p className="text-center">Êtes-vous sûr de vouloir supprimer le client <strong>{clientName}</strong></p>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md mr-2"
              >
                Annuler
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
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

  // Charger les clients depuis l'API
  const loadClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/clients"); // Adapter l'URL si nécessaire
      const data = await response.json();
      console.log(data); // Vérification des données reçues
      setClients(data); // Définir les clients récupérés
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Charger les clients au premier rendu
  useEffect(() => {
    loadClients();
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

  const confirmDelete = async () => {
    if (clientToDelete) {
      try {
        // Envoyer une requête DELETE à l'API pour supprimer le client
        const response = await fetch(`http://127.0.0.1:8000/clients/${clientToDelete.id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Si la suppression a réussi, mettre à jour la liste des clients
          setClients(clients.filter((client) => client.id !== clientToDelete.id));
          setModalOpen(false); // Fermer le modal après la suppression
        } else {
          console.error("Erreur lors de la suppression du client");
        }
      } catch (error) {
        console.error("Erreur de connexion avec l'API", error);
      }
    }
  };
  
  const cancelDelete = () => {
    setClientToDelete(null);
  };


  const handleDelete = (clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setModalOpen(true); // Ouvrir le modal
  };

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Clients table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Téléphone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Projet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.utilisateur.nom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.utilisateur.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.telephone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {client.projets.length > 0 ? client.projets.map((projet) => projet.nom).join(", ") : "Aucun projet"}
</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/DetailClient/${client.id}`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              to={`/editClient/${client.id}`}
                              className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
  onClick={() => handleDelete(client.id, client.utilisateur.nom)}
  className="text-red-600 hover:text-red-800">
  <Trash2 className="h-4 w-4" />
</button>

                          </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </main>

      <Footer />
      {/* Modal de confirmation */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
          clientName={clientToDelete ? clientToDelete.name : ""}
        />
      )}
    </div>
  );
};

export default ClientsPage;



