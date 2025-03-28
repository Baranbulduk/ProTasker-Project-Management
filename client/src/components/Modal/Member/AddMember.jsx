import React, { useState } from "react";
import axios from "axios";
import "../Modal.css";

function AddMember({ show, onClose, onMemberAdded }) {
    const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/members/add-member",
        {
          email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onMemberAdded(response.data.user);
  
    } catch (error) {
      console.error(
        "Error adding member:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add member");
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
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter user's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Member</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default AddMember;
