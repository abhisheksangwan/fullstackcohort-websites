import "./App.css";
import { useState } from "react";

// var todos = [
//   {
//     title: "go to gym",
//     description: "I have to go to gym daily",
//     id: 1,
//   },
//   {
//     title: "go eat food",
//     description: "I have to go eat food",
//     id: 2,
//   },
// ];
let todo = {
  title: "go to gym",
  description: "I have to go to gym daily",
  id: 1,
};

function PersonName(props) {
  return (
    <div>
      {props.firstName} {props.lastName}
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState({
    title: "haa gymmmmm kar aaya",
    description: "karliya gym",
    id: 1,
  });

  setInterval(() => {
    setTodo({
      title: "go eat food",
      description: "I have to go eat food",
      id: 1,
    });
    todo.title = "123";
  }, 2000);

  return (
    <div>
      <h1>Hi</h1>
      Title: {todo.title} <br />
      Description: {todo.description} <br />
      Id: {todo.id} <br />
      <h3><PersonName firstName={"Abhishek"} lastName={"Sangwan"} /> </h3>
    </div>
  );
}

export default App;
