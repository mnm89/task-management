import React, { useState } from "react";
import { Task } from "../models/Task";
import { deleteTask, updateTask } from "../services/taskService";

interface TaskItemProps {
  task: Task;
  onTaskUpdate: () => void; // Callback for updating tasks after editing
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    await updateTask({ ...task, title, description, dueDate, status });
    setIsEditing(false);
    onTaskUpdate(); // Refresh task list
  };
  const handleDelete = async () => {
    await deleteTask(task.id);
    onTaskUpdate(); // Refresh task list
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
