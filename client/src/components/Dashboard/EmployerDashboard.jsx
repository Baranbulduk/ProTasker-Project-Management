import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function EmployerDashboard({ projects, setProjects }) {
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

  const getColorFromId = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
      (hash >> 16) &
      0xff
    )
      .toString(16)
      .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;
    return color;
  };

  return (
    <div>
      <main className="dashboard-container">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="dashboard-card"
              onClick={() => handleViewTasks(project._id)}
            >
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">{project.projectTitle}</h2>
              </div>
              <div className="dashboard-card-body">
                <div>
                  <p className="dashboard-card-description">
                    {project.description || "No description available"}
                  </p>
                </div>
                <div className="dashboard-card-members">
                  {Array.isArray(project.members) &&
                  project.members.length > 0 ? (
                    <>
                      {project.members.slice(0, 10).map((member, index) => (
                        <span
                          className="dashboard-card-member"
                          key={member._id || index}
                          style={{
                            backgroundColor: getColorFromId(member._id),
                          }}
                        >
                          {member.username.charAt(0).toUpperCase()}
                        </span>
                      ))}
                      {project.members.length > 10 && (
                        <span className="dashboard-card-member extra-members">
                          +{project.members.length - 10}
                        </span>
                      )}
                    </>
                  ) : (
                    "No members assigned"
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-projects-message">
            No projects assigned to you.
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default EmployerDashboard;
