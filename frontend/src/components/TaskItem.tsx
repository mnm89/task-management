import React, { useState } from "react";
import styled from "styled-components";
import { Task } from "../models/Task";
import { deleteTask, updateTask } from "../services/taskService";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = async () => {
    await updateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <TaskContainer>
      {isEditing ? (
        <>
          <TaskEditInput
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <TaskEditTextarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <Select
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                status: e.target.value as Task["status"],
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
          <TaskEditInput
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </>
      ) : (
        <TaskContent>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
          <TaskStatus>Status: {task.status}</TaskStatus>
          <TaskDueDate>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </TaskDueDate>
        </TaskContent>
      )}
      <ButtonContainer>
        <EditButton onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </EditButton>
        <DeleteButton
          onClick={async () => {
            await deleteTask(task.id);
          }}
        >
          Delete
        </DeleteButton>
      </ButtonContainer>
    </TaskContainer>
  );
};

export default TaskItem;

// Styled Components
const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-color: #f9f9f9;
  width: 600px;
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const TaskDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
`;

const TaskStatus = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const TaskDueDate = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-left: 18px;
`;

const TaskEditInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const TaskEditTextarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SaveButton = styled(EditButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(EditButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;
