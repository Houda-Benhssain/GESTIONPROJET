import React from "react"
import { useState, useEffect } from "react"
import {Plus,Search,Trash2,X,User,Mail,MapPin,Briefcase,ChevronRight,Lock,Edit,Users,ChevronLeft} from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"
const UserPage = () => {
  const [users, setUsers] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [newUser, setNewUser] = useState({nom: "",email: "",password: "",role: "",});
  const [filters, setFilters] = useState({ role: "all" });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs/");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(
    (user) =>
      (user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.role === "all" || user.role === filters.role)
  );

  // Pagination
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      // Vérification du statut de la réponse
      if (!response.ok) {
        throw new Error(`Erreur lors de l'ajout de l'utilisateur: ${response.statusText}`);
      }

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
      alert("Une erreur est survenue lors de l'ajout de l'utilisateur.");
    }
};
const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};


  
  const handleDeleteUser = async () => { // ← Ajout de async ici
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

  

  // Get color class based on role
  const getRoleColorClass = (role) => {
    switch (role) {
      case "administrateur":
        return "bg-purple-100 text-purple-800 border border-purple-200"
      case "chef de projet":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "client":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border border-green-200"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-6 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>User Management</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h1>
        </div>
      </div>

      <main className="flex-grow px-4 py-8 -mt-6">
        <div className="max-w-screen-xl mx-auto">
          {/* Stats card */}
          <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-gray-500">Utilisateurs totaux</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Liste des Utilisateurs</h2>
              <p className="text-sm text-gray-500">Gérez les comptes utilisateurs et les permissions</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Recherche"
                  className="pl-70 pr-4 py-2 w-full rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
              <div className="relative flex-grow">
</div>

{/* Filtre par Rôle */}
<div className="relative">
  <select
    className="pl-3 pr-4 py-2 w-full rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    onChange={(e) => handleFilterChange({ role: e.target.value })}
    value={filters.role}
  >
    <option value="all">Tous les rôles</option>
    <option value="administrateur">Administrateur</option>
    <option value="chef de projet">Chef de projet</option>
    <option value="client">Client</option>
    <option value="membre equipe">Membre d'équipe</option>
  </select>
</div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un Utilisateur
              </button>
            </div>
            
          </div>

          {/* Users Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-blue-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Nom
                    </th>
                    
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider hidden lg:table-cell">
                      Email
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider" >
                      Rôle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Mail className="h-4 w-4 text-blue-400 mr-2" />
                            {user.email}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColorClass(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                          <button
  className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
  onClick={() => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  }}>
  <Trash2 className="h-4 w-4" />
</button>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
  <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">
    Précédent
  </button>
  <span className="text-sm">{`Page ${currentPage} sur ${totalPages}`}</span>
  <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">
    Suivant
  </button>
</div>

      </main>
      
      <Footer />

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-blue-100">
              <h3 className="text-lg font-medium text-gray-900">Ajouter un Utilisateur</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom Complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={newUser.nom}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border border-blue-200 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border border-blue-200 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border border-blue-200 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-blue-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border border-blue-200 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required>
                    <option value="membre equipe">Membre d'equipe</option>
                    <option value="chef de projet">Chef de projet</option>
                    <option value="client">Client</option>
                    <option value="administrateur">Administrateur</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Supprimer l'utilisateur</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-blue-600">{userToDelete.nom}</span>
              ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};
export default UserPage;

