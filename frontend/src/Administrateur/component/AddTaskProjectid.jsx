import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AddTaskProjectid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = params.get("project_id");
  const projectName = params.get("project_name");
  const [successMessage, setSuccessMessage] = useState("");

  const [saving, setSaving] = useState(false);
  const [tache, setTache] = useState({
    nom: "",
    statut: "",
    priorite: "",
    dateDebut: "",
    dateFin: "",
    project_id: projectId || "", // Pré-rempli si l'ID du projet est présent dans l'URL
    user_id: "",
  });
  const [projet, setProjet] = useState(null); // Stocker un seul projet
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [errors, setErrors] = useState({});

  // Récupérer les informations du projet
  useEffect(() => {
    if (projectId) {
      const fetchProjet = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/projets/${projectId}`);
          const data = await response.json();
          setProjet(data); // Stocker les détails du projet
        } catch (error) {
          console.error("Erreur lors de la récupération du projet :", error);
        }
      };
      fetchProjet();
    }
  }, [projectId]);

  // Récupérer la liste des utilisateurs ayant le rôle "Membre équipe"
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/utilisateurs");
        const data = await response.json();

        // Filtrer les utilisateurs avec le rôle "Membre équipe"
        const membresEquipe = data.filter((utilisateur) => utilisateur.role === "membre equipe");
        setUtilisateurs(membresEquipe);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
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
        const response = await fetch("http://127.0.0.1:8000/taches/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tacheData),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          setSaving(false);
          setSuccessMessage("Tâche ajoutée avec succès !");
          setTache({  // Réinitialiser le formulaire après enregistrement
            nom: "",
            statut: "",
            priorite: "",
            dateDebut: "",
            dateFin: "",
            project_id: "",
            user_id: "",
          });
        } else {
          setSaving(false);
          setErrors(result.errors || {});
        }
      } catch (error) {
        setSaving(false);
        console.error("Erreur lors de la création de la tâche :", error);
      }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        
      <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
          {successMessage && (
  <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
    {successMessage}
  </div>
)}
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Ajouter une tâche</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="mb-4">
                  <label htmlFor="nom" className="block text-sm font-medium text-blue-800 mb-1">
                    Nom de la tâche
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={tache.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Entrez le nom de la tâche"
                  />
                  {errors.nom && <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="statut" className=" text-sm font-medium text-blue-800 mb-1 flex items-center">
                      <div
                        className="w-3 h-3 rounded-full bg-gray-300 mr-2"
                      ></div>
                      Statut
                    </label>
                    <div className="relative">
                      <select
                        id="statut"
                        name="statut"
                        value={tache.statut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" >
                        <option value="">Statut</option>
                        <option value="en attente">En attente</option>
                        <option value="en cours">En cours</option>
                        <option value="terminee">Terminé</option>
                        <option value="annulee">Annulé</option>
                      </select>
                    </div>
                    {errors.statut && <p className="text-red-600 mt-1 text-sm">{errors.statut}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="priorite"
                      className=" text-sm font-medium text-blue-800 mb-1 flex items-center">
                      <div
                        className="w-3 h-3 rounded-full  mr-2"
                      ></div>
                      Priorité
                    </label>
                    <div className="relative">
                      <select
                        id="priorite"
                        name="priorite"
                        value={tache.priorite}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                        <option value="critique">Critique</option>
                      </select>
                    </div>
                    {errors.priorite && <p className="text-red-600 mt-1 text-sm">{errors.priorite}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-4">Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateDebut" className="block text-sm font-medium text-blue-800 mb-1">
                      Date de début
                    </label>
                    <div className="relative">
                      <input
                        id="dateDebut"
                        name="dateDebut"
                        type="date"
                        value={tache.dateDebut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    {errors.dateDebut && <p className="text-red-600 mt-1 text-sm">{errors.dateDebut}</p>}
                  </div>

                  <div>
                    <label htmlFor="dateFin" className="block text-sm font-medium text-blue-800 mb-1">
                      Date de fin
                    </label>
                    <div className="relative">
                      <input
                        id="dateFin"
                        name="dateFin"
                        type="date"
                        value={tache.dateFin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                    </div>
                    {errors.dateFin && <p className="text-red-600 mt-1 text-sm">{errors.dateFin}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-4">Assignation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                  <div>
                <label htmlFor="project_id" className="block text-sm font-medium text-blue-800">
                  Projet
                </label>
                <input
                  name="project_id"
                  value={projet ? projet.nom : ""}
                  disabled
                  className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100"
                />
              </div>
              </div>

                  <div>
                    <label htmlFor="user_id" className="block text-sm font-medium text-blue-800 mb-1">
                      Attribuer à
                    </label>
                    <div className="relative">
                      <select
                        id="user_id"
                        name="user_id"
                        value={tache.user_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" >
                        <option value="">Sélectionner un utilisateur</option>
                        {utilisateurs.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.user_id && <p className="text-red-600 mt-1 text-sm">{errors.user_id}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center"
                  disabled={saving}
                >
                  {saving ? "Enregistrement en cours..." : "Sauvegarder les modifications"}
                </button>
                <Link
                  to="/projects"
                  className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors flex items-center">
                  Annuler
                </Link>
              </div>
            </form>
            
          </div>
        </div>
        
          
      </main>
      <Footer />
    </div>
  );
};

export default AddTaskProjectid;
