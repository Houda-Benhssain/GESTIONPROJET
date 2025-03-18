import React from "react";
import Home from "./Administrateur/Pages/Home";
import Login from "./Administrateur/Pages/Login";
import { Routes,Route } from "react-router-dom";
import ClientsPage from "./Administrateur/Pages/Clients";
import AddClientPage from "./Administrateur/component/AddClient";
import ProjectsPage from "./Administrateur/Pages/Projets";
import EditProject from "./Administrateur/component/EditeProject";
import TasksPage from "./Administrateur/Pages/Tasks";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/client" element={<ClientsPage />} />
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route  path="/edit/:id" element={<EditProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
    </Routes>
    </>
  )
}

export default App