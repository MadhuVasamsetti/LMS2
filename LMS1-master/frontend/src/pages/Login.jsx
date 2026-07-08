import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "STUDENT") {
        navigate("/student/courses");
      } else if (user.role === "ADMIN") {
        navigate("/admin/manage-courses");
      }
    }
  }, [user, navigate]);

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1111/auth-api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const loggedInUser = await response.json();

      login(loggedInUser);

      if (loggedInUser.role === "STUDENT") {
        navigate("/student/courses");
      } else if (loggedInUser.role === "ADMIN") {
        navigate("/admin/manage-courses");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">
          Login to continue your learning journey.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}