import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function EmployerDashboard() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

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

  return (
    <div>
      <main className="dashboard-container">
        {projects.map((project) => (
          <div key={project._id} className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>{project.name}</h2>
            </div>
            <div className="dashboard-card-body">
              <p>
                <strong>Description:</strong> {project.description}
              </p>
              <p>
                <strong>Tasks:</strong> {/* Lägg till logik för att visa uppgifter */}
              </p>
              <p>
                <strong>Employers:</strong> {/* Lägg till logik för att visa arbetsgivare */}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default EmployerDashboard;