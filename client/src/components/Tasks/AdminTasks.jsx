/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTask from "../Modal/Task/EditTask";
import DeleteTask from "../Modal/Task/DeleteTask";
import "./Tasks.css";

function AdminTasks({ projectId, tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
        toast.error("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleTaskDeleted = (deletedId) => {
    setTasks(tasks.filter((task) => task._id !== deletedId));
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
                  <td className="tasks-table-body-title">{task.taskName}</td>
                  <td className="tasks-table-body-title">{task.creator ? task.creator.username : "Unknown"}</td>
                  <td  className="tasks-table-body-title">
                    {task.assignedTo
                      ? task.assignedTo.username
                      : "No Assigned Member!"}
                  </td>
                  <td className="tasks-table-body-title">
                    {task.updatedAt && 
                      new Date(task.updatedAt).toLocaleString()}
                  </td>
                  <td className="tasks-table-body-title">
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
                      onClick={() => handleDeleteClick(task)}
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
            toast.success("Task updated successfully!");
          }}
        />
        <DeleteTask
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          task={taskToDelete}
          onDeleted={handleTaskDeleted}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminTasks;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTask from "../Modal/Task/EditTask";
import DeleteTask from "../Modal/Task/DeleteTask";
import "./Tasks.css";
import { getColorFromId } from "../../utils/color";

function AdminTasks({ projectId, tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
        toast.error("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleTaskDeleted = (deletedId) => {
    setTasks(tasks.filter((task) => task._id !== deletedId));
  };

  return (
    <>
      <div>
        <main className="tasks-container">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="tasks-card"
              >
                <div className="tasks-card-header">
                  <h2 className="tasks-card-title">{task.taskName}</h2>
                  <div className="tasks-card-button-container">
                    <button
                      className="tasks-card-button edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(task);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="tasks-card-button remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(task);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="tasks-body-header">
                  <strong>Created by</strong>{" "}
                  {task.creator ? (
                    <span
                      className="tasks-color-member"
                      style={{
                        backgroundColor: getColorFromId(task.creator._id),
                      }}
                    >
                      {task.creator.username.toUpperCase()}
                    </span>
                  ) : (
                    <p>
                      <strong>Created by</strong> Unknown
                    </p>
                  )}
                </div>
                <div className="tasks-card-body">
                  <div className="tasks-card-description">
                    <p>{task.description || "No description available"}</p>
                  </div>
                  <div className="tasks-card-members-container">
                    <div>
                      <p className="tasks-card-subheading">
                        <strong>Assigned to</strong>
                      </p>
                      {task.assignedTo ? (
                        <span
                          className="tasks-color-member"
                          style={{
                            backgroundColor: getColorFromId(
                              task.assignedTo._id
                            ),
                          }}
                        >
                          {task.assignedTo.username.toUpperCase()}
                        </span>
                      ) : (
                        "No Assigned Member!"
                      )}
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p className="tasks-card-subheading">
                        <strong>Latest change</strong>
                      </p>
                      <p className="tasks-card-dates">
                        {task.updatedAt
                          ? new Date(task.updatedAt).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="tasks-card-subheading">
                      <strong>Status</strong>
                    </p>
                    <p className="tasks-card-status"> {task.status}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects-message">No tasks found</p>
          )}
        </main>
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
            toast.success("Task updated successfully!");
          }}
        />
        <DeleteTask
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          task={taskToDelete}
          onDeleted={handleTaskDeleted}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default AdminTasks;
