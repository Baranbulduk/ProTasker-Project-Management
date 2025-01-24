import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployerDashboard from "../components/Dashboard/EmployerDashboard";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <AdminDashboard />
      <ManagerDashboard />
      <EmployerDashboard />
    </>
  );
}

export default Dashboard;
