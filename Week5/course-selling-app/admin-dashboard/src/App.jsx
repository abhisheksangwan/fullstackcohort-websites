import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Signin";
import Appbar from "./Appbar";
import AddCourse from "./AddCourse";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/addcourse"} element = {<AddCourse/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
