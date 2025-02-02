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
              <th className="tasks-table-header-title">Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tasks-table-body">
            <tr className="tasks-table-body-title-container">
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
              <td></td>
              <td></td>
            </tr>
            <tr className="tasks-table-body-title-container">
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
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployerTasks;
