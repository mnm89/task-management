import { body, param } from "express-validator";

export const validateCreateTask = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),
];

export const validateUpdateTask = [
  param("id").isUUID().withMessage("Task ID must be a valid UUID"),

  body("title").optional().isString().withMessage("Title must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in_progress", "done"])
    .withMessage("Status must be one of: pending, in-progress, completed"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),
];
