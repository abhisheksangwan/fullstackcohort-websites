import React, { useState } from "react";

function App() {
  const [todos, setTodos] = React.useState([
    {
      title: "Go to gym",
      description: "Hit gym from 5-7",
      id: 1,
    },
    {
      title: "Go to class",
      description: "Hit gym from 7-9",
      id: 2,
    },
  ]);

    function Todo(props) {
        return <div style={{backgroundColor:"red"}}>
            {props.title}
            {props.description}
        </div>
}
  return (
      <div>
          {todos.map((todo) => {
              return <Todo title={todo.title} description={todo.description} />;
          })}
      <br />
      <br />
      {JSON.stringify(todos)};
    </div>
  );
}

export default App;
