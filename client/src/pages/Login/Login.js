import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Prevent login for already logged-in user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      {loading && <Spinner />}
      <div className="login-form-container">
        <h1>Expense Tracker</h1>
        <p className="login-subtitle">Welcome back, login to manage your expenses</p>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <div className="login-footer">
            <Link to="/register" className="register-link">Not a user? Click here to register</Link>
            <button type="submit" className="login-btn">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
