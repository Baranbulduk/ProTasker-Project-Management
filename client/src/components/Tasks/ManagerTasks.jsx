import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTask from "../Modal/Task/EditTask";
import DeleteTask from "../Modal/Task/DeleteTask";
import "./Tasks.css";
import { getColorFromId } from "../../utils/color";

function ManagerTasks({ projectId, tasks, setTasks }) {
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
        toast.error("Failed to fetch tasks. Please try again later.");
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
              <div key={task._id} className="tasks-card">
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
            <h3 className="no-projects-message">No tasks found</h3>
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          toastStyle={{
            color: "#000",
            fontSize: "16px",
            borderRadius: "10px",
            backgroundColor: "#f4f4f4",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </>
  );
}

export default ManagerTasks;
