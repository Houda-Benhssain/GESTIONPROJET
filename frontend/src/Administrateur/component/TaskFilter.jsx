import React from "react";
const TaskFilter = ({ filters, onFilterChange, projects, assignees }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div>
        <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Project
        </label>
        <select
          id="project-filter"
          value={filters.project}
          onChange={(e) => onFilterChange("project", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Projects</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label htmlFor="assignee-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Assigned To
        </label>
        <select
          id="assignee-filter"
          value={filters.assignedTo}
          onChange={(e) => onFilterChange("assignedTo", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Assignees</option>
          {assignees.map((assignee, index) => (
            <option key={index} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="due-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <select
          id="due-date-filter"
          value={filters.dueDate}
          onChange={(e) => onFilterChange("dueDate", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Dates</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due Today</option>
          <option value="tomorrow">Due Tomorrow</option>
          <option value="week">Due This Week</option>
        </select>
      </div>
    </div>
  )
}

export default TaskFilter

