import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateJWT = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing or invalid" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  }
};

export default authenticateJWT;
