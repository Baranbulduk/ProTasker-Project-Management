import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Members.css";

function ManagerMembers({ projectId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/members/${projectId}/members`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleRemoveMember = async (memberId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/members/${projectId}/members/${memberId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== memberId)
      );
      alert("Member removed successfully!");
    } catch (error) {
      console.error(
        "Error removing member:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to remove member");
    }
  };

  return (
    <>
      <div>
        <table className="members-table-container">
          <thead className="members-table-header">
            <tr className="members-table-header-title-container">
              <th className="members-table-header-title">Name</th>
              <th className="members-table-header-title">Email</th>
              <th className="members-table-header-title">Role</th>
              <th className="members-table-header-title">Actions</th>
            </tr>
          </thead>
          <tbody className="members-table-body">
            {members.map((member) => (
              <tr
                key={member._id}
                className="members-table-body-title-container"
              >
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <button
                    className="actions-button remove-button"
                    onClick={() => handleRemoveMember(member._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManagerMembers;
