import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import imagePlanIt from "../../Image/imagePlanIt.jpg";
import { CheckCircle, FileEdit, FileText, Calendar, Maximize2, X, RefreshCw, Link2 } from "lucide-react";

const HomeBody = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [projects, setProjects] = useState([]);
  const [summary, setSummary] = useState({ created: 0, updated: 0, completed: 0 });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/projets")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        calculateSummary(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des projets:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const calculateSummary = (projects) => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    let createdCount = 0;
    let updatedCount = 0;
    let completedCount = 0;

    projects.forEach((project) => {
      const createdAt = project.created_at ? new Date(project.created_at) : null;
      const updatedAt = project.updated_at ? new Date(project.updated_at) : null;

      if (createdAt && createdAt >= sevenDaysAgo) createdCount++;
      if (updatedAt && updatedAt >= sevenDaysAgo) updatedCount++;
      if (project.statut === "termine" && updatedAt && updatedAt >= sevenDaysAgo) completedCount++;
    });

    setSummary({ created: createdCount, updated: updatedCount, completed: completedCount });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
        {/* Project Summary Section */}
        <div className="mb-2">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>Projects</span>
            <span className="mx-2">/</span>
            <span>Gestion de projet</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Aperçu des activités</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card icon={<CheckCircle className="h-4 w-4 text-green-600" />} title={`${summary.completed} terminé`} description="Au cours des 7 derniers jours" />
            <Card icon={<FileEdit className="h-4 w-4 text-blue-600" />} title={`${summary.updated} mis à jour`} description="Au cours des 7 derniers jours" />
            <Card icon={<FileText className="h-4 w-4 text-purple-600" />} title={`${summary.created} crée`} description="Au cours des 7 derniers jours" />
          </div>
        </div>

        {/* Welcome Section */}
        {welcomeVisible && (
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Introduction</h2>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Maximize">
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Link">
                  <Link2 className="h-4 w-4" />
                </button>
                <button onClick={() => setWelcomeVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <img src={imagePlanIt} alt="Welcome illustration" className="max-w-full h-auto max-h-48" />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue sur PlanIt</h3>
                <p className="text-gray-700 mb-3">
                Nouveau sur PlanIt ? Découvrez la{" "}
                  <a href="/documentationAdmin" className="text-blue-600 hover:underline">
                    Documentation
                  </a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Task List Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg p-4 flex flex-col items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-base font-bold mb-3 text-gray-800">To Do List</h2>
          <form onSubmit={handleSubmit} className="mb-3 w-full max-w-md">
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Entrer une tâche..."
                className="flex-1 bg-gray-100 text-gray-800 px-2 py-1.5 text-sm rounded-l border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-r font-medium transition-colors shadow-sm">
                Ajouter
              </button>
            </div>
          </form>
          <div className="space-y-1.5 w-full max-w-md">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center bg-gray-50 rounded-lg p-1.5 hover:bg-gray-100 transition-colors border border-gray-200">
                <button onClick={() => toggleTask(task.id)} className={`w-4 h-4 rounded-sm border ${task.completed ? "bg-blue-500 border-blue-500" : "border-blue-500"} flex items-center justify-center mr-2`}>
                  {task.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <span className={`text-sm text-gray-800 flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.text}</span>
                <button onClick={() => deleteTask(task.id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-0.5 rounded transition-colors ml-2" aria-label="Delete task">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Card = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
    <div className="flex items-center">{icon}</div>
    <div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  </div>
);

export default HomeBody;






