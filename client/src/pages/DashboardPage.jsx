import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";
import HeaderDashboard from "../components/Header/HeaderDashboard/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard/FooterDashboard";
import AddProject from "../components/Modal/Project/AddProject";
import { useAuth } from "../context/AuthContext";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (!user) {
    return null;
  }

  console.log("User in DashboardPage:", user);

  const renderDashboardRole = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard projects={projects} setProjects={setProjects} />;
      case "manager":
        return (
          <ManagerDashboard projects={projects} setProjects={setProjects} />
        );
      case "employer":
        return (
          <EmployerDashboard projects={projects} setProjects={setProjects} />
        );
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

  // Refresh the page when a new project is added
  const handleProjectAdded = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <>
      <HeaderDashboard />
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-header-title">
            <span style={{ color: "#969696", fontWeight: "400" }}>Hi, </span>
            {user.username}!
          </h1>
        </div>
      </div>
      <div className="app-wrapper">
        <div className="dashboard-body">
          <div className="dashboard-menu-container">
            <h1 className="dashboard-title">Projects</h1>
            {(user.role === "admin" || user.role === "manager") && (
              <button className="dashboard-button" onClick={handleAddProject}>
                Add Project
              </button>
            )}
          </div>
        </div>
        {renderDashboardRole()}
      </div>
      <FooterDashboard />
      <AddProject
        show={showModal}
        onClose={handleCloseAddProject}
        onProjectAdded={handleProjectAdded}
      />
    </>
  );
}

export default DashboardPage;
