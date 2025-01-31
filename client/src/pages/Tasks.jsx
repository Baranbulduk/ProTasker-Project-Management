import AdminTasks from "../components/Tasks/AdminTasks";
import ManagerTasks from "../components/Tasks/ManagerTasks";
import EmployerTasks from "../components/Tasks/EmployerTasks";
import AdminMembers from "../components/Members/AdminMembers";
import ManagerMembers from "../components/Members/ManagerMembers";
import EmployerMembers from "../components/Members/EmployerMembers";
import HeaderDashboard from "../components/Header/HeaderDashboard.jsx/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard.jsx/FooterDashboard";
import "../styles/Tasks.css";

function Tasks() {
  return (
    <>
      <HeaderDashboard />
      <div className="tasks-header">
        <h1>Project Name</h1>
      </div>
      <div className="app-wrapper">
        <div className="tasks-body">
          <div className="tasks-menu-button-container">
          <button className="tasks-menu-button">Tasks</button>
          <button className="tasks-menu-button">Members</button>
          </div>
          <button className="tasks-button">Add Task</button>
        </div>
        <AdminTasks />
        {/*<ManagerTasks />
        <EmployerTasks />*/}
        
        <AdminMembers />
        {/*
        <ManagerMembers />
        <EmployerMembers />*/}
      </div>
      <FooterDashboard />
    </>
  );
}

export default Tasks;
