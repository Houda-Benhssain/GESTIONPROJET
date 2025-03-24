import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Save ,X} from "lucide-react"
import HeaderChefProjet from "./HeaderChefProjet"
import FooterChefProjet from "./FooterChefProjet"
import { Link } from "react-router-dom"

const EditTaskCf = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [task, setTask] = useState({
    nom: "",
    statut: "",
    dateDebut: "",
    dateFin: "",
    priorite: "",
    project_id: "",
    user_id: "",
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTaskAndOptions();
  }, [id]);

  const fetchTaskAndOptions = async () => {
    setLoading(true);

    try {
      const taskResponse = await fetch(`http://127.0.0.1:8000/taches/${id}`);
      const taskData = await taskResponse.json();

      if (!taskResponse.ok) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Set task data directly from the response
      setTask({
        nom: taskData.nom,
        statut: taskData.statut,
        dateDebut: taskData.dateDebut,
        dateFin: taskData.dateFin,
        priorite: taskData.priorite,
        project_id: taskData.project_id, // Project ID from response
        user_id: taskData.user_id, // User ID from response
      });

      // Fetch projects and users (filter users by role "membre")
      const projectsResponse = await fetch("http://127.0.0.1:8000/projets");
      const usersResponse = await fetch("http://127.0.0.1:8000/utilisateurs");
      const projectsData = await projectsResponse.json();
      const usersData = await usersResponse.json();

      // Filter users with role "membre"
      const filteredUsers = usersData.filter(user => user.role === "membre equipe");

      setProjects(projectsData);
      setUsers(filteredUsers); 

      setLoading(false);
    } catch (error) {
      setNotFound(true);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
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
    if (!task.nom.trim()) newErrors.nom = "Le nom de la tâche est requis.";
    if (!task.statut) newErrors.statut = "Le statut est requis.";
    if (!task.dateDebut) newErrors.dateDebut = "La date de début est requise.";
    if (!task.dateFin) newErrors.dateFin = "La date de fin est requise.";
    if (!task.priorite) newErrors.priorite = "La priorité est requise.";
    if (!task.project_id) newErrors.project_id = "Le projet est requis.";
    if (!task.user_id) newErrors.user_id = "Le responsable est requis.";

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

    try {
      const response = await fetch(`http://127.0.0.1:8000/taches/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nom: task.nom,
          statut: task.statut,
          dateDebut: task.dateDebut,
          dateFin: task.dateFin,
          priorite: task.priorite,
          project_id: task.project_id,
          user_id: task.user_id,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const updatedTask = await response.json();
      setSaving(false);
      navigate("/tasks");
    } catch (error) {
      setSaving(false);
      console.error(error);
    }
  };

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderChefProjet />
        <main className="flex-grow">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tâche non trouvée</h2>
              <p className="text-gray-500 mb-6">La tâche que vous recherchez n'existe pas ou a été supprimée</p>
              <Link
                to="/tasks/ChefProjet"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux tâches
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifier la tâche</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom de la tâche</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={task.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.nom && <p className="text-red-600">{errors.nom}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  id="statut"
                  name="statut"
                  value={task.statut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="en attente">En attente</option>
                  <option value="en cours">En cours</option>
                  <option value="terminee">Terminé</option>
                  <option value="annulee">Annulé.</option>
                </select>
                {errors.statut && <p className="text-red-600">{errors.statut}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  id="dateDebut"
                  name="dateDebut"
                  type="date"
                  value={task.dateDebut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.dateDebut && <p className="text-red-600">{errors.dateDebut}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  id="dateFin"
                  name="dateFin"
                  type="date"
                  value={task.dateFin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.dateFin && <p className="text-red-600">{errors.dateFin}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                <select
                  id="priorite"
                  name="priorite"
                  value={task.priorite}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                  <option value="critique">Critique</option>
                </select>
                {errors.priorite && <p className="text-red-600">{errors.priorite}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="project_id" className="block text-sm font-medium text-gray-700 mb-1">Projet</label>
                <select
                  id="project_id"
                  name="project_id"
                  value={task.project_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionner un projet</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.nom}</option>
                  ))}
                </select>
                {errors.project_id && <p className="text-red-600">{errors.project_id}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">Attribuer à</label>
                <select
                  id="user_id"
                  name="user_id"
                  value={task.user_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionner un utilisateur</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.nom}</option>
                  ))}
                </select>
                {errors.user_id && <p className="text-red-600">{errors.user_id}</p>}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  disabled={saving}
                >
                  {saving ? 'Enregistrement en cours...' : 'Sauvegarder les modifications'}
                </button>
                <Link to="/tasks/ChefProjet" className="text-gray-500 hover:text-gray-700">
                  <X className="h-4 w-4 mr-2" /> Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterChefProjet />
    </div>)
}

export default EditTaskCf

