import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Brand */}

      <Link
        to="/"
        className="brand"
        onClick={closeMenu}
      >
        MyLMS
      </Link>

      {/* Mobile Menu */}

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>

        <div className="navbar-center">

          {/* Before Login */}

          {!user && (
            <>
              <Link
                to="/student/courses"
                onClick={closeMenu}
              >
                Courses
              </Link>
            </>
          )}

          {/* Student */}

          {user?.role === "STUDENT" && (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <Link
                to="/student/courses"
                onClick={closeMenu}
              >
                Courses
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </>
          )}

          {/* Admin */}

          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/admin/manage-courses"
                onClick={closeMenu}
              >
                Manage Courses
              </Link>

              <Link
                to="/admin/manage-students"
                onClick={closeMenu}
              >
                Manage Students
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </>
          )}

        </div>

        <div className="navbar-right">

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">
                Hi, {user.name}
              </span>

              <button
                className="btn btn-ghost"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}