import React from "react"
import { useState, useEffect } from "react"
import { Search, CheckCircle, Clock, MessageSquare, User, Send, X, ChevronRight } from "lucide-react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"

const MembreEquipe = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [messageText, setMessageText] = useState("")

  // Sample data for demonstration
  const teamMembersData = [
    {
      id: 1,
      nom: "Sophie Martin",
      email: "sophie.martin@example.com",
      phone: "+33 6 12 34 56 78",
      role: "Designer UI/UX",
      avatar: null,
      dateEmbauche: "2022-05-15",
      status: "active",
      completedTasks: 12,
      pendingTasks: 3,
      projects: ["Refonte Site Web", "Système CRM"],
      taskCompletionRate: 80,
      lastActive: "2025-03-19T14:30:00",
    },
    {
      id: 2,
      nom: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      phone: "+33 6 23 45 67 89",
      role: "Développeur Full-Stack",
      avatar: null,
      dateEmbauche: "2021-11-03",
      status: "active",
      completedTasks: 24,
      pendingTasks: 2,
      projects: ["Application Mobile", "Refonte Site Web"],
      taskCompletionRate: 92,
      lastActive: "2025-03-20T09:15:00",
    },
    {
      id: 3,
      nom: "Julie Leroy",
      email: "julie.leroy@example.com",
      phone: "+33 6 34 56 78 90",
      role: "Testeur QA",
      avatar: null,
      dateEmbauche: "2023-02-20",
      status: "inactive",
      completedTasks: 8,
      pendingTasks: 5,
      projects: ["Refonte Site Web"],
      taskCompletionRate: 62,
      lastActive: "2025-03-18T16:45:00",
    },
    {
      id: 4,
      nom: "Marc Dupont",
      email: "marc.dupont@example.com",
      phone: "+33 6 45 67 89 01",
      role: "Développeur Backend",
      avatar: null,
      dateEmbauche: "2022-08-10",
      status: "active",
      completedTasks: 18,
      pendingTasks: 0,
      projects: ["Application Mobile", "Système CRM"],
      taskCompletionRate: 100,
      lastActive: "2025-03-20T11:30:00",
    },
    {
      id: 5,
      nom: "Camille Bernard",
      email: "camille.bernard@example.com",
      phone: "+33 6 56 78 90 12",
      role: "Designer Graphique",
      avatar: null,
      dateEmbauche: "2023-04-05",
      status: "active",
      completedTasks: 7,
      pendingTasks: 4,
      projects: ["Refonte Site Web"],
      taskCompletionRate: 64,
      lastActive: "2025-03-19T10:20:00",
    },
  ]

  useEffect(() => {
    loadTeamMembers();
  }, []);

  useEffect(() => {
    filterMembers()
  }, [searchTerm, teamMembers])

  const loadTeamMembers = async () => {
    // Load team members immediately without delay
    setTeamMembers(teamMembersData)
    setFilteredMembers(teamMembersData)
  }

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

    setFilteredMembers(result)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleMessageClick = (member) => {
    setSelectedMember(member);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log(`Message to ${selectedMember.nom}: ${messageText}`);
    setMessageText("");
    setShowMessageModal(false);

    alert(`Message envoyé à ${selectedMember.nom}`)
  }

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-gray-100 text-gray-800 border border-gray-200"
  }

  const getStatusText = (status) => {
    return status === "active" ? "Actif" : "Inactif"
  }

  const getCompletionColor = (rate) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 70) return "text-blue-600"
    if (rate >= 50) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressBarColor = (rate) => {
    if (rate >= 90) return "bg-green-600"
    if (rate >= 70) return "bg-blue-600"
    if (rate >= 50) return "bg-amber-600"
    return "bg-red-600"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate team statistics
  const calculateTeamStats = () => {
    if (!teamMembers.length) return { activeMembers: 0, avgCompletion: 0, totalCompleted: 0, totalPending: 0 };

    const activeMembers = teamMembers.filter((m) => m.status === "active").length;
    const totalCompleted = teamMembers.reduce((sum, m) => sum + m.completedTasks, 0);
    const totalPending = teamMembers.reduce((sum, m) => sum + m.pendingTasks, 0);
    const avgCompletion = Math.round(teamMembers.reduce((sum, m) => sum + m.taskCompletionRate, 0) / teamMembers.length);

    return { activeMembers, avgCompletion, totalCompleted, totalPending };
  };

  const teamStats = calculateTeamStats();

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderChefProjet />

      {/* Blue gradient header */}
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

        {/* Team Statistics */}
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
                <Search className="h-4 w-4 text-blue-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Rechercher des membres..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun membre trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez d'ajuster vos critères de recherche</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Membre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Tâches
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Projets
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div
                              className={`w-10 h-10 rounded-lg ${member.status === "active" ? "bg-blue-600" : "bg-gray-400"} text-white flex items-center justify-center`}
                            >
                              {getInitials(member.nom)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.nom}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}
                        >
                          {getStatusText(member.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`mr-2 ${getCompletionColor(member.taskCompletionRate)}`}>
                            {member.taskCompletionRate}%
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getProgressBarColor(member.taskCompletionRate)}`}
                              style={{ width: `${member.taskCompletionRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {member.completedTasks} terminées, {member.pendingTasks} en attente
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {member.projects.map((project, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full mr-1 mb-1"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleMessageClick(member)}
                          className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          title="Envoyer un message"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredMembers.length > 0 && (
            <div className="p-4 border-t border-blue-100 flex justify-between items-center text-sm text-gray-600">
              <div>
                Affichage de {filteredMembers.length} membre{filteredMembers.length > 1 ? "s" : ""}
              </div>
              <div className="text-gray-500">
                <span>Mis à jour il y a 2 minutes</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterChefProjet />

      {/* Message Modal */}
      {showMessageModal && selectedMember && (
        <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-blue-100">
              <h3 className="text-lg font-medium text-gray-900">Message à {selectedMember.nom}</h3>
              <button onClick={() => setShowMessageModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre message
                </label>
                <textarea
                  id="messageText"
                  name="messageText"
                  rows="4"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembreEquipe;
