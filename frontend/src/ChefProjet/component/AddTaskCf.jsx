import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import HeaderChefProjet from "../component/HeaderChefProjet";
import FooterChefProjet from "../component/FooterChefProjet";

const AddTskCf = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    statut: "not-started",
    priorite: "moyenne",
    dateDebut: formatDateForInput(new Date()),
    dateFin: formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // Default to 1 week from now
    projetId: "",
    userId: ""
  });

  // Sample data for demonstration
  const projectsData = [
    { id: 1, nom: "Refonte Site Web" },
    { id: 2, nom: "Application Mobile" },
    { id: 3, nom: "Système CRM" }
  ];

  const usersData = [
    { id: 1, nom: "Sophie Martin" },
    { id: 2, nom: "Thomas Dubois" },
    { id: 3, nom: "Julie Leroy" }
  ];

  useEffect(() => {
    // Load projects and users
    loadProjectsAndUsers();
  }, []);

  const loadProjectsAndUsers = async () => {
    // In a real app, you would fetch this data from an API
    setProjects(projectsData);
    setUsers(usersData);
    
    // Set default values if available
    if (projectsData.length > 0) {
      setFormData(prev => ({ ...prev, projetId: projectsData[0].id }));
    }
    if (usersData.length > 0) {
      setFormData(prev => ({ ...prev, userId: usersData[0].id }));
    }
  };

  function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this data to an API
      console.log("Form data to submit:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect back to tasks list
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Une erreur s'est produite lors de la création de la tâche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Retour">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Ajouter une nouvelle tâche</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom de la tâche */}
                <div className="col-span-2">
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la tâche *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Entrez le nom de la tâche"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez la tâche en détail"
                  ></textarea>
                </div>

                {/* Projet */}
                <div>
                  <label htmlFor="projetId" className="block text-sm font-medium text-gray-700 mb-1">
                    Projet *
                  </label>
                  <select
                    id="projetId"
                    name="projetId"
                    required
                    value={formData.projetId}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez un projet</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.nom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assigné à */}
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                    Assigné à *
                  </label>
                  <select
                    id="userId"
                    name="userId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez un utilisateur</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.nom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Statut */}
                <div>
                  <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    id="statut"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="not-started">Non commencé</option>
                    <option value="in-progress">En cours</option>
                    <option value="blocked">Bloqué</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                {/* Priorité */}
                <div>
                  <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité
                  </label>
                  <select
                    id="priorite"
                    name="priorite"
                    value={formData.priorite}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                    <option value="critique">Critique</option>
                  </select>
                </div>

                {/* Date de début */}
                <div>
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateDebut"
                      name="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Date de fin */}
                <div>
                  <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'échéance *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateFin"
                      name="dateFin"
                      required
                      value={formData.dateFin}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterChefProjet />
    </div>
  );
};

export default AddTskCf;
