import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT"); // default role
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "STUDENT") navigate("/student/courses");
      else if (user.role === "ADMIN") navigate("/admin/manage-courses");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1111/auth-api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const user = await response.json();
      login(user);

      if (user.role === "STUDENT") navigate("/student/courses");
      else if (user.role === "ADMIN") navigate("/admin/manage-courses");
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Invalid email, password, or role");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 🔹 Role selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
