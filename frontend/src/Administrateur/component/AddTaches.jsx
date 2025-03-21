import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AddTache = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [tache, setTache] = useState({
    nom: "",            // Nom de la tâche
    statut: "", // Statut
    priorite: "", // Priorité
    dateDebut: "",      // Date de début
    dateFin: "",        // Date de fin
    project_id: "",     // ID du projet
    user_id: "",        // ID de l'utilisateur assigné
  });
  const [projets, setProjets] = useState([]);  // Liste des projets
  const [utilisateurs, setUtilisateurs] = useState([]); // Liste des utilisateurs
  const [errors, setErrors] = useState({});

  // Récupérer la liste des projets
  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/projets");
        const data = await response.json();
        setProjets(data); // Stocker les projets dans le state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjets();
  }, []);

  // Récupérer la liste des utilisateurs ayant le rôle "Membre équipe"
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs");
        const data = await response.json();
        
        // Filtrer les utilisateurs pour n'inclure que ceux avec le rôle "Membre équipe"
        const membresEquipe = data.filter((utilisateur) => utilisateur.role === "membre equipe");
        setUtilisateurs(membresEquipe); // Stocker les utilisateurs dans le state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTache((prev) => ({
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

    if (!tache.nom.trim()) newErrors.nom = "Nom de la tâche requis";
    if (!tache.dateDebut) newErrors.dateDebut = "Date de début requise";
    if (!tache.dateFin) newErrors.dateFin = "Date de fin requise";
    if (new Date(tache.dateDebut) > new Date(tache.dateFin)) {
      newErrors.dateFin = "La date de fin doit être après la date de début";
    }
    if (!tache.user_id) newErrors.user_id = "Utilisateur assigné requis";
    if (!tache.project_id) newErrors.project_id = "Projet requis";
    
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

    // Création des données de la tâche à envoyer à l'API
    const tacheData = {
      nom: tache.nom,           
      statut: tache.statut,
      dateDebut: tache.dateDebut,  
      dateFin: tache.dateFin,    
      priorite: tache.priorite,  
      project_id: tache.project_id, 
      user_id: tache.user_id,     
    };

    try {
      // Appel à l'API pour créer une tâche
      const response = await fetch("http://127.0.0.1:8000/taches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tacheData),
      });

      const result = await response.json();

      if (response.ok) {
        // Si l'API retourne un succès, navigue vers la page des tâches
        setSaving(false);
        navigate("/tasks");
      } else {
        // Gestion des erreurs côté serveur
        setSaving(false);
        setErrors(result.errors || {});
      }
    } catch (error) {
      setSaving(false);
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex items-center mb-6 space-x-4">
            <Link to="/tasks" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux tâches
            </Link>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900">Ajouter une nouvelle tâche</h1>
              <p className="text-gray-500">Créez une nouvelle tâche et assignez-la à un projet</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la tâche*
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={tache.nom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.nom ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor="project_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Projet*
                </label>
                <select
                  id="project_id"
                  name="project_id"
                  value={tache.project_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.project_id ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Sélectionner un projet</option>
                  {projets.map((projet) => (
                    <option key={projet.id} value={projet.id}>
                      {projet.nom}
                    </option>
                  ))}
                </select>
                {errors.project_id && <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>}
              </div>

              <div>
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigné à*
                </label>
                <select
                  id="user_id"
                  name="user_id"
                  value={tache.user_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.user_id ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Sélectionner un membre de l'équipe</option>
                  {utilisateurs.map((utilisateur) => (
                    <option key={utilisateur.id} value={utilisateur.id}>
                      {utilisateur.nom} {/* Affichage du nom de l'utilisateur */}
                    </option>
                  ))}
                </select>
                {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
              </div>

              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={tache.statut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en attente">En attente</option>
                  <option value="en cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </div>

              <div>
                <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  id="priorite"
                  name="priorite"
                  value={tache.priorite}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                  <option value="critique">Critique</option>
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
                  value={tache.dateDebut}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.dateDebut ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.dateDebut && <p className="mt-1 text-sm text-red-600">{errors.dateDebut}</p>}
              </div>

              <div>
                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  value={tache.dateFin}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.dateFin ? "border-red-300" : "border-gray-300"} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.dateFin && <p className="mt-1 text-sm text-red-600">{errors.dateFin}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`px-6 py-2 bg-blue-600 text-white rounded-md ${saving && "opacity-50 cursor-not-allowed"}`}
                disabled={saving}
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTache;
