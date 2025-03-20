import React from "react"
import { ChevronDown } from "lucide-react"

const TaskFilter = ({ filters, onFilterChange, projects, assignees }) => {
  // Get unique statuses for the dropdown
  const statuses = ["completed", "in-progress", "blocked", "not-started"]

  // Get unique priorities for the dropdown
  const priorities = ["critique", "haute", "moyenne", "basse"]

  // Function to handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange(name, value)
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Status Filter */}
      <div className="flex flex-col">
        <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <div className="relative">
          <select
            id="statut"
            name="statut"
            value={filters.statut}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">Tous les statuts</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
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
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">Tous les projets</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col">
        <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">
          Priorité
        </label>
        <div className="relative">
          <select
            id="priorite"
            name="priorite"
            value={filters.priorite}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">Toutes les priorités</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Assigned To Filter */}
      <div className="flex flex-col">
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
          Assigné à
        </label>
        <div className="relative">
          <select
            id="assignedTo"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">Tous les utilisateurs</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Due Date Filter - This could be expanded with a date picker */}
      <div className="flex flex-col">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Date d'échéance
        </label>
        <div className="relative">
          <select
            id="dueDate"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">Toutes les dates</option>
            <option value="overdue">En retard</option>
            <option value="today">Aujourd'hui</option>
            <option value="this-week">Cette semaine</option>
            <option value="next-week">Semaine prochaine</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskFilter

