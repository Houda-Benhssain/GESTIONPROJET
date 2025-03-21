import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AddProject = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState({
    nom: "",
    description: "",
    client_id: "",
    statut: "en attente",
    dateDebut: "",
    dateFin: "",
    user_id: "", // Ajouter manager_id pour le chef de projet
  });
  const [clients, setClients] = useState([]);
  const [managers, setManagers] = useState([]); // État pour les chefs de projet
  const [errors, setErrors] = useState({});

  // Récupérer les clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    };

    fetchClients();
  }, []);
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs");
        const data = await response.json();

        const filteredManagers = data.filter((user) => user.role === "chef de projet");
        setManagers(filteredManagers); 
      } catch (error) {
        console.error("Erreur lors de la récupération des chefs de projet :", error);
      }
    };

    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    const projectData = {
      nom: project.nom,
      description: project.description,
      dateDebut: project.dateDebut,
      dateFin: project.dateFin,
      statut: project.statut,
      client_id: project.client_id,
      user_id: project.user_id, // Inclure le manager_id
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/projets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (response.ok) {
        setSaving(false);
        navigate("/projects");
      } else {
        setSaving(false);
        setErrors(result.errors || {});
      }
    } catch (error) {
      setSaving(false);
      console.error("Erreur lors de la création du projet :", error);
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
              {/* Nom du projet */}
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

              {/* Description */}
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

              {/* Client Dropdown */}
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

              {/* Chef de projet Dropdown */}
<div>
  <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
    Chef de projet*
  </label>
  <select
    id="user_id" // Utilisez user_id pour correspondre à votre état
    name="user_id" // Utilisez user_id pour correspondre à votre état
    value={project.user_id} // Cela doit être lié à user_id dans votre état
    onChange={handleChange}
    className={`w-full px-3 py-2 border ${errors.user_id ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
  >
    <option value="">Sélectionner un chef de projet</option>
    {managers.map((manager) => (
      <option key={manager.id} value={manager.id}>
        {manager.nom} {/* Assurez-vous que manager.nom existe */}
      </option>
    ))}
  </select>
  {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>} {/* Affichez l'erreur */}
</div>


              {/* Date de début */}
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

              {/* Date de fin */}
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

            <div className="flex justify-end mt-6 space-x-4">
              <Link to="/projects" className="text-sm text-gray-600 hover:text-gray-800">
                <X className="w-4 h-4 inline-block mr-1" /> Annuler
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-md"
              >
                {saving ? (
                  <span className="spinner-border animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </>
                )}
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



