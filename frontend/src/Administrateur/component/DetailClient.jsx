import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const DetailClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchClientDetails = async () => {
      setLoading(true);
      setError(null);  // Reset error state before new fetch

      try {
        const response = await fetch(`http://127.0.0.1:8000/clients/${id}`);  // Remplace l'URL par celle de ton API
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setClient(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des informations client...</p>
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

  // Calcul des statistiques
  const calculateStats = (projets) => {
    if (!projets || !Array.isArray(projets)) {
      return { projetsAFaire: 0, projetsEnCours: 0, projetsTermines: 0 };
    }

    const projetsAFaire = projets.filter((projet) => projet.statut === "en attente").length;
    const projetsEnCours = projets.filter((projet) => projet.statut === "en cours").length;
    const projetsTermines = projets.filter((projet) => projet.statut === "termine").length;

    return { projetsAFaire, projetsEnCours, projetsTermines };
  };

  // Vérification de l'existence des projets
  const { projetsAFaire, projetsEnCours, projetsTermines } = calculateStats(client?.projets || []);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-6">
            <Link to="/clients" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour à la liste des clients
            </Link>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-500">
                Vue d'ensemble
              </button>
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && client && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations de contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Nom complet</p>
                      <p className="text-gray-800">{client.utilisateur?.nom}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{client.utilisateur?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-gray-800">{client.telephone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-gray-800">{client.adresse}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistiques</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-1">Projets À faire</p>
                    <p className="text-xl font-bold text-blue-900">
                      {projetsAFaire}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 mb-1">Projets terminés</p>
                    <p className="text-xl font-bold text-green-900">{projetsTermines}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-700 mb-1">Projets en cours</p>
                    <p className="text-xl font-bold text-purple-900">{projetsEnCours}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>

                <div className="space-y-4">
                  {client.projets?.length > 0 && (
                    <div className="border-l-2 border-blue-500 pl-4 py-1">
                      <p className="text-sm font-medium text-gray-800">Nouveau projet: {client.projets[0].nom}</p>
                      <p className="text-xs text-gray-500">{formatDate(client.projets[0].dateDebut)}</p>
                    </div>
                  )}

                  <div className="border-l-2 border-gray-300 pl-4 py-1">
                    <p className="text-sm font-medium text-gray-800">Client créé</p>
                    <p className="text-xs text-gray-500">{client.created_at}</p>
                  </div>
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

export default DetailClient;



