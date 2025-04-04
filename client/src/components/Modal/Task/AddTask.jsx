import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Modal.css";

function AddTask({ show, onClose, projectId, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!assignedTo) {
        alert("Please enter a username to assign the task.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          taskName,
          description,
          status,
          assignedTo,
          project_id: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTaskAdded(response.data);
      onClose();
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error creating task:", error.response || error);
      toast.error("Failed to add task. Please try again.");
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
          <h2 className="modal-title">Add Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="modal-section">
              <label>Task Name</label>
              <input
                className="modal-input"
                type="text"
                name="taskName"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="modal-section">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-section">
              <label>Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                placeholder="Enter username"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>
            <div className="modal-section">
              <label>Status</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Begin">Begin</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="modal-button-container">
              <button className="modal-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTask;
