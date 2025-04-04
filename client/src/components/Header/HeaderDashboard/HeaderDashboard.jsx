import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./HeaderDashboard.css";

function HeaderDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
};

  return (
    <header className="header-dashboard">
      <div>
        <a href="/dashboard">
          <h1 className="header-dashboard-title">ProTasker</h1>
        </a>
      </div>
      <div>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default HeaderDashboard;
