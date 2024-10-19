import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  private taskService = new TaskService();

  public createTask = async (req: Request, res: Response) => {
    const { title, description, dueDate } = req.body;

    // Simulate creating a task (you'd actually interact with a database here)
    const newTask = await this.taskService.create(title, description, dueDate);

    res.status(201).json({ task: newTask });
  };

  public updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const { title, description, status, dueDate } = req.body;

    // Simulate updating the task (you'd actually interact with a database here)
    const updatedTask = await this.taskService.update(
      taskId,
      title,
      description,
      status,
      dueDate
    );

    res.status(200).json({ task: updatedTask });
  };

  public getTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAll();
    res.status(200).json(tasks);
  };

  public getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = await this.taskService.getTaskById(taskId);
    res.status(200).json(task);
  };

  public deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    await this.taskService.deleteTask(taskId);
    res.status(200);
  };
}
