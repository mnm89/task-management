import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import {
  validateRequest,
  validateCreateTask,
  validateUpdateTask,
} from "../middleware/validators";
import { Server } from "socket.io";

const router = Router();

export default function taskRoutes(io: Server) {
  const taskController = new TaskController(io);

  // Define task routes
  router.post(
    "/",
    validateCreateTask,
    validateRequest,
    taskController.createTask
  );
  router.get("/", taskController.getTasks);
  router.get("/:id", taskController.getTaskById);
  router.put(
    "/:id",
    validateUpdateTask,
    validateRequest,
    taskController.updateTask
  );
  router.delete("/:id", taskController.deleteTask);
  return router;
}
