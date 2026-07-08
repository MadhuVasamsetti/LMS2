import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { courseService } from "../services/courseService";
import "../styles/Dashboard.css";

export default function Dashboard() {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {

    async function loadDashboard() {

      const allCourses = await courseService.getAll();

      setCourses(allCourses);

      if (user?.role === "STUDENT") {

        const data =
          await courseService.getEnrollmentsForStudent(user.id);

        setEnrollments(data);

      } else {

        const data =
          await courseService.getAllEnrollments();

        setEnrollments(data);

      }

    }

    loadDashboard();

  }, [user]);

  return (

    <div className="dashboard">

      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="hero-left">

          <span className="dashboard-tag">
            🚀 Welcome Back
          </span>

          <h1>

            Hello,

            <span> {user?.name}</span>

          </h1>

          <p>

            Continue your learning journey and
            achieve your goals with MyLMS.

          </p>

        </div>

        <div className="hero-right">

          <div className="floating-card">

            <h2>📚 {courses.length}</h2>

            <span>Total Courses</span>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="icon">
            📘
          </div>

          <div>

            <h2>{courses.length}</h2>

            <p>Available Courses</p>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon">
            🎓
          </div>

          <div>

            <h2>{enrollments.length}</h2>

            <p>

              {user?.role === "STUDENT"
                ? "My Enrollments"
                : "Total Enrollments"}

            </p>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon">
            👤
          </div>

          <div>

            <h2>{user?.role}</h2>

            <p>User Role</p>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon">
            ⭐
          </div>

          <div>

            <h2>98%</h2>

            <p>Learning Progress</p>

          </div>

        </div>

      </section>
            {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-grid">

          {user?.role === "STUDENT" ? (

            <>

              <Link
                to="/student/courses"
                className="action-card"
              >
                <div className="action-icon">
                  📚
                </div>

                <h3>Browse Courses</h3>

                <p>
                  Explore and enroll in the latest courses.
                </p>
              </Link>

              <Link
                to="/student/grades"
                className="action-card"
              >
                <div className="action-icon">
                  📊
                </div>

                <h3>My Grades</h3>

                <p>
                  Check your latest grades and performance.
                </p>
              </Link>

              <Link
                to="/profile"
                className="action-card"
              >
                <div className="action-icon">
                  👤
                </div>

                <h3>Profile</h3>

                <p>
                  Manage your profile and account settings.
                </p>
              </Link>

            </>

          ) : (

            <>

              <Link
                to="/admin/manage-courses"
                className="action-card"
              >
                <div className="action-icon">
                  📚
                </div>

                <h3>Manage Courses</h3>

                <p>
                  Create, edit and organize courses.
                </p>
              </Link>

              <Link
                to="/admin/manage-students"
                className="action-card"
              >
                <div className="action-icon">
                  👨‍🎓
                </div>

                <h3>Manage Students</h3>

                <p>
                  View student details and manage enrollments.
                </p>
              </Link>

              <Link
                to="/profile"
                className="action-card"
              >
                <div className="action-icon">
                  ⚙️
                </div>

                <h3>Profile</h3>

                <p>
                  Update your administrator profile.
                </p>
              </Link>

            </>

          )}

        </div>

      </section>

      {/* ================= DASHBOARD OVERVIEW ================= */}

      <section className="overview">

        <h2>Dashboard Overview</h2>

        <div className="overview-grid">

          <div className="overview-card">

            <h3>🚀 Learning Status</h3>

            <p>
              Stay consistent and complete your learning
              milestones to unlock new opportunities.
            </p>

          </div>

          <div className="overview-card">

            <h3>📈 Performance</h3>

            <p>
              Track your progress, course completion,
              grades and overall achievements.
            </p>

          </div>

          <div className="overview-card">

            <h3>🏆 Achievements</h3>

            <p>
              Complete courses to earn certificates
              and strengthen your professional profile.
            </p>

          </div>

        </div>

      </section>
            {/* ================= LEARNING PROGRESS ================= */}

      <section className="progress-section">

        <h2>Your Progress</h2>

        <div className="progress-wrapper">

          <div className="progress-card">

            <div className="progress-header">

              <h3>Overall Progress</h3>

              <span>98%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: "98%" }}
              ></div>

            </div>

            <p>
              Keep learning every day to achieve your career goals.
            </p>

          </div>

          <div className="progress-card">

            <h3>🔥 Daily Motivation</h3>

            <p>

              "Success doesn't come from what you do occasionally.
              It comes from what you do consistently."

            </p>

          </div>

        </div>

      </section>

      {/* ================= RECENT ACTIVITY ================= */}

      <section className="activity-section">

        <h2>Recent Activity</h2>

        <div className="activity-list">

          <div className="activity-item">
            <span>📘</span>
            <div>
              <h4>Courses Available</h4>
              <p>
                {courses.length} courses are currently available.
              </p>
            </div>
          </div>

          <div className="activity-item">
            <span>🎓</span>
            <div>
              <h4>Enrollments</h4>
              <p>
                {enrollments.length}{" "}
                {user?.role === "STUDENT"
                  ? "courses enrolled."
                  : "total enrollments."}
              </p>
            </div>
          </div>

          <div className="activity-item">
            <span>👤</span>
            <div>
              <h4>Current Role</h4>
              <p>{user?.role}</p>
            </div>
          </div>

        </div>

      </section>

      {/* ================= MOTIVATION BANNER ================= */}

      <section className="motivation-banner">

        <h2>
          🌟 Keep Learning. Keep Growing.
        </h2>

        <p>

          Every lesson you complete today brings you
          one step closer to your dream career.

        </p>

        {user?.role === "STUDENT" ? (

          <Link
            to="/student/courses"
            className="dashboard-btn"
          >
            Continue Learning →
          </Link>

        ) : (

          <Link
            to="/admin/manage-courses"
            className="dashboard-btn"
          >
            Manage Courses →
          </Link>

        )}

      </section>

    </div>

  );

}