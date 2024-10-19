import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import {
  validateRequest,
  validateCreateTask,
  validateUpdateTask,
} from "../middleware/validators";

const router = Router();
const taskController = new TaskController();

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

export default router;
