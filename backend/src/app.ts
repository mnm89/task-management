import http from "http";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler"; // Global error handler middleware
import { NotFoundError } from "./errors/notFoundError"; // Custom 404 error
import { createIOServer } from "./sockets";
import taskRoutes from "./routes/taskRoutes";
import authenticateJWT from "./middleware/authMiddleware";
import { login } from "./routes/authRoutes";

// Create an Express application
const app: Application = express();

// Set up an HTTP server to integrate with Socket.IO
const server = http.createServer(app);
const io = createIOServer(server);

// Global middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance API security with HTTP headers
app.use(morgan("dev")); // Log HTTP requests (use 'dev' for development)
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.post("/api/login", login);
app.use("/api/tasks", authenticateJWT, taskRoutes(io)); // Mount task-related routes at /api/tasks protected by jwt

// Handle 404 errors (route not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError("Route not found");
});

// Global error handler middleware
app.use(errorHandler);

export { server };
