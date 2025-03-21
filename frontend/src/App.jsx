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
import EditProfileAdmin from "./Administrateur/component/EditProfileAdmin";
import Home from "./Administrateur/Pages/Home";
import DocumentationAdmin from "./Administrateur/Pages/DocumentationAdmin";

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


function App() {
  return (
    <>
    <Routes>

       <Route path="/" element={<Login />} />
       <Route path="/adminhome" element={<Home />} />   
       <Route path="/clients" element={<ClientsPage />} />
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/editClient/:id" element={<EditClient/>}/>
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route path="/edit/:id" element={<EditProject/>}/>
       <Route path="/edit/:id" element={<EditProject />} />
       <Route path="/addProjet" element={<AddProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
       <Route path="/create-task" element= {<AddTaches/>} />
       <Route path="/tasks/:id/edit" element={<EditTaches />} />

       <Route path="/Profile" element= {<ProfilePage/>} />
       
       <Route path="/edit-task/:id" element= {<EditTaches/>} />
       <Route path="/editProfileAdmin" element= {<EditProfileAdmin/>} /> 

       <Route path="/documentationAdmin" element= {<DocumentationAdmin/>} /> 
       <Route path="/users" element= {<UserPage/>} /> 



          {/* route chef de projet  */}
      <Route path="/managerdashboard" element= {<HomeChefProjet/>} />
      <Route path="/profile/chefProjet" element= {<ProfilePageCf/>} />
      <Route path="/projects/ChefProjet" element= {<ProjectChefProjet/>} />
      <Route path="/add_project" element= {<Add_Project_ChefProjet/>} />
      <Route path="/addProjet" element={<AddProject/>}/>
      <Route path="/clients/ChefProjet" element={<ClientProjetCf/>}/>
      <Route path="/chat/ChefProjet" element={<MessagesPage/>}/>
      <Route path="/add_clients" element={<AddClientChef/>}/>
      <Route path="/tasks/ChefProjet" element={<TachesProjetCf/>}/>
      <Route path="/create-task" element={<AddTskCf/>}/>
      <Route path="/tasks/edit/:id" element={<EditTaskCf/>}/>
      <Route path="/team/ChefProjet" element={<MembreEquipe/>}/>
      <Route path="/documentation" element={<Documentation/>}/>
      <Route path="/edit-project/:id" element={<EditerProchetCf/>}/>
      <Route path="/editProfile/chefProjet" element={<EditProfileCf/>}/>

    </Routes>
    </>
  )
}

export default App