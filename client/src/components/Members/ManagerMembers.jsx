import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteMember from "../Modal/Member/DeleteMember";
import { getColorFromId } from "../../utils/color";
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
      <main className="members-container">
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <div key={member._id} className="members-card">
                <div className="members-card-header" style={{ backgroundColor: getColorFromId(member._id) }}>
                  <h2 className="members-card-title">{member.username}</h2>
                  <div className="members-card-button-container">
                    <button
                      className="members-card-button remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(member);
                      }}
                    >
                      Remove
                    </button>
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
