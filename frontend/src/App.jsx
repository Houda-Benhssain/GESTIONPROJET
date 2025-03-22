import React from "react";
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
import Home from "./Administrateur/Pages/Home";
import DocumentationAdmin from "./Administrateur/Pages/DocumentationAdmin";
import DetailClient from "./Administrateur/component/DetailClient";
import SettingProfile from "./Administrateur/Pages/SettingProfile";
import DetailClientCF from "./ChefProjet/component/DtailClientCF";

// chef de projet
import HomeChefProjet from "./ChefProjet/Pages/BodyChefProjet";
import ProfilePageCf from "./ChefProjet/Pages/ProfileChefProjet";
import Login from "./Administrateur/Pages/Login";
import ProjectChefProjet from "./ChefProjet/Pages/ProjetChefProjet";
import Add_Project_ChefProjet from "./ChefProjet/component/AddProjectChef";
import EditerProchetCf from "./ChefProjet/component/EditeProjetCf";
import ClientProjetCf from "./ChefProjet/Pages/ClientProjetCf";
import MessagesPage from "./ChefProjet/Pages/Messages";
import AddClientChef from "./ChefProjet/component/AddClientChef";
import TachesProjetCf from "./ChefProjet/Pages/TaskProjetCf";
import AddTskCf from "./ChefProjet/component/AddTaskCf";
import EditTaskCf from "./ChefProjet/component/EditeTaskCf";
import MembreEquipe from "./ChefProjet/Pages/MembreEquipe";
import Documentation from "./ChefProjet/component/Documentation";
import EditProfileCf from "./ChefProjet/component/EditProfileCf";
import UserPage from "./Administrateur/Pages/UsersPage";
import EditClientCF from "./ChefProjet/component/EditClientCF";
// Membre Equipe
import HomeEquipe from "./MembreEquipe/Pages/BodyEquipe";
import DocumentationEquipe from "./MembreEquipe/Pages/DocumentationEquipe";
import ProjetEquipe from "./MembreEquipe/Pages/ProjetEquipe";
import TachesEquipe from "./MembreEquipe/Pages/TacheEquipe";
import MessagesEquipe from "./MembreEquipe/Pages/MessageEquipe";
import ProfileEquipe from "./MembreEquipe/Pages/ProfileEquipe";
import EditProfileEquipe from "./MembreEquipe/Pages/SeetingEquipe";


function App() {
  return (
    <>
    <Routes>

      {/* Route Administrateur */}
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<Home />} />   

       {/* <Route path="/" element={<Login />} />
       <Route path="/adminhome" element={<Home />} />    */}

       <Route path="/clients" element={<ClientsPage />} />
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/editClient/:id" element={<EditClient/>}/>
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route path="/edit/:id" element={<EditProject />} />
       <Route path="/addProjet" element={<AddProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
       <Route path="/create-task" element= {<AddTaches/>} />
       <Route path="/tasks/:id/edit" element={<EditTaches />} />
       <Route path="/Profile" element= {<ProfilePage/>} />
      
       <Route path="/edit-task/:id" element= {<EditTaches/>} />
       <Route path="/documentationAdmin" element= {<DocumentationAdmin/>} /> 
       <Route path="/createUser" element= {<UserPage/>} /> 
       <Route path="/DetailClient/:id" element= {<DetailClient/>} /> 
       <Route path="/settings/profile" element= {<SettingProfile/>} /> 
       
          {/* Route chef de projet  */}
      <Route path="/dashboard" element= {<HomeChefProjet/>} />
      <Route path="/profile/chefProjet" element= {<ProfilePageCf/>} />
      <Route path="/projects/ChefProjet" element= {<ProjectChefProjet/>} />
      <Route path="/add_project" element= {<Add_Project_ChefProjet/>} />
      <Route path="/addProjet" element={<AddProject/>}/>
      <Route path="/clients/ChefProjet" element={<ClientProjetCf/>}/>
      <Route path="/editClientCf/:id" element={<EditClientCF/>}/>
      <Route path="/DetailClientCF/:id" element={<DetailClientCF/>}/>
  
      <Route path="/chat/ChefProjet" element={<MessagesPage/>}/>
      <Route path="/add_clients" element={<AddClientChef/>}/>
      <Route path="/tasks/ChefProjet" element={<TachesProjetCf/>}/>
      <Route path="/create-task" element={<AddTskCf/>}/>
      <Route path="/tasks/edit/:id" element={<EditTaskCf/>}/>
      <Route path="/team/ChefProjet" element={<MembreEquipe/>}/>
      <Route path="/documentation" element={<Documentation/>}/>
      <Route path="/edit-project/:id" element={<EditerProchetCf/>}/>
      <Route path="/editProfile/chefProjet" element={<EditProfileCf/>}/>

      {/* Route Membre Equipe */}

      <Route path="/documentation/Equipe" element={<DocumentationEquipe/>}/>
      <Route path="/Home/Equipe" element={<HomeEquipe/>}/>
      <Route path="/projects/Equipe" element={<ProjetEquipe/>}/>
      <Route path="/tache/Equipe" element={<TachesEquipe/>}/>
      <Route path="/chat/Equipe" element={<MessagesEquipe/>}/>
      <Route path="/profile/Equipe" element={<ProfileEquipe/>}/>
      <Route path="/SettingProfile/Equipe" element={<EditProfileEquipe/>}/>
     

    </Routes>
    </>
  )
}

export default App