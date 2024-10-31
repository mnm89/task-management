import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  //TODO: Dummy user validation (replace with your logic)
  if (username === "user" && password === "password") {
    const user = { id: 1, username };

    // Create a token
    const token = jwt.sign(user, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
