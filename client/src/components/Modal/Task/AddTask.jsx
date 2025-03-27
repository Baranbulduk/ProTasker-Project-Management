import React, { useState } from "react";
import axios from "axios";
import "../Modal.css";

function AddTask({ show, onClose, projectId, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

// Användaren ska kunna skriva members username i samma projekt för att assigna en task till dem. //

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
    } catch (error) {
      console.error("Error creating task:", error.response || error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h2>Add Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Task Name:</label>
              <input
                type="text"
                name="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Assigned To:</label>
              <input
                type="text"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Status:</label>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
