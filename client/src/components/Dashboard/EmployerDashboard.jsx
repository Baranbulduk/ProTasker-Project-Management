import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getColorFromId } from "../../utils/color";
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
              <div className="dashboard-body-header">
                <strong>Created by</strong>{" "}
                {project.creator ? (
                  <span
                    className="dashboard-color-member"
                    style={{
                      backgroundColor: getColorFromId(project.creator._id),
                    }}
                  >
                    {project.creator.username.toUpperCase()}
                  </span>
                ) : (
                  <p>
                    <strong>Created by</strong> Unknown
                  </p>
                )}
              </div>
              <div className="dashboard-card-body">
                <div>
                  <p className="dashboard-card-description">
                    {project.description || "No description available"}
                  </p>
                </div>
                <div className="dashboard-card-members-container">
                  <div className="dashboard-card-members">
                    {project.members
                      .filter((member) => member._id !== project.creator?._id)
                      .slice(0, 5)
                      .map((member, index) => (
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
                    {project.members.filter(
                      (member) => member._id !== project.creator?._id
                    ).length > 5 && (
                      <span className="dashboard-card-member extra-members">
                        +{project.members.length - 5}
                      </span>
                    )}
                  </div>
                  <div>
                    {project.startDate && project.endDate && (
                      <p className="dashboard-card-dates">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
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
