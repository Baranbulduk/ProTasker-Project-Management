import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Modal.css";

function DeleteTask({ show, onClose, task, onDeleted }) {
  const [loading, setLoading] = useState(false);

  if (!show || !task) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted successfully!");
      onDeleted(task._id);
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal-title">Confirm Delete</h2>
          <p>
            Are you sure you want to delete <strong>{task.taskName}</strong>?
          </p>
          <div className="delete-modal-button-container">
            <button className="cancel-modal-button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="delete-modal-button"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
