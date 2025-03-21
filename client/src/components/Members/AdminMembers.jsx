import React from "react";
import EditMember from "../Modal/Member/EditMember";
import "./Members.css";

function Adminemployers() {
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
              <td>employer 1</td>
              <td>employer1@example.com</td>
              <td>Admin</td>
              <td>
                <button className="actions-button edit-button">Edit</button>
                <button className="actions-button remove-button">Remove</button>
              </td>
            </tr>
            <tr className="members-table-body-title-container">
              <td>employer 2</td>
              <td>employer2@example.com</td>
              <td>Admin</td>
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

export default Adminemployers;
