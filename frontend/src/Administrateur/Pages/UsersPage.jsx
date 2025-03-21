import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, ChevronDown, User, Trash2 } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ role: "all" }); // Filtre des rôles
  const [newUser, setNewUser] = useState({
    nom: "",
    email: "",
    password: "",
    role: "",
  });

  // Récupérer les utilisateurs depuis l'API au chargement du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs/"); // Assurez-vous que l'URL de l'API est correcte
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Appliquer les filtres de recherche et de rôle
  const filteredUsers = users.filter(
    (user) =>
      (user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.role === "all" || user.role === filters.role)
  );

  // Gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ajouter un utilisateur (appel à l'API pour ajouter un utilisateur)
  const handleAddUser = async (e) => {
    e.preventDefault();
  
    if (!newUser.nom || !newUser.email || !newUser.password || !newUser.role) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/utilisateurs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();

      setUsers((prev) => [...prev, addedUser]);
      setIsAddModalOpen(false);
      setNewUser({
        nom: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        console.log(`Suppression de l'utilisateur : ${userToDelete.nom}`);

        const response = await fetch(`http://127.0.0.1:8000/utilisateurs/${userToDelete.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Utilisateur supprimé avec succès !");
          setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        } else {
          console.error("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      console.log("Aucun utilisateur sélectionné pour la suppression.");
    }
  };

  // Modifier le filtre
  const handleFilterChange = (newFilter) => {
    setFilters({ ...filters, ...newFilter });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
              <p className="text-gray-500 mt-1">Gérer et suivre tous vos utilisateurs</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter utilisateur
            </button>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Rechercher des utilisateurs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>

              {showFilters && (
                <div className="mt-4">
                  <div className="flex gap-4">
                    <select
                      value={filters.role}
                      onChange={(e) => handleFilterChange({ role: e.target.value })}
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="all">Tous les rôles</option>
                      <option value="administrateur">Administrateur</option>
                      <option value="chef de projet">Chef de projet</option>
                      <option value="membre equipe">Membre d'equipe</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">

                        <td className="px-6 py-4 whitespace-nowrap">
                          
                          <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "administrateur"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "client"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "chef de projet"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setUserToDelete(user);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h2>
            <p className="text-gray-600 mt-2">Voulez-vous vraiment supprimer cet utilisateur ?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout d'utilisateur */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold text-gray-900">Ajouter un nouvel utilisateur</h2>
            <form onSubmit={handleAddUser} className="mt-4 space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={newUser.nom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Rôle
                </label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="administrateur">Administrateur</option>
                  <option value="chef de projet">Chef de projet</option>
                  <option value="membre equipe">Membre d'équipe</option>
                  <option value="client">Client</option>
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

