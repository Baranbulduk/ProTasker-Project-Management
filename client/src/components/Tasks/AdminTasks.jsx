import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import EditTask from "../Modal/Task/EditTask";
import "./Tasks.css";

function AdminTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useAuth();

// Gör så att istället för user id att username visas i tabellen //
  
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
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleStatusChange = async (task, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const updatedTask = { ...task, status: newStatus };

      await axios.put(`http://localhost:3000/tasks/${task._id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Deleting task with ID: ${taskId}`);
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      console.log(`Task with ID: ${taskId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting task:", error);
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
                <td>{user.username}</td>
                <td>{task.assignedTo ? task.assignedTo : "N/A"}</td>
                <td>
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                  >
                    <option value="pending">Begin</option>
                    <option value="in-progress">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button
                    className="actions-button edit-button"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="actions-button remove-button"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditTask
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          task={selectedTask}
          onUpdate={(updatedTask) => {
            setTasks((prevTasks) =>
              prevTasks.map((t) =>
                t._id === updatedTask._id ? updatedTask : t
              )
            );
          }}
        />
      </div>
    </>
  );
}

export default AdminTasks;
