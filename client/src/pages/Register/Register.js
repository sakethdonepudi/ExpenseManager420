import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      setLoading(false);
      message.success("Registration Successful! Please log in with your credentials.");
      // Redirect to login page after successful registration
      setTimeout(() => navigate("/login"), 2000); // Added delay before redirect
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong. Please try again.");
    }
  };

  // Prevent login for already registered users
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-container">
      {loading && <Spinner />}
      <div className="register-form-container">
        <h1 className="register-title">Expense Tracker</h1>
        <p className="register-subtitle">Join now to track and manage your expenses.</p>
        <Form layout="vertical" onFinish={submitHandler} className="register-form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
            <Input placeholder="Enter your name" className="register-input" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input type="email" placeholder="Enter your email" className="register-input" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input type="password" placeholder="Enter your password" className="register-input" />
          </Form.Item>
          <div className="register-footer">
            <Link to="/login" className="login-link">Already registered? Click here to log in</Link>
            <button type="submit" className="register-btn">Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
