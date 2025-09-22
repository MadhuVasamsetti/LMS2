import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

/* Student pages */
import StudentCourses from "./pages/student/Courses";
import CourseDetail from "./pages/student/CourseDetail";
import Grades from "./pages/student/Grades";
import StudentDashboard from "./pages/student/studentdashboard"; // ✅ import here

/* Admin pages */
import ManageCourses from "./pages/admin/ManageCourses";
import ManageStudents from "./pages/admin/ManageStudents";
import GradesReview from "./pages/admin/GradesReview";

import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <ScrollToTop />

      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/courses/:id" element={<CourseDetail />} />
          <Route path="/student/grades" element={<Grades />} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/manage-courses"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-students"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ManageStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/grades-review"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <GradesReview />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
