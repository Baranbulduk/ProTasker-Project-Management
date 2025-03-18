import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login/Login.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Tasks from "./pages/Tasks.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword.jsx";
import UpdatePassword from "./components/Auth/UpdatePassword/UpdatePassword.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;