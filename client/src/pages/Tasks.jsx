import AdminTasks from "../components/Tasks/AdminTasks";
import ManagerTasks from "../components/Tasks/ManagerTasks";
import EmployerTasks from "../components/Tasks/EmployerTasks";
import AdminMembers from "../components/Members/AdminMembers";
import ManagerMembers from "../components/Members/ManagerMembers";
import EmployerMembers from "../components/Members/EmployerMembers";
import HeaderDashboard from "../components/Header/HeaderDashboard/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard/FooterDashboard";
import "../styles/Tasks.css";

import TasksIcon from "../assets/tasks.png";
import MembersIcon from "../assets/members.png";
// import TasksIconActive from "../assets/tasks-active.png";
// import employersIconActive from "../assets/employers-active.png";

function Tasks() {
  return (
    <>
      <HeaderDashboard />
      <div className="tasks-header">
        <h2>Project Name</h2>
      </div>
      <div className="app-wrapper">
        <div className="tasks-body">
          <div className="tasks-menu-button-container">
            <button className="tasks-menu-button">
              <img className="tasks-menu-button-icon" src={TasksIcon} alt="tasks" />
              Tasks
            </button>
            <button className="tasks-menu-button">
              <img
                className="tasks-menu-button-icon"
                src={MembersIcon}
                alt="employers"
              />
              employers
            </button>
          </div>
          <button className="tasks-button">Add Task</button>
        </div>
        <AdminTasks />
        <ManagerTasks />
        <EmployerTasks />

        <AdminMembers />
        <ManagerMembers />
        <EmployerMembers />
      </div>
      <FooterDashboard />
    </>
  );
}

export default Tasks;
