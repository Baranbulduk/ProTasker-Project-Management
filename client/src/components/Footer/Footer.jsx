import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} ProTasker | Created by Baran Bulduk & Abdihakim Faizal.</p>
    </footer>
  );
};

export default Footer;