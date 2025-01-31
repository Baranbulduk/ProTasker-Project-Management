import React from "react";
import "./Tasks.css";

function EmployerTasks() {
  return (
    <>
      <div>
        <table className="tasks-table-container">
          <thead className="tasks-table-header">
            <tr className="tasks-table-header-title-container">
              <th className="tasks-table-header-title">Title</th>
              <th className="tasks-table-header-title">Assigned To</th>
              <th className="tasks-table-header-title">Created</th>
              <th className="tasks-table-header-title-status">
                <div className="tasks-table-header-title">Status</div>
                <div className="tasks-table-header-title">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody className="tasks-table-body">
            <tr className="tasks-table-body-title-container">
              <td>Task 1</td>
              <td>Description 1</td>
              <td>Deadline 1</td>
              <td className="tasks-table-body-container">
                <select className="status-select">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button className="actions-button edit-button">Edit</button>
                <button className="actions-button remove-button">Remove</button>
              </td>
            </tr>
            <tr className="tasks-table-body-title-container">
              <td>Task 1</td>
              <td>Description 1</td>
              <td>Deadline 1</td>
              <td className="tasks-table-body-container">
                <select className="status-select">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
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

export default EmployerTasks;
