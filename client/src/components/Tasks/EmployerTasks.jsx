import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Tasks.css";

function EmployerTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/tasks?project_id=${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Employer's projects:", user.projects);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleStatusChange = async (task, newStatus) => {
    try {
      // Kontrollera om den inloggade användaren är tilldelad tasken
      if (task.assignedTo && task.assignedTo._id !== user._id) {
        alert("You are not authorized to update the status of this task.");
        return;
      }

      const token = localStorage.getItem("token");
      const updatedTask = { ...task, status: newStatus };

      await axios.patch(
        `http://localhost:3000/tasks/${task._id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Current projectId:", projectId);

      // Uppdatera taskens status i state
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
      alert("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
    }
  };

  return (
    <>
      <div>
        <table className="tasks-table-container">
          <thead className="tasks-table-header">
            <tr className="tasks-table-header-title-container">
              <th className="tasks-table-header-title">Title</th>
              <th className="tasks-table-header-title">Created By</th>
              <th className="tasks-table-header-title">Assigned To</th>
              <th className="tasks-table-header-title">Date Created</th>
              <th className="tasks-table-header-title">Status</th>
              <th className="tasks-table-header-title">Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tasks-table-body">
            {tasks.map((task) => (
              <tr key={task._id} className="tasks-table-body-title-container">
                <td>{task.taskName}</td>
                <td>{task.creator ? task.creator.username : "Unknown"}</td>
                <td>
                  {task.assignedTo
                    ? task.assignedTo.username
                    : "No Assigned Member!"}
                </td>
                <td>
                  {task.createdAt && new Date(task.createdAt).toLocaleString()}
                </td>
                <td>
                  {task.assignedTo && task.assignedTo._id === user._id ? (
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task, e.target.value)}
                    >
                      <option value="begin">Begin</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span>{task.status}</span>
                  )}
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployerTasks;
