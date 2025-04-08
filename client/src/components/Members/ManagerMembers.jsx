import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteMember from "../Modal/Member/DeleteMember";
import "./Members.css";

function ManagerMembers({ projectId, members, setMembers }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleMemberDeleted = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== memberId)
    );
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
            {Array.isArray(members) && members.length > 0 ? (
              members.map((member) => (
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
                      onClick={() => handleDeleteClick(member)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-members-message">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <DeleteMember
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          member={selectedMember}
          projectId={projectId}
          onDeleted={handleMemberDeleted}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default ManagerMembers;
