import React from "react";
import Home from "./Administrateur/Pages/Home";
import Login from "./Administrateur/Pages/Login";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App