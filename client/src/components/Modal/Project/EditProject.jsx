import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Modal.css";

function EditProject({ show, onClose, project, onUpdate }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (project) {
      setProjectTitle(project.name || "");
      setDescription(project.description || "");
      setStartDate(project.startDate ? project.startDate.split("T")[0] : "");
      setEndDate(project.endDate ? project.endDate.split("T")[0] : "");
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/projects/${project._id}`,
        {
          projectTitle,
          description,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Project updated:", response.data);
      onUpdate(response.data);
      onClose();
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    }
  };

  const handleCloseOverlay = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleCloseOverlay}>
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal-title">Edit Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="modal-section">
              <label>Project Name</label>
              <input
                className="modal-input"
                type="text"
                name="name"
                value={projectTitle}
                placeholder="Enter project name"
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <div className="modal-section">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-section-date-container">
              <div className="modal-section-date">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="modal-section-date">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-button-container">
              <button className="modal-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
