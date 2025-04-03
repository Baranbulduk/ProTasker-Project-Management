import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTask from "../Modal/Task/EditTask";
import "./Tasks.css";

function AdminTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
              <th className="tasks-table-header-title">Latest Change</th>
              <th className="tasks-table-header-title">Status</th>
              <th className="tasks-table-header-title">Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tasks-table-body">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id} className="tasks-table-body-title-container">
                <td>{task.taskName}</td>
                <td>{task.creator ? task.creator.username : "Unknown"}</td>
                <td>
                  {task.assignedTo
                    ? task.assignedTo.username
                    : "No Assigned Member!"}
                </td>
                <td>
                  {task.updatedAt && new Date(task.updatedAt).toLocaleString()}
                </td>
                <td>
                    <span>{task.status}</span>
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
            ))
          ) : (
            <tr>
              <td colSpan="6">No tasks found</td>
            </tr>
          )}
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
