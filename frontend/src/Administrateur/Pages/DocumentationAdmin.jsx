import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {ChevronDown,ChevronUp,Book,Search,ArrowRight,CheckCircle,HelpCircle,FileText,ArrowLeft,} from "lucide-react"
import Header from "../component/Header"
import Footer from "../component/Footer"

const DocumentationAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("introduction")
  const [expandedQuestions, setExpandedQuestions] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleQuestionToggle = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  //  data
  const faqSections = [
    {
      id: "general",
      title: "Questions Générales",
      questions: [
        {
          id: "what-is-planit",
          question: "Qu'est-ce que Planit?",
          answer:
            "Planit est une application de gestion de projet complète conçue pour aider les équipes à planifier, suivre et exécuter leurs projets efficacement. Elle offre des fonctionnalités de gestion des tâches, de collaboration d'équipe, de suivi de progression et de reporting en temps réel.",
        },
        {
          id: "who-can-use",
          question: "Qui peut utiliser Planit?",
          answer:
            "Planit est conçu pour être utilisé par différents membres d'une équipe de projet, notamment les chefs de projet, les membres d'équipe, les parties prenantes et les gestionnaires. Chaque utilisateur a des permissions spécifiques basées sur son rôle dans le projet.",
        },
        {
          id: "pricing",
          question: "Comment fonctionne la tarification de Planit?",
          answer:
            "Planit propose plusieurs formules d'abonnement adaptées à différentes tailles d'équipes et besoins. Nous offrons une version gratuite avec des fonctionnalités de base, ainsi que des plans premium qui incluent des fonctionnalités avancées comme les rapports personnalisés, l'intégration avec d'autres outils, et un support prioritaire.",
        },
      ],
    },
    {
      id: "features",
      title: "Fonctionnalités",
      questions: [
        {
          id: "task-management",
          question: "Comment gérer les tâches dans Planit?",
          answer:
            "Planit vous permet de créer, assigner et suivre des tâches facilement. Vous pouvez définir des priorités, des dates d'échéance, ajouter des descriptions détaillées et des pièces jointes. Les tâches peuvent être organisées en listes, tableaux Kanban ou diagrammes de Gantt selon vos préférences.",
        },
        {
          id: "team-collaboration",
          question: "Quelles sont les fonctionnalités de collaboration d'équipe?",
          answer:
            "Planit facilite la collaboration d'équipe grâce à des commentaires sur les tâches, des mentions d'utilisateurs, des notifications en temps réel, et un système de messagerie intégré. Vous pouvez également partager des documents et collaborer sur des fichiers directement dans l'application.",
        },
        {
          id: "reporting",
          question: "Comment puis-je générer des rapports dans Planit?",
          answer:
            "Planit offre des outils de reporting puissants qui vous permettent de visualiser la progression du projet, la charge de travail de l'équipe, et les échéances à venir. Vous pouvez créer des tableaux de bord personnalisés, exporter des rapports en différents formats (PDF, Excel), et configurer des rapports automatiques envoyés par email.",
        },
      ],
    },
    {
      id: "technical",
      title: "Questions Techniques",
      questions: [
        {
          id: "data-security",
          question: "Comment Planit assure-t-il la sécurité des données?",
          answer:
            "Planit prend la sécurité des données très au sérieux. Nous utilisons le chiffrement SSL/TLS pour toutes les communications, stockons les données sur des serveurs sécurisés avec chiffrement au repos, et effectuons des sauvegardes régulières. Nous sommes conformes au RGPD et proposons des options d'authentification à deux facteurs.",
        },
        {
          id: "integrations",
          question: "Avec quels autres outils Planit peut-il s'intégrer?",
          answer:
            "Planit s'intègre avec de nombreux outils populaires comme Google Workspace, Microsoft Office 365, Slack, Trello, GitHub, GitLab, et bien d'autres. Nous proposons également une API ouverte pour des intégrations personnalisées avec vos systèmes existants.",
        },
        {
          id: "offline-access",
          question: "Puis-je utiliser Planit hors ligne?",
          answer:
            "Oui, Planit offre des fonctionnalités hors ligne limitées. Vous pouvez consulter vos tâches et projets, et les modifications que vous effectuez seront synchronisées une fois que vous serez de nouveau connecté à Internet. Notre application mobile permet également d'accéder à certaines fonctionnalités hors ligne.",
        },
      ],
    },
  ]

  const filteredFAQ = faqSections.map((section) => ({
      ...section,
      questions: section.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })) .filter((section) => section.questions.length > 0)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
          <div className="max-w-screen-xl mx-auto px-4 py-16 sm:py-24">
            <div
              className={`transition-all duration-700 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation Planit</h1>
              <p className="text-xl md:text-2xl max-w-2xl mb-8 text-blue-100">
                Tout ce que vous devez savoir pour maîtriser votre gestion de projet avec Planit
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <div className="sticky top-4 bg-white rounded-lg shadow-sm p-4 transition-all duration-500 ease-in-out transform md:translate-x-0">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Contenu
                </h2>
                <nav className="space-y-1">
                  <button
                    onClick={() => scrollToSection("introduction")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      activeSection === "introduction" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`} >
                    <Book className="h-4 w-4 mr-2" />
                    Introduction
                  </button>
                  <button
                    onClick={() => scrollToSection("getting-started")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      activeSection === "getting-started"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100" }`}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Démarrage Rapide
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      activeSection === "faq" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`} >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    FAQ
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Introduction Section */}
              <section
                id="introduction"
                className={`mb-12 bg-white rounded-lg shadow-sm p-6 md:p-8 transition-all duration-700 ease-out transform ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0" }`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Book className="h-6 w-6 mr-2 text-blue-500" />
                  Introduction à Planit
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    <strong className="text-blue-600">Planit</strong> est une solution complète de gestion de projet
                    conçue pour simplifier la planification, l'exécution et le suivi de vos projets. Notre plateforme
                    intuitive aide les équipes de toutes tailles à collaborer efficacement, à respecter les délais et à
                    atteindre leurs objectifs.
                  </p>
                  <p className="mb-4">
                    Que vous soyez chef de projet, membre d'équipe ou partie prenante, Planit vous offre les outils
                    nécessaires pour rester organisé et productif. Notre interface conviviale et nos fonctionnalités
                    puissantes vous permettent de vous concentrer sur ce qui compte vraiment : la réussite de vos
                    projets.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">Gestion des Tâches</h3>
                      <p className="text-gray-600">
                        Créez, assignez et suivez des tâches avec des priorités et des échéances claires.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">Collaboration d'Équipe</h3>
                      <p className="text-gray-600">
                        Communiquez efficacement et partagez des ressources en temps réel.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">Suivi et Reporting</h3>
                      <p className="text-gray-600">
                        Visualisez la progression et générez des rapports détaillés pour une prise de décision éclairée.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Getting Started Section */}
              <section
                id="getting-started"
                className={`mb-12 bg-white rounded-lg shadow-sm p-6 md:p-8 transition-all duration-700 ease-out transform ${
                  isLoaded ? "translate-y-0 opacity-100 delay-100" : "translate-y-10 opacity-0"
                }`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-blue-500" />
                  Démarrage Rapide
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-6">Commencez à utiliser Planit en quelques étapes simples :</p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-3">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Créez votre compte</h3>
                        <p className="text-gray-600">
                          Inscrivez-vous gratuitement et configurez votre profil avec vos informations professionnelles.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-3">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Créez votre premier projet</h3>
                        <p className="text-gray-600">
                          Définissez le nom, la description, les objectifs et les échéances de votre projet.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-3">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Invitez votre équipe</h3>
                        <p className="text-gray-600">
                          Ajoutez des membres à votre projet et assignez-leur des rôles spécifiques.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-3">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Créez et assignez des tâches</h3>
                        <p className="text-gray-600">
                          Décomposez votre projet en tâches gérables et assignez-les aux membres de l'équipe.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-700 mb-2">Conseil Pro</h3>
                    <p className="text-gray-700">
                      Utilisez nos modèles prédéfinis pour démarrer rapidement avec des structures de projet éprouvées
                      pour différents types de projets.
                    </p>
                    <Link
                      to="/templates"
                      className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium">
                      Explorer les modèles
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section
                id="faq"
                className={`mb-12 bg-white rounded-lg shadow-sm p-6 md:p-8 transition-all duration-700 ease-out transform ${
                  isLoaded ? "translate-y-0 opacity-100 delay-200" : "translate-y-10 opacity-0"
                }`}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2 text-blue-500" />
                  Questions Fréquemment Posées
                </h2>

                {searchQuery && filteredFAQ.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun résultat trouvé pour "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Effacer la recherche
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {(searchQuery ? filteredFAQ : faqSections).map((section) => (
                      <div key={section.id} className="animate-fadeIn">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                        <div className="space-y-4">
                          {section.questions.map((item) => (
                            <div
                              key={item.id}
                              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
                            >
                              <button
                                className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => handleQuestionToggle(item.id)} >
                                <span className="font-medium text-gray-900">{item.question}</span>
                                {expandedQuestions[item.id] ? (
                                  <ChevronUp className="h-5 w-5 text-blue-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-blue-500" />
                                )}
                              </button>
                              <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                  expandedQuestions[item.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}>
                                <div className="p-4 bg-blue-50 border-t border-gray-200">
                                  <p className="text-gray-700">{item.answer}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer /> 
    </div>
  )
}

export default DocumentationAdmin 
    

