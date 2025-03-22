import React from "react"
import { useState } from "react"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"
import HeaderEquipe from "../component/HeaderEquipe"
import FooterEquipe from "../component/FooterEquipe"
// Sample task data
const initialTasks = [
  {
    id: 1,
    title: "Mise à jour du site web",
    description: "Mettre à jour la page d'accueil avec les nouvelles fonctionnalités",
    assignee: "Thomas Martin",
    startDate: "2023-05-15",
    dueDate: "2023-05-25",
    status: "to do",
    priority: "high",
  },
  {
    id: 2,
    title: "Correction de bugs",
    description: "Résoudre les problèmes signalés dans le formulaire de contact",
    assignee: "Sophie Dubois",
    startDate: "2023-05-16",
    dueDate: "2023-05-22",
    status: "in progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "Intégration API",
    description: "Connecter notre système avec l'API de paiement",
    assignee: "Lucas Bernard",
    startDate: "2023-05-10",
    dueDate: "2023-05-20",
    status: "en test",
    priority: "high",
  },
  {
    id: 4,
    title: "Documentation",
    description: "Rédiger la documentation technique pour les développeurs",
    assignee: "Emma Petit",
    startDate: "2023-05-05",
    dueDate: "2023-05-18",
    status: "done",
    priority: "low",
  },
  {
    id: 5,
    title: "Design mobile",
    description: "Créer des maquettes pour la version mobile de l'application",
    assignee: "Julie Moreau",
    startDate: "2023-05-12",
    dueDate: "2023-05-24",
    status: "to do",
    priority: "medium",
  },
  {
    id: 6,
    title: "Optimisation SEO",
    description: "Améliorer le référencement du site web",
    assignee: "Nicolas Leroy",
    startDate: "2023-05-14",
    dueDate: "2023-05-28",
    status: "in progress",
    priority: "medium",
  },
  {
    id: 7,
    title: "Tests unitaires",
    description: "Écrire des tests pour les nouvelles fonctionnalités",
    assignee: "Marie Durand",
    startDate: "2023-05-17",
    dueDate: "2023-05-23",
    status: "en test",
    priority: "high",
  },
  {
    id: 8,
    title: "Déploiement",
    description: "Mettre en production la nouvelle version",
    assignee: "Pierre Lefebvre",
    startDate: "2023-05-20",
    dueDate: "2023-05-21",
    status: "to do",
    priority: "high",
  },
]

// Main Component
export default function TachesEquipe() {
  const [tasks, setTasks] = useState(initialTasks)
  const [draggedTask, setDraggedTask] = useState(null)
  const statuses = ["to do", "in progress", "en test", "done"]

  const handleDragStart = (e, taskId) => {
    setDraggedTask(taskId)
    // Create a ghost image for dragging
    if (e.dataTransfer) {
      const ghostElement = e.currentTarget.cloneNode(true)
      ghostElement.style.position = "absolute"
      ghostElement.style.top = "-1000px"
      document.body.appendChild(ghostElement)
      e.dataTransfer.setDragImage(ghostElement, 0, 0)
      setTimeout(() => {
        document.body.removeChild(ghostElement)
      }, 0)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    if (draggedTask !== null) {
      setTasks(tasks.map((task) => (task.id === draggedTask ? { ...task, status } : task)))
      setDraggedTask(null)
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`
  }

  const getStatusTitle = (status) => {
    switch (status) {
      case "to do":
        return "À Faire"
      case "in progress":
        return "En Cours"
      case "en test":
        return "En Test"
      case "done":
        return "Terminé"
      default:
        return status
    }
  }

  // Update the getStatusColor function to use blue shades
  const getStatusColor = (status) => {
    switch (status) {
      case "to do":
        return "bg-blue-100"
      case "in progress":
        return "bg-blue-300"
      case "en test":
        return "bg-blue-200"
      case "done":
        return "bg-blue-500 text-white"
      default:
        return "bg-blue-100"
    }
  }

  // Update the TaskCard component styling
  const TaskCard = ({ task }) => {
    const isDragging = draggedTask === task.id

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task.id)}
        className={`bg-white rounded-lg shadow p-3 cursor-move border-l-4 ${
          task.priority === "high"
            ? "border-red-500"
            : task.priority === "medium"
              ? "border-yellow-500"
              : "border-green-500"
        } ${isDragging ? "opacity-50" : "opacity-100"}`}
      >
        <div className="font-medium mb-2 text-blue-800">{task.title}</div>
        <div className="text-sm text-gray-600 mb-2">{task.description}</div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <UserIcon className="w-4 h-4 mr-1 text-blue-600" />
          <span>{task.assignee}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <CalendarIcon className="w-3 h-3 mr-1 text-blue-600" />
            <span>{formatDate(task.startDate)}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-3 h-3 mr-1 text-blue-600" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>

        {task.priority && (
          <div
            className={`mt-2 text-xs px-2 py-1 rounded-full inline-block
            ${
              task.priority === "high"
                ? "bg-red-100 text-red-800"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </div>
        )}
      </div>
    )
  }

  // Update the TaskColumn component styling
  const TaskColumn = ({ status }) => {
    const columnTasks = getTasksByStatus(status)

    return (
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
        className="rounded-lg p-4 min-h-[500px] border border-blue-200 bg-white shadow-sm"
      >
        <div className={`rounded-t-lg p-2 mb-3 ${getStatusColor(status)}`}>
          <h2 className="font-semibold text-center">{getStatusTitle(status)}</h2>
          <div className="text-sm text-center text-gray-600">{columnTasks.length} tâches</div>
        </div>
        <div className="space-y-3">
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    )
  }

  // Update the main return section with blue styling
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderEquipe />
      <main className="flex-grow bg-blue-50 p-4">
        <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>Équipes</span>
            <span className="mx-2">/</span>
            <span>Taches</span>
          </div>
          <h1 className="text-2xl font-bold mb-6 text-black">Gestion des Tâches</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statuses.map((status) => (
              <TaskColumn key={status} status={status} />
            ))}
          </div>
        </div>
      </main>
      <FooterEquipe />
    </div>
  )
}

