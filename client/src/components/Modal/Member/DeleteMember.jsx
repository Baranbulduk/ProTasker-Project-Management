import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Modal.css";

function DeleteMember({ show, onClose, member, projectId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  if (!show || !member) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/members/${projectId}/members/${member._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Member removed successfully!");
      onDeleted(member._id);
      onClose();
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(error.response?.data?.message || "Failed to remove member.");
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
          <h2 className="modal-title">Confirm Removal</h2>
          <p>
            Are you sure you want to remove <strong>{member.username}</strong> from this project?
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
              {loading ? "Removing..." : "Yes, Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMember;