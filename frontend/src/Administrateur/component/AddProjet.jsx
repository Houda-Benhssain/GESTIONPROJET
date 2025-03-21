import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AddProject = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState({
    nom: "",          // Nom du projet
    description: "",  // Description
    client_id: "",    // ID du client
    statut: "en attente",  // Statut du projet
    dateDebut: "",    // Date de début
    dateFin: "",      // Date de fin
  });
  const [clients, setClients] = useState([]); // Liste des clients
  const [errors, setErrors] = useState({});

  // Récupérer la liste des clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/clients");
        const data = await response.json();
        setClients(data); // Stocker les clients dans le state
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!project.nom.trim()) newErrors.nom = "Nom du projet requis";
    if (!project.description.trim()) newErrors.description = "Description requise";
    if (!project.client_id.trim()) newErrors.client_id = "Nom du client requis";
    if (!project.dateDebut) newErrors.startDate = "Date de début requise";
    if (!project.dateFin) newErrors.endDate = "Date de fin requise";
    if (project.dateDebut && project.dateFin && new Date(project.dateDebut) > new Date(project.dateFin)) {
      newErrors.endDate = "La date de fin doit être après la date de début";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".text-red-600");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSaving(true);

    // Création des données du projet à envoyer à l'API
    const projectData = {
      nom: project.nom,           // Correspond à 'nom' dans la base de données
      description: project.description,
      dateDebut: project.dateDebut, // Correspond à 'dateDebut' dans la base de données
      dateFin: project.dateFin,     // Correspond à 'dateFin' dans la base de données
      statut: project.statut,       // Utilise le statut tel qu'il est dans le modèle
      client_id: project.client_id,    // ID du client
    };

    try {
      // Appel à l'API pour créer un projet
      const response = await fetch("http://127.0.0.1:8000/projets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (response.ok) {
        // Si l'API retourne un succès, navigue vers la page des projets
        setSaving(false);
        navigate("/projects");
      } else {
        // Gestion des erreurs côté serveur
        setSaving(false);
        setErrors(result.errors || {});
      }
    } catch (error) {
      setSaving(false);
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex items-center mb-6 space-x-4">
            <Link to="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux projets
            </Link>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900">Ajouter un nouveau projet</h1>
              <p className="text-gray-500">Créez un nouveau projet et assignez-le à un client</p>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du projet*
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={project.nom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.nom ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
              </div>
  
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={project.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.description ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
  
              <div>
                <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Client*
                </label>
                <select
                  id="client_id"
                  name="client_id"
                  value={project.client_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.client_id ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.utilisateur.nom}
                    </option>
                  ))}
                </select>
                {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
              </div>
  
              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={project.statut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en attente">En attente</option>
                  <option value="en cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="annule">Annulé</option>
                </select>
              </div>
  
              <div>
                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début*
                </label>
                <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  value={project.dateDebut}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.startDate ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>
  
              <div>
                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin*
                </label>
                <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  value={project.dateFin}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.endDate ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>
  
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
                onClick={() => navigate("/projects")}
              >
                <X className="h-5 w-5" />
                <span>Annuler</span>
              </button>
              <button
                type="submit"
                className={`bg-blue-500 text-white px-6 py-2 rounded-md flex items-center space-x-2 ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={saving}
              >
                {saving ? <span>Enregistrement...</span> : <><Save className="h-5 w-5" /><span>Enregistrer</span></>}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
  
};
export default AddProject;


