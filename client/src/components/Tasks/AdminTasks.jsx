import React from "react";
import "./Tasks.css";

function AdminTasks() {
  return (
    <div>
      <h2>Admin Tasks</h2>
      <table className="table-container">
        <thead className="table-header">
          <tr className="table-header-title">
            <th>Title</th>
            <th>Assigned to</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="table-body-title">
            <td>Task 1</td>
            <td>Description 1</td>
            <td>Deadline 1</td>
            <td>
              <select>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td className="table-body-button">
              <button>Edit</button>
              <button>Remove</button>
            </td>
          </tr>
          <tr className="table-body-title">
            <td>Task 1</td>
            <td>Description 1</td>
            <td>Deadline 1</td>
            <td>
              <select>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td className="table-body-button">
              <button>Edit</button>
              <button>Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminTasks;
