import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditProject from "../Modal/Project/EditProject";
import "./Dashboard.css";

function ManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/projects/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Deleting project with ID: ${projectId}`);
      await axios.delete(`http://localhost:3000/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((project) => project._id !== projectId));
      console.log(`Project with ID: ${projectId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(
      projects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
  };

  const handleViewTasks = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  return (
    <div>
      <main className="dashboard-container">
        {projects.map((project) => (
          <div key={project._id} className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>{project.projectTitle}</h2>
              <button onClick={() => handleEditClick(project)}>Edit</button>
              <button onClick={() => handleDeleteClick(project._id)}>
                Delete
              </button>
              <button onClick={() => handleViewTasks(project._id)}>
                View
              </button>
            </div>
            <div className="dashboard-card-body">
              <p>
                <strong>Description:</strong> {project.description}
              </p>
              <p>
                <strong>Tasks:</strong>{" "}
                {/* Lägg till logik för att visa uppgifter */}
              </p>
              <p>
                <strong>Employers:</strong>{" "}
                {/* Lägg till logik för att visa arbetsgivare */}
              </p>
            </div>
          </div>
        ))}
      </main>
      <EditProject
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={selectedProject}
        onUpdate={handleUpdateProject}
      />
    </div>
  );
}

export default ManagerDashboard;
