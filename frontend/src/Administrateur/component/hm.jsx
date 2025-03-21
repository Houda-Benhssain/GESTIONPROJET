import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import imagePlanIt from "../../Image/imagePlanIt.jpg";
import DocumentationAdmin from "../Pages/DocumentationAdmin";
import { CheckCircle, FileEdit, FileText, X } from "lucide-react";

const HomeBody = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [projects, setProjects] = useState([]);
  const [summary, setSummary] = useState({ created: 0, updated: 0, completed: 0 });

  useEffect(() => {
    fetch("URL_DE_TON_API/projets")
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
      if (project.statut === "fini" && updatedAt && updatedAt >= sevenDaysAgo) completedCount++;
    });

    setSummary({ created: createdCount, updated: updatedCount, completed: completedCount });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Summary</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card icon={<CheckCircle className="h-4 w-4 text-green-600" />} title={`${summary.completed} completed`} description="in the last 7 days" />
            <Card icon={<FileEdit className="h-4 w-4 text-blue-600" />} title={`${summary.updated} updated`} description="in the last 7 days" />
            <Card icon={<FileText className="h-4 w-4 text-purple-600" />} title={`${summary.created} created`} description="in the last 7 days" />
          </div>
        </div>

        {welcomeVisible && (
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Introduction</h2>
              <button onClick={() => setWelcomeVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <img src={imagePlanIt} alt="Welcome illustration" className="max-w-full h-auto max-h-48" />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to PlanIt</h3>
                <p className="text-gray-700 mb-3">
                  New to PlanIt? Check out the <a href="/documentationAdmin" className="text-blue-600 hover:underline">Documentation</a>.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="w-full md:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-base font-bold mb-3 text-gray-800">To Do List</h2>
          <form onSubmit={handleSubmit} className="mb-3 w-full max-w-md">
            <div className="flex items-center gap-1">
              <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Entrer une tâche..." className="flex-1 bg-gray-100 text-gray-800 px-2 py-1.5 text-sm rounded-l border border-gray-300 focus:outline-none" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-r">Ajouter</button>
            </div>
          </form>

          <div className="space-y-1.5 w-full max-w-md">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center bg-gray-50 rounded-lg p-1.5 border border-gray-200">
                <button onClick={() => toggleTask(task.id)} className="w-4 h-4 border border-blue-500 mr-2">
                  {task.completed && <CheckCircle className="h-3.5 w-3.5 text-blue-500" />}
                </button>
                <span className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{task.text}</span>
                <button onClick={() => deleteTask(task.id)} className="ml-2 text-red-600">
                  <X className="h-4 w-4" />
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
  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">{icon}{title}{description}</div>
);

export default HomeBody;