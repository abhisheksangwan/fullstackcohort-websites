const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};
// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    res.json({ message: "Admin created successfully" });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body;
  if (!course.title) {
    res.status(411).send({ message: "Please fill in correct course title" });
  }
  course.id = Date.now();
  COURSES.push(course);
  res.send({ message: "course created  successfully", courseId: course.id });
});
app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "course updated successfully" });
  } else {
    res.status(411).send({ message: "Course not found" });
  }
});
app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = { ...req.body, purchasedCourses: [] };
  USERS.push(user);
  res.json({ message: "User created successfully" });
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.send({ message: "User logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  // logic to list all courses
  res.send({ courses: COURSES.filter((c) => c.published) });
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((a) => a.id === courseId && a.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(411).send({ message: "Course not found or unavailable" });
  }
});

app.get("/users/purchasedCourses", userAuthentication, (req, res) => {
  // logic to view purchased courses
  // const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
  var purchasedCoursesIds = req.user.purchasedCourses;
  var purchasedCourses = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (purchasedCoursesIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourses.push(COURSES[i]);
    }
  }
  res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
