import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminTasks from "../components/Tasks/AdminTasks";
import ManagerTasks from "../components/Tasks/ManagerTasks";
import EmployerTasks from "../components/Tasks/EmployerTasks";
import AdminMembers from "../components/Members/AdminMembers";
import ManagerMembers from "../components/Members/ManagerMembers";
import EmployerMembers from "../components/Members/EmployerMembers";
import HeaderDashboard from "../components/Header/HeaderDashboard/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard/FooterDashboard";
import AddTask from "../components/Modal/Task/AddTask";
import AddMember from "../components/Modal/Member/AddMember";
import { useAuth } from "../context/AuthContext";
import "../styles/TasksPage.css";

import TasksIcon from "../assets/tasks.png";
import MembersIcon from "../assets/members.png";
import TasksIconActive from "../assets/tasks-active.png";
import MembersIconActive from "../assets/members-active.png";

function TasksPage() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [view, setView] = useState("tasks");
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const { projectId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const matchedProject = response.data.find(
          (proj) => proj._id === projectId
        );

        if (matchedProject) {
          setProject(matchedProject);
        } else {
          console.error("Project not found");
        }

      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!user) {
    return <div>Please log in to access your tasks</div>;
  }

  const renderTasksRole = () => {
    switch (user.role) {
      case "admin":
        return <AdminTasks projectId={projectId} tasks={tasks} />;
      case "manager":
        return <ManagerTasks projectId={projectId} tasks={tasks} />;
      case "employer":
        return <EmployerTasks projectId={projectId} tasks={tasks} />;
      default:
        return <p>Unauthorized</p>;
    }
  };

  const renderMembersRole = () => {
    switch (user.role) {
      case "admin":
        return <AdminMembers projectId={projectId} members={members} />;
      case "manager":
        return <ManagerMembers projectId={projectId} members={members} />;
      case "employer":
        return <EmployerMembers projectId={projectId} members={members} />;
      default:
        return <p>Unauthorized</p>;
    }
  };

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const handleCloseAddTask = () => {
    setShowTaskModal(false);
  };

  const handleAddMember = () => {
    setShowMemberModal(true);
  };

  const handleCloseAddMember = () => {
    setShowMemberModal(false);
  };

  const handleMemberAdded = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  return (
    <>
      <HeaderDashboard />
      <div className="tasks-header">
        <h2>{project ? project.projectTitle : "Loading..."}</h2>
      </div>
      <div className="app-wrapper">
        <div className="tasks-body">
          <div className="tasks-menu-container">
            <div className="tasks-menu-button-container">
              <button
                className={`tasks-menu-button ${
                  view === "tasks" ? "active" : ""
                }`}
                onClick={() => setView("tasks")}
              >
                <img
                  className="tasks-menu-button-icon"
                  src={view === "tasks" ? TasksIconActive : TasksIcon}
                  alt="tasks"
                />
                Tasks
              </button>
              <button
                className={`tasks-menu-button ${
                  view === "members" ? "active" : ""
                }`}
                onClick={() => setView("members")}
              >
                <img
                  className="tasks-menu-button-icon"
                  src={view === "members" ? MembersIconActive : MembersIcon}
                  alt="members"
                />
                Members
              </button>
            </div>
            {view === "tasks" && (
              <button className="tasks-button" onClick={handleAddTask}>
                Add Task
              </button>
            )}
            {view === "members" && (
              <button className="tasks-button" onClick={handleAddMember}>
                Add Member
              </button>
            )}
          </div>
        </div>
        {view === "tasks" && renderTasksRole()}
        {view === "members" && renderMembersRole()}
      </div>
      <FooterDashboard />
      <AddTask
        show={showTaskModal}
        onClose={handleCloseAddTask}
        projectId={projectId}
        onTaskAdded={(newTask) => {
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }}
      />
      <AddMember
        show={showMemberModal}
        onClose={handleCloseAddMember}
        onMemberAdded={handleMemberAdded}
        projectId={projectId}
      />
    </>
  );
}

export default TasksPage;
