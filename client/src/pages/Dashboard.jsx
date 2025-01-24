import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";
import HeaderDashboard from "../components/Header/HeaderDashboard.jsx/HeaderDashboard";
import FooterDashboard from "../components/Footer/FooterDashboard.jsx/FooterDashboard";

function Dashboard() {
  return (
    <>
      <HeaderDashboard />
      <h1>Dashboard</h1>
      <AdminDashboard />
      <ManagerDashboard />
      <EmployerDashboard />
      <FooterDashboard />
    </>
  );
}

export default Dashboard;
