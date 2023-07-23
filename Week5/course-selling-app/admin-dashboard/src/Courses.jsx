import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
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

  return (
      <div style={{
          display: "flex",
          marginTop: "20px",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent:"center"
      }} >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}
function Course(props) {
  return (
    <Card
      style={{
              border: "1px solid black",
          margin:"10px",
        minHeight: "200px",
        width: "300px",
      }}
    >
      <Typography variant="h5" textAlign="center">
        {props.course.title}
      </Typography>
      <br />
      <Typography variant="subtitle" textAlign="center"  >
        {props.course.description}
      </Typography>
      <Typography variant="subtitle" textAlign="center">
        <img src={props.course.image} alt="image" style={{ width: "300px" }} />
      </Typography>
    </Card>
  );
}

export default Courses;
