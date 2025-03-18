import React, { useEffect, useState } from "react";
import axios from "axios";
import NewProject from "../Modal/NewProject";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useAuth();

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/projects/${selectedProject._id}`,
        selectedProject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(
        projects.map((project) =>
          project._id === selectedProject._id ? response.data : project
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject({ ...selectedProject, [name]: value });
  };






  return (
    <div>
     <main className="dashboard-container">
        {projects.map((project) => (
          <div key={project._id} className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>{project.name}</h2>
              <button onClick={() => handleEditClick(project)}>Edit</button>
              <button onClick={() => handleDeleteClick(project._id)}>Delete</button>
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
      <NewProject show={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2>Edit Project</h2>
        {selectedProject && (
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Project Name:</label>
              <input
                type="text"
                name="name"
                value={selectedProject.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={selectedProject.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={selectedProject.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={selectedProject.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </NewProject>
    </div>
  );
}

export default AdminDashboard;
