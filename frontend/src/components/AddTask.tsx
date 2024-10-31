import React, { useState } from "react";
import styled from "styled-components";
import { Task } from "../models/Task";
import { addTask } from "../services/taskService";

interface AddTaskProps {}

const AddTask: React.FC<AddTaskProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({ title, description, dueDate, status });
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
    }
  };

  return (
    <AddTaskForm onSubmit={handleSubmit}>
      <TaskInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <TaskInput
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <TaskInput
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task["status"])}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
      <AddButton type="submit">Add Task</AddButton>
    </AddTaskForm>
  );
};

export default AddTask;

const AddTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 300px;
`;

const TaskInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
