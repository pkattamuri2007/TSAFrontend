import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Calc from "./Pages/Calc";
import Home from "./Pages/Home";

// OPEN AI CONFIGURATION

//DEFINING USER INPUTTED ARRAY

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/calculate" element={<Calc />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
