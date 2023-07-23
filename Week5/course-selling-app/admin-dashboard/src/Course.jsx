import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";

function Course() {
  let { courseId } = useParams();
  const [courses, setCourse] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourse(data.courses);
      });
  }, []);

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card
        style={{
          border: "1px solid black",
          margin: "10px",
          minHeight: "220px",
          width: "300px",
        }}
      >
        <Typography
          style={{
            overflowWrap: "wrap",
          }}
        >
          <img
            src={course.image}
            alt="image"
            style={{
              width: "300px",
            }}
          />
        </Typography>
        <Typography
          variant="h6"
          style={{
            overflowWrap: "wrap",
          }}
          textAlign={"center"}
        >
          {course.title}
        </Typography>
        <Typography
          variant="subtitle"
          style={{
              overflowWrap: "wrap",
              margin:"10px"
          }}
        >
          {course.description}
        </Typography>
      </Card>
    </div>
  );
}

export default Course;
