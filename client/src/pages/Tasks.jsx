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
      <div className="app-wrapper">
        <h1>Tasks</h1>
        <AdminTasks />
        <ManagerTasks />
        <EmployerTasks />
        <h1>Members</h1>
        <AdminMembers />
        <ManagerMembers />
        <EmployerMembers />
      </div>
      <FooterDashboard />
    </>
  );
}

export default Tasks;
