import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [project, setProject] = useState({
    nom: "",
    description: "",
    client_id: "",
    statut: "",
    dateDebut: "",
    dateFin: "",
    teamSize: 0,
    budget: "",
    priority: "",
  });
  const [clients, setClients] = useState([]);  // Etat pour la liste des clients

  // Charger les informations du projet depuis l'API
  useEffect(() => {
    loadProject();
    loadClients();  // Charger les clients
  }, [id]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/projets/${id}`);
      if (response.ok) {
        const projectData = await response.json();
        setProject({
          nom: projectData.nom,
          description: projectData.description,
          client_id: projectData.client_id,
          statut: projectData.statut,
          dateDebut: projectData.dateDebut,
          dateFin: projectData.dateFin,
          teamSize: projectData.teamSize,
          budget: projectData.budget,
          priority: projectData.priority,
        });
      } else {
        setFormError("Project not found");
      }
    } catch (error) {
      setFormError("Error loading project: " + error.message);
    }
    setLoading(false);
  };

  const loadClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/clients");  // URL de l'API des clients
      if (response.ok) {
        const clientsData = await response.json();
        setClients(clientsData);
      }
    } catch (error) {
      setFormError("Error loading clients: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    // Validation du formulaire
    if (!project.nom || !project.client_id || !project.statut) {
      setFormError("Please fill in all required fields");
      setSaving(false);
      return;
    }

    // Mise à jour du projet via l'API
    try {
      const response = await fetch(`http://127.0.0.1:8000/projets/${id}`, {
        method: "PUT", // PUT pour mettre à jour
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        setSaving(false);
        navigate("/projects");
      } else {
        setFormError("Failed to update project");
        setSaving(false);
      }
    } catch (error) {
      setFormError("Error updating project: " + error.message);
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <ArrowLeft className="h-5 w-5" onClick={() => navigate("/projects")} />
            <h1 className="text-2xl font-bold text-gray-900">Modifier le projet</h1>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Chargement des détails du projet...</p>
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
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={project.nom}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={project.description}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="client_id"
                    name="client_id"
                    value={project.client_id}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.utilisateur.nom} {/* Affiche le nom du client */}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="statut"
                    name="statut"
                    value={project.statut}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Sélectionner le statut</option>
                    <option value="en attente">En Attente</option>
                    <option value="en cours">En Cours</option>
                    <option value="termine">Terminé</option>
                    <option value="annule">Annulé</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                  </label>
                  <input
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={project.dateDebut}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                  </label>
                  <input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    value={project.dateFin}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
                  disabled={saving}
                >
                  {saving ? "Saving..." : <Save className="inline mr-2 h-5 w-5" />} Enregistrer
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

export default EditProject;

