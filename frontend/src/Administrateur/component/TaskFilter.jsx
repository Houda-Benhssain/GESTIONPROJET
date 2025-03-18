import React from "react";
const TaskFilter = ({ filters, onFilterChange, projects, assignees }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div>
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select
          id="status-filter"
          value={filters.statut} // Assurez-vous que la valeur utilisée ici est "statut"
          onChange={(e) => onFilterChange("statut", e.target.value)} // Le nom du filtre doit être "statut"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="en attente">En attente</option>
          <option value="en cours">En cours</option>
          <option value="terminee">Terminé</option>
          <option value="annulee">Annulée</option>
        </select>
      </div>

      <div>
        <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Projet
        </label>
        <select
          id="project-filter"
          value={filters.project}
          onChange={(e) => onFilterChange("project", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous les projets</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Priorité
        </label>
        <select
          id="priority-filter"
          value={filters.priorite} // Assurez-vous que la valeur utilisée ici est "priorite"
          onChange={(e) => onFilterChange("priorite", e.target.value)} // Le nom du filtre doit être "priorite"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Toutes les priorités</option>
          <option value="basse">Basse</option>
          <option value="moyenne">Moyenne</option>
          <option value="haute">Haute</option>
          <option value="critique">Critique</option>
        </select>
      </div>

      <div>
        <label htmlFor="assignee-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Assigné à
        </label>
        <select
          id="assignee-filter"
          value={filters.assignedTo}
          onChange={(e) => onFilterChange("assignedTo", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Tous les assignés</option>
          {assignees.map((assignee, index) => (
            <option key={index} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="due-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Date d'échéance
        </label>
        <select
          id="due-date-filter"
          value={filters.dueDate}
          onChange={(e) => onFilterChange("dueDate", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">Toutes les dates</option>
          <option value="overdue">En retard</option>
          <option value="today">À faire aujourd'hui</option>
          <option value="tomorrow">À faire demain</option>
          <option value="week">À faire cette semaine</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
