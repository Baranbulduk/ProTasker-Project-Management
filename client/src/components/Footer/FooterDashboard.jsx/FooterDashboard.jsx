import React from "react";
import "./FooterDashboard.css";

function FooterDashboard() {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} ProTasker | Created by Abdihakim Faizal & Baran Bulduk.</p>
    </footer>
  );
};

export default FooterDashboard;