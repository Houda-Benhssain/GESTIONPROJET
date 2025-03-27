import React from "react"
import { Calendar, Users } from "lucide-react"

const ProjectFilter = ({ filters, onFilterChange, clients }) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          <option value="termine">Terminee</option>
          <option value="en cours">En cours</option>
          <option value="en attente">En attente</option>
          <option value="annule">Annulee</option>
        </select>
      </div>

      <div>
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          id="client"
          name="client"
          value={filters.client}
          onChange={(e) => onFilterChange("client", e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.utilisateur.nom}
              </option>
            ))
          ) : (
            <option disabled>No clients available</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
        Plage de dates
        </label>
        <select
          id="dateRange"
          name="dateRange"
          value={filters.dateRange}
          onChange={(e) => onFilterChange("dateRange", e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          <option value="30days">30 jours</option>
          <option value="90days">90 jours</option>
        </select>
      </div>
    </div>
  )
}

export default ProjectFilter