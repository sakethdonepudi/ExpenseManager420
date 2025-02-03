import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import './Header.css';  // Import premium styling for the header

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Expense Tracker</span>
        </Link>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">Reports</Link>
            </li>
            {loginUser && (
              <li className="nav-username">
                <p className="nav-link user-name">{loginUser.name}</p>
              </li>
            )}
            <li className="nav-logout">
              <button className="btn logout-btn" onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
