import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Modal.css";

function EditTask({ show, onClose, task, onUpdate }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName || "");
      setDescription(task.description || "");
      setAssignedTo(task.assignedTo || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        taskName,
        description,
        assignedTo,
      };

      const response = await axios.patch(
        `http://localhost:3000/tasks/${task._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(response.data);
      onClose();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
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
          <h2 className="modal-title">Edit Task</h2>
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
                type="email"
                name="assignedTo"
                placeholder="Enter email"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
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

export default EditTask;
