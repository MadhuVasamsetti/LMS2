import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/enrollments/student/${user.id}`)
      .then((res) => setEnrolledCourses(res.data))
      .catch((err) => console.error(err));
  }, [user.id]);

  return (
    <div className="dashboard">
      <h1>My Enrolled Courses</h1>
      <div className="courses-grid">
        {enrolledCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
