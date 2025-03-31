import React, { useState , useEffect } from "react";
import axios from "axios";
import "../Modal.css";

function EditMember({ show, onClose, member, onMemberUpdated }) {
if (!show || !member) {
    return null; // Rendera ingenting om modalen inte ska visas eller om `member` är null
  }

  const [username, setUsername] = useState(member.username || "");
  const [email, setEmail] = useState(member.email || "");


  useEffect(() => {
    if (member) {
      setUsername(member.username || "");
      setEmail(member.email || "");
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/members/${member._id}`,
        { username, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onMemberUpdated(response.data.user);
      alert("Member updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating member:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update member");
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
          <h2>Edit Member</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMember;