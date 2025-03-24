import React from "react"
import { MoreHorizontal } from "lucide-react"

export default function ProjectProgress() {
  // Sample project data
  const projectData = {
    total: 5,
    completed: 3,
    projects: [
      { name: " Mise en page ", assignee: "Mittie Henderson", color: "bg-blue-200", dotColor: "bg-blue-400" },
      { name: "Conception graphique ", assignee: "Dustin Woods", color: "bg-pink-200", dotColor: "bg-pink-400" },
      { name: " Séance photo", assignee: "Jorge Rivera", color: "bg-indigo-200", dotColor: "bg-indigo-600" },
      { name: "Branding", assignee: "Glenn Hudson", color: "bg-orange-200", dotColor: "bg-orange-400" },
    ],
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Projet total</h2>

      {/* Circular progress indicator */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Dotted background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="2" strokeDasharray="3,3" />

          {/* Orange progress arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FF9F43"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(projectData.completed / projectData.total) * 283}, 283`}
            transform="rotate(-90 50 50)"/>

          {/* Blue progress arc (slightly larger) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(projectData.completed / projectData.total) * 251}, 251`}
            transform="rotate(-90 50 50)" />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-gray-800">{projectData.completed} Completed</span>
          <span className="text-sm text-gray-500">from {projectData.total} Project</span>
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-4 mt-4">
        {projectData.projects.map((project, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${project.dotColor} mr-3`}></div>
              <div>
                <h3 className="font-medium text-gray-800">{project.name}</h3>
                <p className="text-xs text-gray-500">by {project.assignee}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

