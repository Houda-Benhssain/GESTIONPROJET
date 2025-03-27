import React from "react"
import { useState } from "react"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"
import { Link } from "react-router-dom"
import {
  CheckCircle,
  FileEdit,
  Calendar,
  Users,
  Clock,
  ChevronRight,
  BarChart2,
  PieChart,
  FileText,
  Plus,
  MessageSquare,
  Bell,
  ArrowRight,
  Briefcase,
  Target,
  CheckSquare,
  Trash2,
} from "lucide-react"

const HomeChefProjet = () => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finaliser le cahier des charges", completed: false, priority: "high" },
    { id: 2, text: "Planifier la réunion de lancement", completed: true, priority: "medium" },
    { id: 3, text: "Valider les maquettes avec le client", completed: false, priority: "high" },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority: "medium" }])
      setNewTask("")
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "Exemple Commercialisation",
      methodology: "GTMS",
      lead: "houda benhssain",
      icon: "💼",
      color: "bg-blue-500",
      progress: 75,
      status: "En cours",
      deadline: "15 Juin 2023",
      budget: "€25,000",
      team: ["JD", "ML", "PB"],
    },
    {
      id: 2,
      name: "Gestion de projet",
      methodology: "SCRUM",
      lead: "houda benhssain",
      icon: "🔄",
      color: "bg-indigo-500",
      progress: 45,
      status: "En cours",
      deadline: "30 Juillet 2023",
      budget: "€18,500",
      team: ["JD", "SM"],
    },
    {
      id: 3,
      name: "Application Mobile",
      methodology: "Agile",
      lead: "Jean Dupont",
      icon: "📱",
      color: "bg-cyan-500",
      progress: 30,
      status: "En cours",
      deadline: "10 Août 2023",
      budget: "€32,000",
      team: ["ML", "PB", "SM"],
    },
  ]

  // Sample team members data
  const teamMembers = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Développeur Frontend",
      avatar: "JD",
      color: "bg-blue-600",
      status: "En ligne",
    },
    { id: 2, name: "Marie Leclerc", role: "Designer UI/UX", avatar: "ML", color: "bg-purple-600", status: "En ligne" },
    { id: 3, name: "Pierre Blanc", role: "Développeur Backend", avatar: "PB", color: "bg-green-600", status: "Absent" },
    { id: 4, name: "Sophie Martin", role: "Analyste QA", avatar: "SM", color: "bg-amber-600", status: "En pause" },
  ]

  // Sample risks data
  const risks = [
    {
      id: 1,
      title: "Retard de livraison API",
      project: "Exemple Commercialisation",
      impact: "high",
      probability: "medium",
      mitigation: "Développer des mocks pour continuer le développement frontend",
    },
    {
      id: 2,
      title: "Budget insuffisant",
      project: "Application Mobile",
      impact: "high",
      probability: "low",
      mitigation: "Réviser le périmètre du projet avec le client",
    },
    {
      id: 3,
      title: "Ressources insuffisantes",
      project: "Gestion de projet",
      impact: "medium",
      probability: "high",
      mitigation: "Recruter des freelances pour les pics d'activité",
    },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      <HeaderChefProjet />
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-6 px-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center text-xs text-blue-100 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span>Chef de Projet</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Tableau de Bord</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-screen-2xl mx-auto -mt-6">
        {/* Project Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">Tâches terminées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FileEdit className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-500">Projets mis à jour</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-500">Membres d'équipe</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-500">Échéances proches</div>
              </div>
            </div>
          </div>
        </div>
        {/* Projects Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="p-4 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-800">Projets</h2>
                  <div className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {projects.length}
                  </div>
                </div>
                <Link to="/add_project">
                  <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <Plus className="h-4 w-4 mr-1" />
                    Nouveau projet
                  </button>
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full">
                {projects.map((project) => (
                  <div key={project.id} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div
                            className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center text-white mr-3 shadow-sm`}
                          >
                            <span>{project.icon}</span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-blue-700 hover:underline cursor-pointer">
                                {project.name}
                              </h3>
                              <span className="text-gray-500 text-sm ml-2">({project.methodology})</span>
                            </div>
                            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                              <div className="flex items-center text-xs text-gray-600">
                                <Users className="h-3 w-3 mr-1" />
                                <span>Lead: </span>
                                <span className="text-blue-600 hover:underline cursor-pointer ml-1">
                                  {project.lead}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-gray-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{project.deadline}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-600">
                                <Briefcase className="h-3 w-3 mr-1" />
                                <span>{project.budget}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-600">
                                <Target className="h-3 w-3 mr-1" />
                                <span>{project.status}</span>
                              </div>
                            </div>

                            {/* Team members */}
                            <div className="flex -space-x-2 mt-2">
                              {project.team.map((member, index) => (
                                <div
                                  key={index}
                                  className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs border-2 border-white"
                                >
                                  {member}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
                            <FileText className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Project Progress Section */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Progression des Projets</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
                  <PieChart className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
                  <BarChart2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative w-40 h-40 mx-auto mb-6">
              {/* Circular progress chart */}
              <svg className="absolute inset-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1C8.61116 1 1 8.61116 1 18C1 27.3888 8.61116 35 18 35Z"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-800 text-sm font-semibold">75%</span>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">{project.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-blue-600">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 text-amber-500 mr-1" />
                    <span className="text-xs text-gray-500">{project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Activity Section */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Activité de l'équipe</h2>
              <span className="text-gray-500 text-xs">Membre d'equipe</span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Jean Dupont a terminé 3 tâches</h3>
                    <span className="text-gray-500 text-xs">Il y a 35 minutes</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-500 text-xs">Projet: Refonte Site Web</p>
                    <span className="text-gray-500 text-xs">Module: Frontend</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-white">ML</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">Marie Leclerc a ajouté un commentaire</h3>
                    <span className="text-gray-500 text-xs">Il y a 2 heures</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-500 text-xs">Projet: Application Mobile</p>
                    <span className="text-gray-500 text-xs">Tâche: API Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Priority Tasks Section */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tâches Prioritaires</h2>
              <div className="flex space-x-2">
                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
                  <CheckSquare className="h-4 w-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Ajouter une tâche prioritaire..."
                  className="flex-1 bg-blue-50 text-gray-800 px-3 py-2 text-sm rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors shadow-sm"
                >
                  Ajouter
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center rounded-lg p-3 hover:bg-blue-50 transition-colors border ${
                    task.priority === "high"
                      ? "border-red-200 bg-red-50"
                      : task.priority === "medium"
                        ? "border-amber-200 bg-amber-50"
                        : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-md border ${
                      task.completed ? "bg-blue-500 border-blue-500" : "border-blue-500"
                    } flex items-center justify-center mr-3`}
                  >
                    {task.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-sm text-gray-800 flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
                  >
                    {task.text}
                  </span>
                  <div className="flex items-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-md transition-colors"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-6 text-gray-500 text-sm bg-blue-50 rounded-lg">
                  Aucune tâche prioritaire. Ajoutez-en une ci-dessus.
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Meetings Section */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Réunions à venir</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                      <span className="text-sm font-bold">24</span>
                      <span className="text-xs">Mar</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Revue de Sprint</h3>
                      <p className="text-gray-600 text-xs mt-1">Équipe de développement</p>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          {teamMembers.slice(0, 3).map((member, index) => (
                            <div
                              key={index}
                              className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-white text-xs border-2 border-white`}
                            >
                              {member.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+2 autres</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-gray-700">10:00 - 10:45</span>
                    <Link to="/DetailReunionCf/1" className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium">
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                      <span className="text-sm font-bold">26</span>
                      <span className="text-xs">Mar</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Présentation Client</h3>
                      <p className="text-gray-600 text-xs mt-1">Projet: Refonte Site Web</p>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          {teamMembers.slice(1, 3).map((member, index) => (
                            <div
                              key={index}
                              className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-white text-xs border-2 border-white`}
                            >
                              {member.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+1 client</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-gray-700">14:30 - 15:30</span>
                    <Link to="/DetailReunionCf/2" className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium">
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex flex-col items-center justify-center shrink-0 text-white shadow-sm">
                      <span className="text-sm font-bold">28</span>
                      <span className="text-xs">Mar</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Planification de Projet</h3>
                      <p className="text-gray-600 text-xs mt-1">Nouveau projet: E-commerce</p>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          {teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-white text-xs border-2 border-white`}
                            >
                              {member.avatar}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-gray-700">09:00 - 10:30</span>
                    <Link to="/DetailReunionCf/3" className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium">
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/AddRéunionCF">
                <button className="w-full py-3 text-blue-700 hover:text-indigo-800 text-sm font-medium border border-dashed border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier une réunion
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Team Management Section - New Element */}
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Gestion d'Équipe</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${member.color} flex items-center justify-center text-white font-medium mr-3`}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-0.5 rounded-full "></span>
                  <div className="flex space-x-1">
                    <Link to="/chat/ChefProjet">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </Link>
                    <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100">
            <a
              href="/team/ChefProjet"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
            >
              Gérer les équipes
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
      <FooterChefProjet />
    </div>
  )
}

export default HomeChefProjet

