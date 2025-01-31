import React from "react";
import "./Members.css";

function EmployerMembers() {
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
            <tr className="members-table-body-title-container">
              <td>Member 1</td>
              <td>member1@example.com</td>
              <td>Role 1</td>
              <td>
                <button className="actions-button edit-button">Edit</button>
                <button className="actions-button remove-button">Remove</button>
              </td>
            </tr>
            <tr className="members-table-body-title-container">
              <td>Member 2</td>
              <td>member2@example.com</td>
              <td>Role 2</td>
              <td>
                <button className="actions-button edit-button">Edit</button>
                <button className="actions-button remove-button">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployerMembers;
