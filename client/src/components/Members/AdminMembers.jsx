import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditMember from "../Modal/Member/EditMember";
import { useAuth } from "../../context/AuthContext";
import "./Members.css";

function AdminMembers({ projectId }) {
  const [members, setMembers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { user } = useAuth();

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
        toast.error("Failed to fetch members.");
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleMemberUpdated = (updatedMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
    toast.success("Member information updated!");
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedMember(null);
  };

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
      toast.error(error.response?.data?.message || "Failed to remove member.");
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
                  {user && user._id === member._id && (
                    <button
                      className="actions-button edit-button"
                      onClick={() => handleEditMember(member)}
                    >
                      Edit
                    </button>
                  )}
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
        <EditMember
          show={showEditModal}
          onClose={handleCloseEditModal}
          member={selectedMember}
          onMemberUpdated={handleMemberUpdated}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminMembers;
