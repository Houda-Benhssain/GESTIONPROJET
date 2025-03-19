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
import ProfilePage from "./Administrateur/Pages/Profile";
// chef de projet
import HomeChefProjet from "./ChefProjet/Pages/HomeChefProjet";

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/clients" element={<ClientsPage />} />
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/editClient/:id" element={<EditClient/>}/>
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route path="/edit/:id" element={<EditProject/>}/>
       <Route path="/addProjet" element={<AddProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
       <Route path="/addTache" element= {<AddTaches/>} />
       <Route path="/edit-task/:id" element= {<EditTaches/>} />
       <Route path="/Profile" element= {<ProfilePage/>} />
          {/* route chef de projet  */}
       <Route path="/HomeChefProjet" element= {<HomeChefProjet/>} />

       
       
    </Routes>
    </>
  )
}

export default App