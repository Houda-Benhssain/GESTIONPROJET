import React from "react";
import { Routes,Route } from "react-router-dom";
import EditProfile from "./Administrateur/Pages/SettingProfile";
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
<<<<<<< HEAD
import DetailClientCF from "./ChefProjet/component/DtailClientCF";
import DetailReunion from "./Administrateur/Pages/DetailReuion";
=======
import HomepageAdmin from "./Administrateur/Pages/HomePageAdmin";
>>>>>>> c077959f328c92d01affe27a85b24fca8bebb763


// chef de projet
import HomeChefProjet from "./ChefProjet/Pages/BodyChefProjet";
import ProfilePageCf from "./ChefProjet/Pages/ProfileChefProjet";
import Login from "./Administrateur/Pages/Login";
import ProjectChefProjet from "./ChefProjet/Pages/ProjetChefProjet";
import AddProjectcf from "./ChefProjet/component/AddProjectChef";
import EditerProchetCf from "./ChefProjet/component/EditeProjetCf";
import ClientProjetCf from "./ChefProjet/Pages/ClientProjetCf";
import MessagesPage from "./ChefProjet/Pages/Messages";
import AddClientChef from "./ChefProjet/component/AddClientChef";
import TachesProjetCf from "./ChefProjet/Pages/TaskProjetCf";
import AddTskCf from "./ChefProjet/component/AddTaskCf";
import MembreEquipe from "./ChefProjet/Pages/MembreEquipe";
import Documentation from "./ChefProjet/component/Documentation";
import EditProfileCf from "./ChefProjet/component/EditProfileCf";
import UserPage from "./Administrateur/Pages/UsersPage";
import EditClientCF from "./ChefProjet/component/EditClientCF";
import EditerTaches from "./ChefProjet/component/EditerTache";
import AddReunions from "./Administrateur/Pages/AddReunionAdmin";
import AddReunionsCF from "./ChefProjet/Pages/AddReunionCF";
<<<<<<< HEAD
import DetailReunionPageCF from "./ChefProjet/Pages/DetailReunionCF";
=======
import DetailClientCF from "./ChefProjet/component/DtailClientCF";
import EditTachesCF from "./ChefProjet/component/EditeTaskCf";
>>>>>>> c077959f328c92d01affe27a85b24fca8bebb763


// Membre Equipe
import HomeEquipe from "./MembreEquipe/Pages/BodyEquipe";
import DocumentationEquipe from "./MembreEquipe/Pages/DocumentationEquipe";
import ProjetEquipe from "./MembreEquipe/Pages/ProjetEquipe";
import TachesEquipe from "./MembreEquipe/Pages/TacheEquipe";
import MessagesEquipe from "./MembreEquipe/Pages/MessageEquipe";
import ProfileEquipe from "./MembreEquipe/Pages/ProfileEquipe";
import EditProfileEquipe from "./MembreEquipe/Pages/SeetingEquipe";
import HomePageEquipe from "./MembreEquipe/Pages/HomePageEquipe";
// Client
import ClientDashboard from "./Clients.jsx/Pages/BodyClient";
import Payment from "./Clients.jsx/Pages/Payment";
import ProjectClient from "./Clients.jsx/Pages/ProjetClient";
import DocumentationClient from "./Clients.jsx/Pages/DocumentationClient";
import TacheClient from "./Clients.jsx/Pages/TacheClient";
import ProfileClient from "./Clients.jsx/Pages/ProfileClient";
import ParametreProfile from "./Clients.jsx/Pages/ParametreProfile";
import Homepage from "./Clients.jsx/Pages/HomePage";
import HomePageCf from "./ChefProjet/Pages/HomePageCf";
<<<<<<< HEAD
import TimelinePage from "./Clients.jsx/Pages/Timeline";
=======
import DetailProject from "./Administrateur/component/DetailsProjects";
import AddTaskProjectid from "./Administrateur/component/AddTaskProjectid";
>>>>>>> c077959f328c92d01affe27a85b24fca8bebb763

function App() {
  return (
    <>
    <Routes>

      {/* Route Administrateur */}
       {/* <Route path="/login" element={<Login />} />
       <Route path="/" element={<Home />} />    */}

       <Route path="/" element={<Login />} />
       <Route path="/adminhome" element={<Home />} />   

       <Route path="/HomePageAdmine" element={<HomepageAdmin />} />
       <Route path="/clients" element={<ClientsPage />} />
       <Route path="/add" element={<AddClientPage/>} />
       <Route path="/editClient/:id" element={<EditClient/>}/>
       <Route path="/projects" element={<ProjectsPage/>} />
       <Route path="/edit/:id" element={<EditProject />} />
       <Route path="/addProjet" element={<AddProject/>}/>
       <Route path="/tasks" element={<TasksPage/>} />
       <Route path="/create-task" element= {<AddTaches/>} />
       <Route path="/tasks/:id" element={<EditTaches />} />
       <Route path="/Profile" element= {<ProfilePage/>} />
       <Route path="/edit-task/:id" element= {<EditTaches/>} />
       <Route path="/editProfileAdmin" element= {<EditProfile/>} /> 

       <Route path="/documentationAdmin" element= {<DocumentationAdmin/>} /> 
       <Route path="/users" element= {<UserPage/>} /> 

       



          {/* route chef de projet  */}
      <Route path="/managerdashboard" element= {<HomeChefProjet/>} />
       <Route path="/documentationAdmin" element= {<DocumentationAdmin/>} /> 
       <Route path="/createUser" element= {<UserPage/>} /> 
       <Route path="/DetailClient/:id" element= {<DetailClient/>} /> 
       <Route path="/settings/profile" element= {<SettingProfile/>} /> 
       <Route path="/AddReunionAdmin" element= {<AddReunions/>} /> 
       <Route path="/DetailReunion/:id" element= {<DetailReunion/>} /> 
       

       
          {/* Route chef de projet  */}
      <Route path="/HomePageCF" element= {<HomePageCf/>} />
      <Route path="/dashboard" element= {<HomeChefProjet/>} />
      <Route path="/profile/chefProjet" element= {<ProfilePageCf/>} />
      <Route path="/projects/ChefProjet" element= {<ProjectChefProjet/>} />
      <Route path="/addProjetCf" element= {<AddProjectcf/>} />
      <Route path="/clients/ChefProjet" element={<ClientProjetCf/>}/>
      <Route path="/editClientCf/:id" element={<EditClientCF/>}/>
      <Route path="/edit-project/:id" element={<EditerProchetCf/>}/>
      <Route path="/tasks/edit/:id" element={<EditerTaches/>}/>
      <Route path="/chat/ChefProjet" element={<MessagesPage/>}/>
      <Route path="/add_clients" element={<AddClientChef/>}/>
      <Route path="/tasks/ChefProjet" element={<TachesProjetCf/>}/>
      <Route path="/create-task-cf" element={<AddTskCf/>}/>
      <Route path="/tasks/edit/:id" element={<EditerTaches/>}/>
      <Route path="/team/ChefProjet" element={<MembreEquipe/>}/>
      <Route path="/documentation" element={<Documentation/>}/>
      <Route path="/editProfile/chefProjet" element={<EditProfileCf/>}/>
      <Route path="/AddRéunionCF" element={<AddReunionsCF/>}/>
<<<<<<< HEAD
      <Route path="/DetailReunionCf/:id" element={<DetailReunionPageCF/>}/>
=======
      <Route path="/DetailClientCF/:id" element={<DetailClientCF />} />
      <Route path="/EditTachesCf/:id" element={<EditTachesCF />} />
      <Route path="/detailsProjet/:id" element={<DetailProject />} />
      <Route path="/addTaskProject" element={<AddTaskProjectid />} />
      

>>>>>>> c077959f328c92d01affe27a85b24fca8bebb763

      {/* Route Membre Equipe */}

      <Route path="/documentation/Equipe" element={<DocumentationEquipe/>}/>
      <Route path="/memberdashboard" element={<HomeEquipe/>}/>
      <Route path="/projects/Equipe" element={<ProjetEquipe/>}/>
      <Route path="/tache/Equipe" element={<TachesEquipe/>}/>
      <Route path="/chat/Equipe" element={<MessagesEquipe/>}/>
      <Route path="/profile/Equipe" element={<ProfileEquipe/>}/>
      <Route path="/SettingProfile/Equipe" element={<EditProfileEquipe/>}/>
      <Route path="/HomePageEquipe" element={<HomePageEquipe/>}/>

      {/* Route client  */}
      <Route path="/Home" element={<Homepage/>}/>
      <Route path="/dashboard/Client" element={<ClientDashboard/>}/>
      <Route path="/payments/client" element={<Payment/>}/>
      <Route path="/projects/client" element={<ProjectClient/>}/>
      <Route path="/documentation/client" element={<DocumentationClient/>}/>
      <Route path="/tasks/client" element={<TacheClient/>}/>
      <Route path="/profile/client" element={<ProfileClient/>}/>
      <Route path="/Parametre/client" element={<ParametreProfile/>}/>
      <Route path="/timeline/client" element={<TimelinePage/>}/>

     


    </Routes>
    </>
  )
}

export default App