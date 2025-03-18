import React from "react";
import Home from "./Administrateur/Pages/Home";
import Login from "./Administrateur/Pages/Login";
import { Routes,Route } from "react-router-dom";
import ClientsPage from "./Administrateur/Pages/Clients";
import AddClientPage from "./Administrateur/component/AddClient";
import ProjectsPage from "./Administrateur/Pages/Projets";
import EditProject from "./Administrateur/component/EditeProject";
import TasksPage from "./Administrateur/Pages/Tasks";
import EditClient from "./Administrateur/component/EditeClient";
import AddProject from "./Administrateur/component/AddProjet";
import AddTaches from "./Administrateur/component/AddTaches";
import EditTaches from "./Administrateur/component/EditTache";

function App() {
  return (
    <>
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/clients" element={<ClientsPage />} />
=======

      <Route path="/adminhome" element={<Home />} />
      <Route path="/" element={<Login />} />

      
      <Route path="/client" element={<ClientsPage />} />
>>>>>>> 9254bab80c11dd4f676651952c91521dfb7e6bc7
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/editClient/:id" element={<EditClient/>}/>
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route  path="/edit/:id" element={<EditProject/>}/>
       <Route path="/addProjet" element={<AddProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
<<<<<<< HEAD
       <Route path="/addTache" element= {<AddTaches/>} />
       <Route path="/edit-task/:id" element= {<EditTaches/>} />
=======

>>>>>>> 9254bab80c11dd4f676651952c91521dfb7e6bc7
    </Routes>
    </>
  )
}

export default App