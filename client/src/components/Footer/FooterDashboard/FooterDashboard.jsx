import React from "react";
import "./FooterDashboard.css";

function FooterDashboard() {
  return (
    <footer className="footer-dashboard">
      <p className="footer-text">© {new Date().getFullYear()} ProTasker | Created by Baran Bulduk & Abdihakim Faizal.</p>
    </footer>
  );
};

export default FooterDashboard;