import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { useAuth } from "./hooks/useAuth";
import LoginCard from "./components/LoginCard";
import { getTasks, getTask } from "./services/taskService";
import { Task } from "./models/Task";
import useWebSocket from "./hooks/useWebSocket";
import { styled } from "styled-components";
import { logout } from "./services/authService";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 3px;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const App: React.FC = () => {
  const { authToken, login } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const onTaskCreated = async (id: string) => {
    const task = await getTask(id);
    setTasks([...tasks, task]);
  };
  const onTaskUpdated = async (id: string) => {
    const task = await getTask(id);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };
  const onTaskDeleted = (id: string) => {
    setTasks(tasks.filter((task) => task.id.toString() !== id));
  };
  useWebSocket(onTaskCreated, onTaskUpdated, onTaskDeleted);
  useEffect(() => {
    if (authToken) {
      getTasks().then(setTasks);
    }
  }, [authToken]);

  if (!authToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <LoginCard onLogin={login!} />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header>
        <h1>Task Manager</h1>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>
      <AddTask />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
