import React from "react"
import HeaderClient from "../component/HeaderClient"
import FooterClient from "../component/FooterClient"

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderClient />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 px-4 rounded-3xl mx-4 my-8 md:mx-8 lg:mx-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Des fonctionnalités puissantes pour simplifier votre gestion de projet
              </h1>
              <p className="text-lg opacity-90">
                Libérez tout le potentiel de vos projets grâce à notre plateforme riche en fonctionnalités
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-white/90 font-medium transition-colors">
                  Commencer
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-4 max-w-md mx-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Bienvenue de retour !</p>
                      <p className="text-sm text-gray-500">Mes projets</p>
                      <h3 className="text-2xl font-bold text-gray-900">12 Actifs</h3>
                    </div>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">+3 Nouveaux</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">
                          P1
                        </div>
                        <span className="font-medium text-black">Refonte Site Web</span>
                      </div>
                      <span className="text-green-600">75%</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">
                          P2
                        </div>
                        <span className="font-medium text-black">Application Mobile</span>
                      </div>
                      <span className="text-amber-600">45%</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">
                          P3
                        </div>
                        <span className="font-medium text-black">Campagne Marketing</span>
                      </div>
                      <span className="text-red-600">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* À propos de PlanIt */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              À propos de PlanIt
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Votre solution complète de gestion de projet</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PlanIt est une plateforme intuitive conçue pour aider les équipes à planifier, exécuter et suivre leurs
              projets efficacement. Notre solution tout-en-un simplifie la collaboration et améliore la productivité.
            </p>
          </div>

          <div className="container mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v2"></path>
                  <path d="M13 17v2"></path>
                  <path d="M13 11v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Simplicité d'utilisation</h3>
              <p className="text-gray-600">
                Interface intuitive qui ne nécessite aucune formation spéciale. Commencez à gérer vos projets dès
                aujourd'hui.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Notifications en temps réel</h3>
              <p className="text-gray-600">
                Restez informé des mises à jour importantes et des échéances à venir grâce à notre système de
                notifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m7 10 3 3 7-7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Haute sécurité</h3>
              <p className="text-gray-600">
                Vos données sont protégées par des protocoles de sécurité avancés, garantissant la confidentialité de
                vos projets.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Fonctionnalités
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Principales fonctionnalités de notre plateforme</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">de gestion de projet</h2>
          </div>

          {/* Feature 1 */}
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-4">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Analyses en temps réel</h3>
              <p className="text-gray-600 leading-relaxed">
                Accédez instantanément aux données cruciales de vos projets grâce à nos analyses avancées en temps réel,
                vous permettant de garder une longueur d'avance. Qu'il s'agisse de suivre la productivité de l'équipe ou
                de prévoir les tendances, notre plateforme vous fournit les informations dont vous avez besoin,
                instantanément et avec précision.
              </p>
              <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                Découvrir cette fonctionnalité
              </button>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Mes statistiques</p>
                      <h3 className="text-2xl font-bold">
                        85% <span className="text-sm text-gray-500">Complété</span>
                      </h3>
                    </div>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">+12%</div>
                  </div>

                  <div className="h-48 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=192&width=400"
                      alt="Tableau de bord d'analyse en temps réel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-6 max-w-md mx-auto">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      {i % 3 === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-blue-600"
                        >
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                        </svg>
                      ) : i % 2 === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-blue-600"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-blue-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m2 12 3-3 3 3" />
                          <path d="m22 12-3 3-3-3" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Intégration transparente</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre plateforme s'intègre sans effort à votre flux de travail et à vos systèmes existants, assurant une
                transition en douceur vers vos opérations. Que vous utilisiez un logiciel de comptabilité, des systèmes
                ERP ou d'autres outils de projet, notre solution se connecte facilement, vous permettant de maintenir la
                continuité tout en améliorant vos capacités.
              </p>
              <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                Découvrir cette fonctionnalité
              </button>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-4">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Collaboration d'équipe</h3>
              <p className="text-gray-600 leading-relaxed">
                Facilitez la communication et la collaboration entre les membres de votre équipe. Assignez des tâches,
                partagez des fichiers et communiquez en temps réel dans un espace de travail centralisé. Notre
                plateforme élimine les silos d'information et permet à chacun de rester sur la même page, peu importe où
                ils travaillent.
              </p>
              <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                Découvrir cette fonctionnalité
              </button>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">TD</span>
                    </div>
                    <div>
                      <p className="font-medium">Thomas Dubois</p>
                      <p className="text-sm text-gray-500">Chef de projet</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-blue-200 pl-4 ml-4 space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm">J'ai assigné la tâche "Conception de l'interface" à Sophie</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg ml-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-xs">SC</span>
                        </div>
                        <p className="text-xs font-medium">Sophie Clément</p>
                      </div>
                      <p className="text-sm">J'ai commencé à travailler dessus, je partagerai les maquettes demain</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 1 heure</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg ml-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-xs">JP</span>
                        </div>
                        <p className="text-xs font-medium">Jean Petit</p>
                      </div>
                      <p className="text-sm">
                        Je serai disponible pour commencer le développement dès que les maquettes seront prêtes
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 30 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl mx-4 my-12 md:mx-8 lg:mx-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre gestion de projet ?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Rejoignez des milliers d'équipes qui ont déjà amélioré leur flux de travail et leur productivité avec
              PlanIt.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 rounded-md bg-white text-blue-600 hover:bg-blue-50 font-medium transition-colors shadow-lg">
                Essai gratuit
              </button>
              <button className="px-6 py-3 rounded-md bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium transition-colors">
                Demander une démo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterClient />
    </div>
  )
}

