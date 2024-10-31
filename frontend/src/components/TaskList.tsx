import React from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { Task } from "../models/Task";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <TaskListContainer>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </TaskListContainer>
  );
};

export default TaskList;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
