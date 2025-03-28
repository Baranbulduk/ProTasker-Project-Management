import React, { useState, useEffect } from "react";
import axios from "axios";
import EditMember from "../Modal/Member/EditMember";
import "./Members.css";

function AdminMembers({ projectId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/projects/${projectId}/members`,
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
                  <button className="actions-button edit-button">Edit</button>
                  <button className="actions-button remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditMember />
      </div>
    </>
  );
}

export default AdminMembers;
