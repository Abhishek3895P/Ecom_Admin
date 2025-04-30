import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Protector from "./controllers/protector/Protector";
import Login from "./login/Login";
import Index from "./main/Index";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Protector Component={Index}/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default App;
