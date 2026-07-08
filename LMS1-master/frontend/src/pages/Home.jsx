import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">

      

      <section className="hero">

        
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>

        <div className="hero-content">

          <span className="tag">
            🚀 India's Modern Learning Management Platform
          </span>

          <h1>
            Upgrade Your <span>Skills</span>
            <br />
            Build Your
            <br />
            Dream Career
          </h1>

          <p>
            Learn from industry experts with interactive courses,
            practical projects, quizzes, certifications and career-ready
            training—all in one modern learning platform.
          </p>

          <div className="hero-buttons">

            <Link
              to="/student/courses"
              className="primary-btn"
            >
              Explore Courses
            </Link>

            <Link
              to="/register"
              className="secondary-btn"
            >
              Join Free
            </Link>

          </div>

        </div>

      </section>

      

      <section className="stats">

        <div className="stat">
          <h2>250+</h2>
          <p>Premium Courses</p>
        </div>

        <div className="stat">
          <h2>15K+</h2>
          <p>Active Students</p>
        </div>

        <div className="stat">
          <h2>120+</h2>
          <p>Expert Mentors</p>
        </div>

        <div className="stat">
          <h2>98%</h2>
          <p>Placement Success</p>
        </div>

      </section>

      

      <section className="features">

        <h2>Why Students Love MyLMS</h2>

        <div className="feature-grid">

          <div className="card">

            <h3>📚 Interactive Courses</h3>

            <p>
              Learn through videos, coding exercises,
              assignments, quizzes and real-world projects
              designed by experienced instructors.
            </p>

          </div>

          <div className="card">

            <h3>👨‍🏫 Expert Mentors</h3>

            <p>
              Get guidance from professional mentors
              with years of industry experience and
              practical knowledge.
            </p>

          </div>

          <div className="card">

            <h3>📈 Progress Tracking</h3>

            <p>
              Monitor your learning progress,
              completed lessons, quiz scores and
              overall performance in one dashboard.
            </p>

          </div>

          <div className="card">

            <h3>🏆 Certificates</h3>

            <p>
              Receive certificates after successfully
              completing courses and showcase them
              in your professional portfolio.
            </p>

          </div>

          <div className="card">

            <h3>💻 Learn Anywhere</h3>

            <p>
              Continue learning seamlessly from
              desktop, tablet or smartphone
              whenever you want.
            </p>

          </div>

          <div className="card">

            <h3>⚡ Career Focused</h3>

            <p>
              Master practical skills that help
              you prepare for internships,
              placements and technical interviews.
            </p>

          </div>

        </div>

      </section>
           

      <section className="categories">

        <h2>Explore Popular Categories</h2>

        <div className="category-grid">

          <div>
            💻
            <br />
            Web Development
          </div>

          <div>
            📱
            <br />
            App Development
          </div>

          <div>
            🤖
            <br />
            Artificial Intelligence
          </div>

          <div>
            ☁️
            <br />
            Cloud Computing
          </div>

          <div>
            🎨
            <br />
            UI / UX Design
          </div>

          <div>
            🐍
            <br />
            Python Programming
          </div>

          <div>
            📊
            <br />
            Data Science
          </div>

          <div>
            🔐
            <br />
            Cyber Security
          </div>

        </div>

      </section>

      

      <section className="testimonial">

        <h2>What Our Students Say</h2>

        <div className="reviews">

          <div className="review">

            <p>
              "MyLMS completely changed the way I learn.
              The projects and quizzes helped me become
              job-ready."
            </p>

            <span>⭐⭐⭐⭐⭐</span>

            <br />

            <strong>Rahul Kumar</strong>

          </div>

          <div className="review">

            <p>
              "The instructors explain concepts very clearly.
              I landed my internship after completing the
              Full Stack course."
            </p>

            <span>⭐⭐⭐⭐⭐</span>

            <br />

            <strong>Priya Sharma</strong>

          </div>

          <div className="review">

            <p>
              "Beautiful interface, excellent content and
              practical learning. Highly recommended for
              every student."
            </p>

            <span>⭐⭐⭐⭐⭐</span>

            <br />

            <strong>Akash Reddy</strong>

          </div>

        </div>

      </section>

      

      <section className="cta">

        <h2>Ready To Start Learning?</h2>

        <p>
          Join thousands of students who are upgrading
          their skills and building successful careers
          with MyLMS.
        </p>

        <Link
          to="/register"
          className="primary-btn"
        >
          Start Learning Today
        </Link>

      </section>

      

      
    </div>
  );
}