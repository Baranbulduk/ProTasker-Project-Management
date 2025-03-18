import React, { useState } from "react";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";
import HeaderDashboard from "../components/Header/HeaderDashboard/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard/FooterDashboard";
import NewProject from "../components/Modal/NewProject";
import { useAuth } from "../context/AuthContext";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return <div>Please log in to access your profile</div>;
  }

  console.log("User in DashboardPage:", user);

  const renderDashboardRole = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "employer":
        return <EmployerDashboard />;
      default:
        return <p>Unauthorized</p>;
    }
  };

  const handleAddProject = () => {
    setShowModal(true);
  };

  const handleCloseAddProject = () => {
    setShowModal(false);
  };

  return (
    <>
      <HeaderDashboard />
      <div className="dashboard-header">
        <h2>Hi, {user.username}!</h2>
      </div>
      <div className="app-wrapper">
        <div className="dashboard-body">
          <h1>Projects</h1>
          {(user.role === "admin" || user.role === "manager") && (
            <button className="dashboard-button" onClick={handleAddProject}>
              Add Project
            </button>
          )}
        </div>
        {renderDashboardRole()}
      </div>
      <FooterDashboard />
      <NewProject show={showModal} onClose={handleCloseAddProject} />
    </>
  );
}

export default DashboardPage;
