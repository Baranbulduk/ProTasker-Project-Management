import React from "react";
import "./Members.css";

function Adminemployers() {
  return (
    <>
      <div>
        <table className="employers-table-container">
          <thead className="employers-table-header">
            <tr className="employers-table-header-title-container">
              <th className="employers-table-header-title">Name</th>
              <th className="employers-table-header-title">Email</th>
              <th className="employers-table-header-title">Role</th>
              <th className="employers-table-header-title">Actions</th>
            </tr>
          </thead>
          <tbody className="employers-table-body">
            <tr className="employers-table-body-title-container">
              <td>employer 1</td>
              <td>employer1@example.com</td>
              <td>Admin</td>
              <td>
                <button className="actions-button edit-button">Edit</button>
                <button className="actions-button remove-button">Remove</button>
              </td>
            </tr>
            <tr className="employers-table-body-title-container">
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
