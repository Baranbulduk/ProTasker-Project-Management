import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Modal.css";

function EditTask({ show, onClose, task, onUpdate }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName || "");
      setDescription(task.description || "");
      setDeadline(task.deadline || "");
      setAssignedTo(task.assignedTo || "");
      setStatus(task.status || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/tasks/${task._id}`,
        {
          taskName,
          description,
          deadline,
          assignedTo,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task updated:", response.data);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h2>Edit Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Task Name:</label>
              <input
                type="text"
                name="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label>Deadline:</label>
              <input
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Assigned To:</label>
              <input
                type="text"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;