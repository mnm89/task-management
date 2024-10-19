import React, { useEffect, useState } from "react";
import { Task } from "../models/Task";
import { getTasks } from "../services/taskService";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskUpdate={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;