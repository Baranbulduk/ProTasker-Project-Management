import React from "react";
import "./Tasks.css";

function AdminTasks() {
  return (
    <div>
      <h2>Admin Tasks</h2>
      <main>
        <thead className="table-header">
          <tr>
            <th>Title</th>
            <th>Assigned to</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Task 1</td>
            <td>Description 1</td>
            <td>Deadline 1</td>
            <td>Status 1</td>
            <td><button>Edit</button></td>
            <td><button>Remove</button></td>
          </tr>
        </tbody>
      </main>
    </div>
  );
}

export default AdminTasks;
