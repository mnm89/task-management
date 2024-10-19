import { Task, TaskStatus } from "../models/Task";
import { AppDataSource } from "../data/index";
import { Repository } from "typeorm";

export class TaskService {
  private taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
  async create(
    title: string,
    description: string,
    dueDate: Date
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;

    return await this.taskRepository.save(task);
  }
  async update(
    id: string,
    title: string,
    description: string,
    status: "pending" | "in_progress" | "done",
    dueDate: Date
  ): Promise<Task> {
    await this.taskRepository.update(id, {
      title,
      status: TaskStatus[status],
      description,
      dueDate,
    });
    return this.taskRepository.findOneOrFail({ where: { id } });
  }

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  async getTaskById(id: string): Promise<Task> {
    return await this.taskRepository.findOneOrFail({ where: { id } });
  }
  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
