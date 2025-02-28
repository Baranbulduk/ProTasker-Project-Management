import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";
import HeaderDashboard from "../components/Header/HeaderDashboard.jsx/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard.jsx/FooterDashboard";
import "../styles/DashboardPage.css";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  console.log("User in DashboardPage:", user);

  if (!user) {
    return <div>Please log in to access your dashboard</div>;
  }
  const renderDashboardRole = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "employer":
        return <EmployerDashboard />;
      default:
        return <p>Unauthorized</p>;
    }
  };

  return (
    <>
      <HeaderDashboard />
      <div className="dashboard-header">
        <h2>Hi, {user.username}!</h2>
      </div>
      <div className="app-wrapper">
        <div className="dashboard-body">
          <h1>Projects</h1>
          <button className="dashboard-button">Add Project</button>
        </div>
        {renderDashboardRole()}
      </div>
      <FooterDashboard />
    </>
  );
}

export default DashboardPage;