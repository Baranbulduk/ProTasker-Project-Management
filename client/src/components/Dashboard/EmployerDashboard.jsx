import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function EmployerDashboard() {
  const [projects, setProjects] = useState([]);
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
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects.");
      }
    };

    fetchProjects();
  }, []);

  const handleViewTasks = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  return (
    <div>
      <main className="dashboard-container">
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="dashboard-card" onClick={() => handleViewTasks(project._id)}>
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">{project.projectTitle}</h2>
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
        ))
      ) : (
        <div className="no-projects-message">No projects assigned to you.</div>
      )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default EmployerDashboard;
