import React, { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import "./Tasks.css";
import { getColorFromId, darkenColor } from "../../utils/color";

function EmployerTasks({ projectId, tasks, setTasks }) {
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
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks.");
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
      toast.success("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
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
                </div>
                <div className="tasks-body-header">
                  <strong>Created by</strong>{" "}
                  {task.creator ? (
                    <span
                      className="tasks-color-member"
                      style={{
                        background: `linear-gradient(135deg, ${getColorFromId(
                          task.creator._id
                        )} 0%, ${darkenColor(
                          getColorFromId(task.creator._id),
                          30
                        )} 100%)`,
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
                            background: `linear-gradient(135deg, ${getColorFromId(
                              task.assignedTo._id
                            )} 0%, ${darkenColor(
                              getColorFromId(task.assignedTo._id),
                              30
                            )} 100%)`,
                          }}
                        >
                          {task.assignedTo._id === user._id
                            ? "YOU"
                            : task.assignedTo.username.toUpperCase()}
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
                  <p className="tasks-card-subheading">
                    <strong>Status</strong>
                  </p>
                  <div>
                    {task.assignedTo && task.assignedTo._id === user._id ? (
                      <select
                        className="tasks-card-status-select"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task, e.target.value)
                        }
                      >
                        <option value="Begin">Begin</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span
                        className={`tasks-card-status status-${task.status.toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 className="no-projects-message">No tasks found</h3>
          )}
        </main>
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

export default EmployerTasks;
