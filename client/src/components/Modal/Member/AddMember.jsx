import React, { useState } from "react";
import axios from "axios";
import "../Modal.css";

function AddMember({ show, onClose, onMemberAdded, projectId }) {
    const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/members/add-member",
        {
          email,
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onMemberAdded(response.data.user);
      alert("Member added successfully!");
      setEmail(""); // Rensa fältet
      onClose(); // Stäng modalen
    } catch (error) {
      console.error("Error adding member:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add member");
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
        <h2 className="modal-title">Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-section">
            <label>Email</label>
            <input
            className="modal-input"
              type="email"
              placeholder="Enter user's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-button-container">
          <button className="modal-button" type="submit">Add Member</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default AddMember;
