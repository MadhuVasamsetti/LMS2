import React, { useEffect, useState } from "react";
import { courseService } from "../../services/courseService";
import { useAuth } from "../../context/AuthContext";
import "./../../styles/ManageCourses.css";

export default function ManageCourses() {

  const { user } = useAuth();

  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    lessons: 6,

    teacher: user?.name || "Admin"

  });

  useEffect(() => {

    loadCourses();

  }, []);

  async function loadCourses() {

    try {

      setLoading(true);

      const data = await courseService.getAll();

      setCourses(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.name === "lessons"
          ? Number(e.target.value)
          : e.target.value

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (editingId) {

        await courseService.updateCourse(editingId, formData);

        setEditingId(null);

      } else {

        await courseService.addCourse(formData);

      }

      setFormData({

        title: "",

        description: "",

        lessons: 6,

        teacher: user?.name || "Admin"

      });

      loadCourses();

    } catch (err) {

      alert("Unable to save course.");

    }

  }

  function handleEdit(course) {

    setEditingId(course.id);

    setFormData({

      title: course.title,

      description: course.description,

      lessons: course.lessons,

      teacher: course.teacher

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }

  async function handleDelete(id) {

    const ok = window.confirm(
      "Delete this course?"
    );

    if (!ok) return;

    await courseService.deleteCourse(id);

    loadCourses();

  }

  const filteredCourses = courses.filter((course) =>

    course.title.toLowerCase().includes(search.toLowerCase()) ||

    course.description.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="manage-page">

      {/* HERO */}

      <section className="manage-hero">

        <div className="hero-left">

          <span className="hero-tag">
            📚 Admin Control Panel
          </span>

          <h1>
            Manage Your Courses
          </h1>

          <p>

            Create, edit, organize and publish professional
            courses for your students.

          </p>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <h2>{courses.length}</h2>

            <span>Total Courses</span>

          </div>

          <div className="hero-card">

            <h2>{filteredCourses.length}</h2>

            <span>Visible Courses</span>

          </div>

        </div>

      </section>

      {/* SEARCH */}

      <div className="search-box">

        <input

          type="text"

          placeholder="🔍 Search Courses..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />

      </div>

      {/* ADD COURSE FORM */}

      <section className="course-form-card">

        <h2>

          {editingId
            ? "✏️ Update Course"
            : "➕ Create New Course"}

        </h2>

        <form
          className="course-form"
          onSubmit={handleSubmit}
        >

          <input

            name="title"

            placeholder="Course Title"

            value={formData.title}

            onChange={handleChange}

            required

          />

          <textarea

            name="description"

            placeholder="Course Description"

            value={formData.description}

            onChange={handleChange}

            rows="4"

            required

          />
                    <input
            type="number"
            name="lessons"
            min="1"
            placeholder="Number of Lessons"
            value={formData.lessons}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="teacher"
            placeholder="Instructor Name"
            value={formData.teacher}
            onChange={handleChange}
            required
          />

          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {editingId ? "💾 Update Course" : "➕ Add Course"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);

                  setFormData({
                    title: "",
                    description: "",
                    lessons: 6,
                    teacher: user?.name || "Admin"
                  });
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* ==========================
             COURSES SECTION
      ========================== */}

      <section className="courses-section">

        <div className="section-title">

          <h2>Available Courses</h2>

          <p>
            Manage all published courses from here.
          </p>

        </div>

        {loading ? (

          <div className="loading-box">

            <div className="loader"></div>

            <h3>Loading Courses...</h3>

          </div>

        ) : filteredCourses.length === 0 ? (

          <div className="empty-state">

            <h2>📚</h2>

            <h3>No Courses Found</h3>

            <p>
              Try changing your search or add a new course.
            </p>

          </div>

        ) : (

          <div className="courses-grid">

            {filteredCourses.map((course) => (

              <div
                className="course-card"
                key={course.id}
              >

                <div className="course-top">

                  <span className="course-badge">
                    {course.lessons} Lessons
                  </span>

                  <h3>{course.title}</h3>

                  <p>
                    {course.description}
                  </p>

                </div>

                <div className="course-info">

                  <div>
                    👨‍🏫 <strong>{course.teacher}</strong>
                  </div>

                  <div>
                    📖 {course.lessons} Lessons
                  </div>

                </div>

                <div className="course-actions">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(course)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}
                        

          </div>

        )}

      </section>

      {/* ==========================
            DASHBOARD SUMMARY
      ========================== */}

      <section className="dashboard-summary">

        <div className="summary-card">
          <h3>📚 Total Courses</h3>
          <h1>{courses.length}</h1>
          <p>Courses currently available in your LMS.</p>
        </div>

        <div className="summary-card">
          <h3>🔍 Search Results</h3>
          <h1>{filteredCourses.length}</h1>
          <p>Courses matching the current search.</p>
        </div>

        <div className="summary-card">
          <h3>👨‍🏫 Instructor</h3>
          <h1>{user?.name || "Admin"}</h1>
          <p>Currently logged-in administrator.</p>
        </div>

      </section>

    </div>

  );

}