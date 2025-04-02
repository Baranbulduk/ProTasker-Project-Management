import React, { useState } from "react";
import axios from "axios";
import "../Modal.css";

function AddProject({ show, onClose }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/projects",
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
      console.log("Project added:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding project:", error);
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
          <h2>Add Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="modal-section">
              <label>Project Name</label>
              <input
              className="modal-input"
                type="text"
                name="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <div className="modal-section">
              <label>Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="modal-section">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="modal-section">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="modal-button-container">
            <button className="modal-button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
