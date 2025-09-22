import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    nav("/"); // redirect to Home after logout
    setMenuOpen(false);
  }

  function handleLinkClick() {
    setMenuOpen(false); // close menu when a link is clicked
  }

  return (
    <nav className="navbar">
      {/* Left side - Brand */}
      <div className="navbar-left">
        <Link to="/" className="brand" onClick={handleLinkClick}>
          MyLMS
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links - collapse on mobile */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <div className="navbar-center">
          {/* Always show */}
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
          

          {/* Student links */}
          {user?.role === "STUDENT" && (
            <>
              <Link to="/student/courses" onClick={handleLinkClick}>
                Courses
              </Link>
              <Link to="/dashboard" onClick={handleLinkClick}>
                Dashboard
              </Link>
              <Link to="/profile" onClick={handleLinkClick}>
                Profile
              </Link>
            </>
          )}

          {/* Admin links */}
          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin/grades-review" onClick={handleLinkClick}>
                Grades Review
              </Link>
              <Link to="/admin/manage-courses" onClick={handleLinkClick}>
                Manage Courses
              </Link>
              <Link to="/admin/manage-students" onClick={handleLinkClick}>
                Manage Students
              </Link>
            </>
          )}
        </div>

        <div className="navbar-right">
          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-login"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-ghost">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
