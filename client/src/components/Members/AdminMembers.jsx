import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteMember from "../Modal/Member/DeleteMember";
import { getColorFromId, darkenColor } from "../../utils/color";
import "./Members.css";

function AdminMembers({ projectId, members, setMembers }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                <div
                  className="members-card-header"
                  style={{
                    background: `linear-gradient(135deg, ${getColorFromId(
                      member._id
                    )} 0%, ${darkenColor(
                      getColorFromId(member._id),
                      30
                    )} 100%)`,
                  }}
                >
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
            <h3 className="no-members-message">No members found.</h3>
          )}
        </main>
        <DeleteMember
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          member={selectedMember}
          projectId={projectId}
          onDeleted={handleMemberDeleted}
        />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          toastStyle={{
            color: "#000",
            fontSize: "16px",
            borderRadius: "10px",
            backgroundColor: "#f4f4f4",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </>
  );
}
export default AdminMembers;
