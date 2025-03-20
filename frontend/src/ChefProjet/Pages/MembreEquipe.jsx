import React from "react"
import { useState, useEffect } from "react"
import {Search,Filter,ChevronDown,Mail,Phone,Calendar,CheckCircle,Clock,MessageSquare,User,Send,X,} from "lucide-react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"

const MembreEquipe = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    project: "all",
  })

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
    loadTeamMembers()
  }, [])

  useEffect(() => {
    filterMembers()
  }, [searchTerm, filters, teamMembers])

  const loadTeamMembers = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setTeamMembers(teamMembersData)
      setFilteredMembers(teamMembersData)
    } catch (error) {
      console.error("Error loading team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterMembers = () => {
    let result = [...teamMembers]

    if (searchTerm) {
      result = result.filter(
        (member) =>
          member.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.role !== "all") {
      result = result.filter((member) => member.role === filters.role)
    }

    if (filters.status !== "all") {
      result = result.filter((member) => member.status === filters.status)
    }

    if (filters.project !== "all") {
      result = result.filter((member) => member.projects.includes(filters.project))
    }

    setFilteredMembers(result)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleMemberClick = (member) => {
    setSelectedMember(member)
  }

  const handleMessageClick = (member) => {
    setSelectedMember(member)
    setShowMessageModal(true)
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    console.log(`Message to ${selectedMember.nom}: ${messageText}`)
    setMessageText("")
    setShowMessageModal(false)

    
    alert(`Message envoyé à ${selectedMember.nom}`)
  }

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getCompletionColor = (rate) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 70) return "text-blue-600"
    if (rate >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const formatLastActive = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString()
  }

  // Calculate team statistics
  const calculateTeamStats = () => {
    if (!teamMembers.length) return { activeMembers: 0, avgCompletion: 0, totalCompleted: 0, totalPending: 0 }

    const activeMembers = teamMembers.filter((m) => m.status === "active").length
    const totalCompleted = teamMembers.reduce((sum, m) => sum + m.completedTasks, 0)
    const totalPending = teamMembers.reduce((sum, m) => sum + m.pendingTasks, 0)
    const avgCompletion = Math.round(teamMembers.reduce((sum, m) => sum + m.taskCompletionRate, 0) / teamMembers.length)

    return { activeMembers, avgCompletion, totalCompleted, totalPending }
  }

  const teamStats = calculateTeamStats()

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Membres d'Équipe</h1>
              <p className="text-gray-500 mt-1">Gérer et suivre les membres de votre équipe</p>
            </div>
          </div>

          {/* Team Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Nembre  d'Équipe</p>
                  <p className="text-2xl font-semibold text-gray-900">{teamStats.activeMembers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tâches Complétées</p>
                  <p className="text-2xl font-semibold text-gray-900">{teamStats.totalCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tâches En Attente</p>
                  <p className="text-2xl font-semibold text-gray-900">{teamStats.totalPending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Taux Moyen</p>
                  <p className="text-2xl font-semibold text-gray-900">{teamStats.avgCompletion}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Rechercher des membres..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>

              {showFilters && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Role Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        value={filters.role}
                        onChange={(e) => handleFilterChange("role", e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="all">Tous les rôles</option>
                        <option value="Designer UI/UX">Designer UI/UX</option>
                        <option value="Développeur Full-Stack">Développeur Full-Stack</option>
                        <option value="Testeur QA">Testeur QA</option>
                        <option value="Développeur Backend">Développeur Backend</option>
                        <option value="Designer Graphique">Designer Graphique</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Project Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                      Projet
                    </label>
                    <div className="relative">
                      <select
                        id="project"
                        name="project"
                        value={filters.project}
                        onChange={(e) => handleFilterChange("project", e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="all">Tous les projets</option>
                        <option value="Refonte Site Web">Refonte Site Web</option>
                        <option value="Application Mobile">Application Mobile</option>
                        <option value="Système CRM">Système CRM</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun membre trouvé</h3>
                <p className="mt-1 text-gray-500">Essayez d'ajuster vos critères de recherche ou de filtrage</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Membre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                     
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tâches
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Projets
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleMemberClick(member)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                              <button className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center focus:outline-none">
                                   <span className="font-medium text-sm">H</span>
                                </button>
                              </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.nom}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.role}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`mr-2 ${getCompletionColor(member.taskCompletionRate)}`}>
                              {member.taskCompletionRate}%
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  member.taskCompletionRate >= 90
                                    ? "bg-green-600"
                                    : member.taskCompletionRate >= 70
                                      ? "bg-blue-600"
                                      : member.taskCompletionRate >= 50
                                        ? "bg-yellow-600"
                                        : "bg-red-600"
                                }`}
                                style={{ width: `${member.taskCompletionRate}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {member.completedTasks} terminées, {member.pendingTasks} en attente
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{member.projects.join(", ")}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMessageClick(member)
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterChefProjet />

      {/* Member Profile Modal */}
      {selectedMember && !showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Profil du Membre</h3>
              <button onClick={() => setSelectedMember(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMember.nom}</h2>
                  <p className="text-gray-600">{selectedMember.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Informations de Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{selectedMember.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">Embauché le {formatDate(selectedMember.dateEmbauche)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Projets Assignés</h4>
                  <div className="space-y-2">
                    {selectedMember.projects.map((project, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-900">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Progression des Tâches</h4>
                <div className="bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className={`h-4 rounded-full ${
                      selectedMember.taskCompletionRate >= 90
                        ? "bg-green-600"
                        : selectedMember.taskCompletionRate >= 70
                          ? "bg-blue-600"
                          : selectedMember.taskCompletionRate >= 50
                            ? "bg-yellow-600"
                            : "bg-red-600"
                    }`}
                    style={{ width: `${selectedMember.taskCompletionRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    <CheckCircle className="h-4 w-4 inline mr-1 text-green-500" />
                    {selectedMember.completedTasks} tâches terminées
                  </span>
                  <span className="text-gray-700">
                    <Clock className="h-4 w-4 inline mr-1 text-yellow-500" />
                    {selectedMember.pendingTasks} tâches en attente
                  </span>
                  <span className={`font-medium ${getCompletionColor(selectedMember.taskCompletionRate)}`}>
                    {selectedMember.taskCompletionRate}% complété
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer un Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
  )
}

export default MembreEquipe

