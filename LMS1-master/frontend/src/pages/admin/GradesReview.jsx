import React, { useEffect, useState } from "react";
import { courseService } from "../../services/courseService";
import "./../../styles/GradesReview.css";

export default function GradesReview() {
  const [enrolls, setEnrolls] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const all = await courseService.getAllEnrollments();
        const cs = await courseService.getAll();
        const map = {};
        cs.forEach((c) => (map[c.id] = c));
        setCoursesMap(map);
        setEnrolls(all);
      } catch (err) {
        console.error("Error loading enrollments:", err);
      }
    }
    load();
  }, []);

  async function handleGrade(enrollId) {
    const grade = prompt("Enter grade (A/B/C/...):");
    if (!grade) return;
    try {
      await courseService.setGrade(enrollId, grade);
      const all = await courseService.getAllEnrollments();
      setEnrolls(all);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="page grades-review-page">
      <h2 className="page-title">📊 Grades Review</h2>

      {enrolls.length === 0 ? (
        <div className="no-data">No enrollments yet</div>
      ) : (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Student ID</th>
              <th>Progress</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolls.map((e) => (
              <tr key={e.id}>
                <td>{coursesMap[e.courseId]?.title || "Unknown Course"}</td>
                <td>{e.studentId}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{e.progress}%</span>
                </td>
                <td>
                  {e.grade ? (
                    <span className={`grade-tag grade-${e.grade.toLowerCase()}`}>
                      {e.grade}
                    </span>
                  ) : (
                    <span className="grade-tag grade-none">—</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn small primary"
                    onClick={() => handleGrade(e.id)}
                  >
                    Set Grade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
