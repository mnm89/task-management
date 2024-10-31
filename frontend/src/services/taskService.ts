import axios from "axios";
import { Task } from "../models/Task";

const API_URL =
  process.env.REACT_APP_TASK_API_URL ?? "http://localhost:3000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const getTask = async (id: string | number): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/${id}`);
  return response.data;
};
export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${taskId}`);
};
