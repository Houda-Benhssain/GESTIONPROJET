import React from "react";
import Home from "./Administrateur/Pages/Home";
import Login from "./Administrateur/Pages/Login";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
      <Route path="/adminhome" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
    </>
  )
}

export default App