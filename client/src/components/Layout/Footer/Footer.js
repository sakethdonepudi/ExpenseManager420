import React from "react";
import "./Footer.css"; // Import the footer-specific CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* Replace with your actual logo image if desired */}
          <img src="/assets/logo.png" alt="Logo" />
        </div>
        <div className="footer-text">
          <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
