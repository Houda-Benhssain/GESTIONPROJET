import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Building, ArrowLeft } from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet"
import FooterChefProjet from "./FooterChefProjet"
import { useEffect } from "react"

const AddClientChef = ({ addClient }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ telephone: "", addresse: "", user_id: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/utilisateurs")
      .then((response) => response.json())
      .then((data) => {
        const clientUsers = data.filter(user => user.role === "client");
        setUsers(clientUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newClient = {
      telephone: formData.telephone,
      adresse: formData.addresse,
      user_id: formData.user_id,
    };

    fetch("http://127.0.0.1:8000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Erreur inconnue");

        setIsSubmitting(false);
        navigate("/clients/ChefProjet", { state: { message: "Client ajouté avec succès !" } });
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Erreur :", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderChefProjet />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate("/clients")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux clients
            </button>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Ajouter un nouveau client</h1>
                <p className="text-sm text-gray-500 mt-1">Fournissez les informations d'un client.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Informations sur le client</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="addresse" className="block text-sm font-medium text-gray-700">
                    Addresse
                  </label>
                  <input
                    type="text"
                    id="addresse"
                    name="addresse"
                    value={formData.addresse}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                    Client
                  </label>
                  <select
                    id="user_id"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/clients")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}>
                  {isSubmitting ? "Adding..." : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterChefProjet />
    </div>
  );
}

export default AddClientChef

