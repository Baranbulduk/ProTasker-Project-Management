import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        const response = await axios.get(
          "http://localhost:3000/projects/assigned",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProjects(response.data);
        console.log("Fetched projects:", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects.");
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
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.response?.data?.message || "Failed to delete project");
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
          <div
            key={project._id}
            className="dashboard-card"
            onClick={() => handleViewTasks(project._id)}
          >
            <div className="dashboard-card-header">
              <div>
              <h2 className="dashboard-card-title">{project.projectTitle}</h2>
              </div>
              <div className="dashboard-card-button-container">
              <button
                className="dashboard-card-button edit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(project);
                }}
              >
                Edit
              </button>
              <button
                className="dashboard-card-button remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(project._id);
                }}
              >
                Remove
              </button>
              </div>
            </div>
            <div className="dashboard-card-body">
              <p>
                <strong>Description:</strong> {project.description}
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
      <ToastContainer />
    </div>
  );
}

export default ManagerDashboard;
