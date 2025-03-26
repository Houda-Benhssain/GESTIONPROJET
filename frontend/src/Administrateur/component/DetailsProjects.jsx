import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin ,Calendar,Tag,CheckCircle,Clock} from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const DetailProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const [activeTab, setActiveTab] = useState("overview");
console.log(id)
  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError(null);  // Reset error state before new fetch

      try {
        const response = await fetch(`http://127.0.0.1:8000/projets/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des informations...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow p-4 md:p-6 text-center">
          <p className="text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Vérification de l'existence des tâches
  const taskStats = project?.taches?.reduce(
    (acc, task) => {
      if (task.statut === "en attente") acc.pending++;
      if (task.statut === "en cours") acc.inProgress++;
      if (task.statut === "terminee") acc.completed++;
      return acc;
    },
    { pending: 0, inProgress: 0, completed: 0 }
  );
  const getStatusColor = (statut) => {
    switch (statut) {
      case "en attente":
        return "bg-yellow-100 text-yellow-800"
      case "en cours":
        return "bg-blue-100 text-blue-800"
      case "terminee":
        return "bg-green-100 text-green-800"
      case "annulee":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut) => {
    switch (statut) {
      case "en attente":
        return <Clock className="h-3 w-3 mr-1" />
      case "en cours":
        return <Clock className="h-3 w-3 mr-1" />
      case "terminee":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "annulee":
        return <AlertCircle className="h-3 w-3 mr-1" />
      default:
        return <Clock className="h-3 w-3 mr-1" />
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
  <Header />
  <main className="flex-grow p-4 md:p-6">
    <div className="max-w-screen-xl mx-auto">
      <div className="mb-6">
        <Link to="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la liste des projets
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className="border-transparent text-gray-500-600 hover:border-blue-500">
            Vue d'ensemble
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && project && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Project Information (Détails du projet en haut) */}
          <div className="bg-white rounded-lg shadow-sm p-6 col-span-1 lg:col-span-1 hover:bg-blue-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Détails du projet</h2>
            <div className="space-y-4">
              <div className="flex items-start " >
                <Tag className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Nom du projet</p>
                  <p className="text-gray-800">{project.nom}</p>
                </div>
              </div>
              <div className="flex items-start">
                
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-800">{project.description}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date de début</p>
                  <p className="text-gray-800">{formatDate(project.dateDebut)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date de fin</p>
                  <p className="text-gray-800">{formatDate(project.dateFin)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Chef de projet</p>
                  <p className="text-gray-800">{project.user.nom}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Client Information and Task Status (Sous les détails du projet) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 hover:bg-blue-50">
            {/* Client Information (Section clients sous le projet) */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:bg-blue-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Client</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Nom complet</p>
                    <p className="text-gray-800">{project.client.utilisateur?.nom}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{project.client.utilisateur?.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-gray-800">{project.client.telephone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="text-gray-800">{project.client.adresse}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Status (Statut des tâches sous le projet et client) */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:bg-blue-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Statut des tâches</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700 mb-1">Tâches à faire</p>
                  <p className="text-xl font-bold text-blue-900">{taskStats?.pending}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-1">Tâches terminées</p>
                  <p className="text-xl font-bold text-green-900">{taskStats?.completed}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-700 mb-1">Tâches en cours</p>
                  <p className="text-xl font-bold text-purple-900">{taskStats?.inProgress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tâches récentes (en bas de la page, occupe toute la largeur) */}
          <div className="bg-white rounded-lg shadow-sm p-6 col-span-1 lg:col-span-1">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Tâches récentes</h2>
  <div className="space-y-4">
    {project.taches?.map((task) => (
      <div key={task.id} className="flex justify-between py-2 hover:bg-blue-50">
        <p className="text-sm text-gray-600">{task.nom}</p>

        {/* Conteneur pour l'icône et le statut */}
        <div className="flex items-center space-x-2">
          {/* Affichage de l'icône du statut */}
          <span className={`flex items-center text-sm ${getStatusColor(task.statut)} py-1 px-3 rounded-full`}>
            {getStatusIcon(task.statut)} {/* Icône à côté du texte */}
            <span>{task.statut}</span> {/* Le texte du statut */}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


        </div>
      )}
    </div>
  </main>
  <Footer />
</div>

  );
};

export default DetailProject;
