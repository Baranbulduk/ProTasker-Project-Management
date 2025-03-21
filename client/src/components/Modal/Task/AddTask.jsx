import React, { useState } from "react";
import axios from "axios";
import "../Modal.css";

function AddTask({ show, onClose, projectId, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          taskName,
          description,
          deadline,
          assigned_to: assignedTo,
          project_id: projectId, // Skicka project_id
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
      console.error("Error creating task:", error);
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
                required
              ></textarea>
            </div>
            <div>
              <label>Deadline:</label>
              <input
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;