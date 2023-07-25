import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

const textState = atom({
  key: "coursesState",
  default: "",
});

function Course() {
  let { courseId } = useParams();
  const setCourses = useSetRecoilState(coursesState);

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
        setCourses(data.courses);
      });
  }, []);


  return (
    <div>
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
}
 
function UpdateCard(props) {
  const [title, setTitle] = useRecoilState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const course = props.course;
  const [courses, setCourses] = useRecoilState(coursesState);
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          border: "2px solid black",
          width: "340px",
          height: "300px",
          padding: "15px",
          marginTop: "40px",
          backgroundColor: "White",
        }}
      >
        <Typography variant="h5">Update Course Details</Typography>
        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image Link"
          variant="outlined"
          style={{ marginTop: "20px" }}
        />
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
          style={{ marginTop: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "15px",
          }}
          onClick={() => {
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                image: image,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((res) => {
                return res.json();
              })
              .then(() => {
                let updatedCourses = [];
                for (let i = 0; i < courses.length; i++){
                  if (courses[i].id == props.courseId) {
                    updatedCourses.push({
                      id: props.courseId,
                      title: title,
                      description: description,
                      image:image
                    })
                  } else {
                    updatedCourses.push(courses[i]);
                  }
                  setCourses(updatedCourses);
                }
              });
          }}
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = useRecoilValue(coursesState); 
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === courseId) {
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
          variant="subtitle1"
          style={{
            overflowWrap: "wrap",
            margin: "10px",
          }}
        >
          {course.description}
        </Typography>
      </Card>
    </div>
  );
}

export default Course;

