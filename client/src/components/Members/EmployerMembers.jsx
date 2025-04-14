import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditMember from "../Modal/Member/EditMember";
import { useAuth } from "../../context/AuthContext";
import { getColorFromId } from "../../utils/color";
import "./Members.css";

function EmployerMembers({ projectId, members, setMembers }) {
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
    toast.success("Member information updated successfully!");
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedMember(null);
  };

  return (
    <>
      <div>
        <main className="members-container">
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <div key={member._id} className="members-card">
                <div className="members-card-header" style={{ backgroundColor: getColorFromId(member._id) }}>
                  <h2 className="members-card-title">{member.username}</h2>
                  <div className="members-card-button-container">
                    {user && user._id === member._id && (
                      <button
                        className="members-card-button edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMember(member);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <div className="members-card-body">
                  <div>
                    <p className="members-card-subheading">
                      <strong>Email</strong>
                    </p>
                    <p className="members-card-dates">{member.email}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="members-card-subheading">
                      <strong>Role</strong>
                    </p>
                    <p className="members-card-dates">{member.role}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-members-message">No members found.</p>
          )}
        </main>
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

export default EmployerMembers;
