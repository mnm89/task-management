import React from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

const App: React.FC = () => {
  return (
    <div>
      <h1>Task Management App</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
