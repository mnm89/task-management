import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
export * from "./taskValidator";
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array().map((error) => ({
        type: error.type,
        message: error.msg,
      })),
    });
  } else {
    next(); // No validation errors, proceed to the next middleware/route handler
  }
};
