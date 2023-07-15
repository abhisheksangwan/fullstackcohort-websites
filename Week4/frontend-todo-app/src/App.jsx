import React, { useEffect } from "react";

function App() {
  const [todoForToday, setTodoForToday] = React.useState({
    title: "Go to gym",
    description: "Hit gym from 7-9",
    id: 1,
  });
  var ctr = 0;
  console.log("render");

  if (ctr === 0) {
    setInterval(() => {
      setTodoForToday({
        title: "Go to gym please please please" + Math.random(),
        description: "Hit gym from 7-9",
        id: 1,
      });
    }, 1000);
    ctr = 1;
  }

  return (
    <div>
      {todoForToday.title}
      <br />
      {todoForToday.description}
    </div>
  );
}

export default App;
