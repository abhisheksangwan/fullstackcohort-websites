 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Signin";
import Appbar from "./Appbar";
import Addcourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/addcourse"} element={<Addcourse />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/course/:courseId"} element={<Course/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
