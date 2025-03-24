import React, { useState, useEffect } from "react";
import { Search, CheckCircle, Clock, MessageSquare, User, Send, X, ChevronRight } from "lucide-react";
import HeaderChefProjet from "../component/HeaderChefProjet";
import FooterChefProjet from "../component/FooterChefProjet";

const MembreEquipe = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    loadTeamMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm, teamMembers]);

  const loadTeamMembers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/utilisateurs'); // Remplacez par l'URL de votre API
      const data = await response.json();

      // Filtrer les membres ayant le rôle 'membre equipe'
      const filtered = data.filter(member => member.role.toLowerCase() === "membre equipe");
      setTeamMembers(filtered);
      setFilteredMembers(filtered);
    } catch (error) {
      console.error("Erreur lors du chargement des membres:", error);
    }
  };

  const filterMembers = () => {
    let result = [...teamMembers];

    if (searchTerm) {
      result = result.filter(
        (member) =>
          member.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(result);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMessageClick = (member) => {
    setSelectedMember(member);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log(`Message to ${selectedMember.nom}: ${messageText}`);
    setMessageText("");
    setShowMessageModal(false);

    alert(`Message envoyé à ${selectedMember.nom}`);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const getStatusText = (status) => {
    return status === "active" ? "Actif" : "Inactif";
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-blue-600";
    if (rate >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressBarColor = (rate) => {
    if (rate >= 90) return "bg-green-600";
    if (rate >= 70) return "bg-blue-600";
    if (rate >= 50) return "bg-amber-600";
    return "bg-red-600";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateTeamStats = () => {
    if (!teamMembers.length) return { activeMembers: 0, avgCompletion: 0, totalCompleted: 0, totalPending: 0 };

    const activeMembers = teamMembers.filter((m) => m.status === "active").length;
    const totalCompleted = teamMembers.reduce((sum, m) => sum + m.completedTasks, 0);
    const totalPending = teamMembers.reduce((sum, m) => sum + m.pendingTasks, 0);
    const avgCompletion = Math.round(teamMembers.reduce((sum, m) => sum + m.taskCompletionRate, 0) / teamMembers.length);

    return { activeMembers, avgCompletion, totalCompleted, totalPending };
  };

  const teamStats = calculateTeamStats();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  return (
    <div className="min-h-screen bg-white">
      <HeaderChefProjet />

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Équipe</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Membres d'Équipe</h1>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 py-8 -mt-6">
        <div className="mb-6">
          <p className="text-gray-600">Gérer et suivre les membres de votre équipe</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.activeMembers}</div>
                <div className="text-sm text-gray-500">Membres Actifs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.totalCompleted}</div>
                <div className="text-sm text-gray-500">Tâches Complétées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.totalPending}</div>
                <div className="text-sm text-gray-500">Tâches En Attente</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.avgCompletion}%</div>
                <div className="text-sm text-gray-500">Taux Moyen</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-100 mb-6">
          <div className="p-4 border-b border-blue-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Rechercher par nom, rôle, ou email"
                className="pl-10 pr-4 py-2 w-full rounded-lg text-gray-600 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rôle</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{member.nom}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{member.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <button
                      onClick={() => handleMessageClick(member)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Envoyer un message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold">Envoyer un message à {selectedMember.nom}</h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
              placeholder="Écrivez votre message ici..."
              rows="4"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterChefProjet />
    </div>
  );
};

export default MembreEquipe;
