import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [client, setClient] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: ""
  });

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/clients/${id}`);
      if (response.ok) {
        const clientData = await response.json();
        setClient(clientData);
      } else {
        setFormError("Client non trouvé");
      }
    } catch (error) {
      setFormError("Erreur lors du chargement du client : " + error.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    if (!client.nom || !client.email) {
      setFormError("Veuillez remplir tous les champs obligatoires");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        navigate("/clients");
      } else {
        setFormError("Échec de la mise à jour du client");
      }
    } catch (error) {
      setFormError("Erreur lors de la mise à jour : " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => navigate("/clients")} />
            <h1 className="text-2xl font-bold text-gray-900 ml-2">Modifier le client</h1>
          </div>
          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Chargement des informations...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
              {formError && (
                <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{formError}</p>
                </div>
              )}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={client.nom}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={client.email}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    name="telephone"
                    value={client.telephone}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <textarea
                    name="adresse"
                    rows="2"
                    value={client.adresse}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center"
                  disabled={saving}
                >
                  {saving ? "Enregistrement..." : <><Save className="inline mr-2 h-5 w-5" /> Enregistrer</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditClient;


