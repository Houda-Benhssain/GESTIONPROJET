import React from "react"
const ProjectFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="on-hold">On Hold</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label htmlFor="client-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Client
        </label>
        <select
          id="client-filter"
          value={filters.client}
          onChange={(e) => onFilterChange("client", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Clients</option>
          <option value="Acme Inc">Acme Inc</option>
          <option value="Globex Corporation">Globex Corporation</option>
          <option value="Stark Industries">Stark Industries</option>
          <option value="Wayne Enterprises">Wayne Enterprises</option>
          <option value="Umbrella Corporation">Umbrella Corporation</option>
        </select>
      </div>

      <div>
        <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Date Range
        </label>
        <select
          id="date-filter"
          value={filters.dateRange}
          onChange={(e) => onFilterChange("dateRange", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Time</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>
    </div>
  )
}

export default ProjectFilter

