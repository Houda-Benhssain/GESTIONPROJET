import React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Trash2, Send, Search } from "lucide-react"
import { Link } from "react-router-dom"
import HeaderChefProjet from "../component/HeaderChefProjet"
import FooterChefProjet from "../component/FooterChefProjet"

const MessagesPage = () => {
  // Messages state
  const [messages, setMessages] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Load messages (simulated)
  useEffect(() => {
    // Simulate API call to fetch messages
    setTimeout(() => {
      const dummyMessages = [
        {
          id: "1",
          content: "Bonjour, pouvez-vous me faire un point sur l'avancement du projet?",
          sender: "Marie Dupont",
          timestamp: new Date(2025, 2, 20, 9, 30),
          read: true,
        },
        {
          id: "2",
          content: "Les documents que vous avez demandés sont prêts. Je vous les envoie cet après-midi.",
          sender: "Thomas Bernard",
          timestamp: new Date(2025, 2, 19, 14, 15),
          read: true,
        },
        {
          id: "3",
          content: "Urgent: Nous devons reprogrammer la réunion de demain. Êtes-vous disponible vendredi à 10h?",
          sender: "Sophie Martin",
          timestamp: new Date(2025, 2, 18, 16, 45),
          read: false,
        },
        {
          id: "4",
          content: "J'ai besoin de votre validation pour le budget du nouveau projet avant demain midi.",
          sender: "Lucas Petit",
          timestamp: new Date(2025, 2, 17, 11, 20),
          read: false,
        },
        {
          id: "5",
          content: "Merci pour votre présentation d'hier. Le client était très satisfait du travail accompli.",
          sender: "Emma Leroy",
          timestamp: new Date(2025, 2, 16, 8, 10),
          read: true,
        },
      ]
      setMessages(dummyMessages)
      setLoading(false)
    }, 800)
  }, [])

  // Delete message
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  // Mark message as read
  const handleMarkAsRead = (id) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, read: true } : message)))
  }

  // Send new message (simulated)
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "Moi",
      timestamp: new Date(),
      read: true,
    }

    setMessages([newMsg, ...messages])
    setNewMessage("")
  }

  // Format date
  const formatDate = (date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui, ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Hier, ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <HeaderChefProjet />
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-3 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-gray-500 hover:text-blue-600 mr-3 transition-colors duration-200">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </div>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 pr-3 py-1.5 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* New Message Form */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h2 className="text-base font-semibold text-gray-800 mb-3">Nouveau Message</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Écrivez votre message ici..."
                  className="flex-grow px-3 py-2 text-sm rounded-l-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-r-md transition-colors duration-200 flex items-center"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">Boîte de réception</h2>
                <p className="text-gray-500 text-xs">{messages.length} messages</p>
              </div>

              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-3 text-gray-500 text-sm">Chargement des messages...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 text-sm">Aucun message trouvé</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 hover:bg-gray-50 transition-colors duration-200 ${!message.read ? "bg-blue-50" : ""}`}
                      onClick={() => !message.read && handleMarkAsRead(message.id)}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2 text-sm">
                            {message.sender.charAt(0)}
                          </div>
                          <div>
                            <h3 className={`font-medium text-sm ${!message.read ? "text-blue-700" : "text-gray-800"}`}>
                              {message.sender}
                            </h3>
                            <p className="text-gray-500 text-xs">{formatDate(message.timestamp)}</p>
                          </div>
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteMessage(message.id)
                          }}
                          aria-label="Supprimer le message"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="ml-10">
                        <p className="text-gray-700 text-sm line-clamp-2">{message.content}</p>
                      </div>
                      {!message.read && (
                        <div className="mt-1.5 ml-10">
                          <span className="inline-block bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
                            Non lu
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FooterChefProjet />
    </div>
  )
}

export default MessagesPage

