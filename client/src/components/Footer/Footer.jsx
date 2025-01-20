import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} ProTasker | Created by Abdihakim Faizal & Baran Bulduk.</p>
    </footer>
  );
};

export default Footer;