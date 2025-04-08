import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "../Modal/Project/EditProject";
import DeleteProject from "../Modal/Project/DeleteProject";
import "./Dashboard.css";

function AdminDashboard({ projects, setProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
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

  const handleUpdateProject = (updatedProject) => {
    setProjects(
      projects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleProjectDeleted = (deletedId) => {
    setProjects(projects.filter((project) => project._id !== deletedId));
  };

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
                <div>
                  <h2 className="dashboard-card-title">
                    {project.projectTitle}
                  </h2>
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
                      handleDeleteClick(project);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="dashboard-card-body">
                <p>
                  <strong>Description</strong> {project.description}
                </p>
                <p>
                  <strong>Members</strong>{" "}
                  {Array.isArray(project.members) && project.members.length > 0
                    ? project.members.map((member, index) => (
                        <span key={member._id || index}>
                          {member.username}
                          {index < project.members.length - 1 && ", "}
                        </span>
                      ))
                    : "No members assigned"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects-message">No projects available</p>
        )}
      </main>
      <EditProject
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={selectedProject}
        onUpdate={handleUpdateProject}
      />
      <DeleteProject
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        project={projectToDelete}
        onDeleted={handleProjectDeleted}
      />
      <ToastContainer />
    </div>
  );
}

export default AdminDashboard;
