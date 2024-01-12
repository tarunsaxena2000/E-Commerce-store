
import React from "react";
import "./App.css";
import Navbar from './components/Navbar';
import { Home } from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";


function App() {
  return (
    <>
     <Navbar/>

      <Routes>
      <Route  path="/" element={<Register></Register>} />
      <Route  path="/register" element={<Register></Register>} />
      <Route  path="/login" element={<Login></Login>} />
      <Route   path="/home" element={<Home></Home>} />
    
     
      </Routes>
     
    </>
  );
}

export default App;
