import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.error("Failed to fetch members.");
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
      toast.success("Member removed successfully!");
    } catch (error) {
      console.error(
        "Error removing member:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to remove member");
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
      <ToastContainer />
    </>
  );
}

export default ManagerMembers;
