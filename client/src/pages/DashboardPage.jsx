import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";
import HeaderDashboard from "../components/Header/HeaderDashboard.jsx/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard.jsx/FooterDashboard";
import "../styles/DashboardPage.css";

function DashboardPage() {
  return (
    <>
      <HeaderDashboard />
      <div className="dashboard-header">
        <h1>Hi, Name!</h1>
      </div>
      <div className="app-wrapper">
        <div className="dashboard-body">
          <h1>Projects</h1>
          <button className="dashboard-button">Add Project</button>
        </div>
        <AdminDashboard />
        {/*<ManagerDashboard />*/}
        {/*<EmployerDashboard />*/}
      </div>
      <FooterDashboard />
    </>
  );
}

export default DashboardPage;
