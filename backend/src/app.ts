import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { configureSockets } from "./sockets"; // Import Socket.IO configuration
import taskRoutes from "./routes/taskRoutes"; // Task-related routes
import { errorHandler } from "./middleware/errorHandler"; // Global error handler middleware
import { NotFoundError } from "./errors/notFoundError"; // Custom 404 error

// Create an Express application
const app: Application = express();

// Set up an HTTP server to integrate with Socket.IO
const server = http.createServer(app);

// Set up Socket.IO
const io = new SocketIOServer(server);
configureSockets(io); // Initialize socket configuration

// Global middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance API security with HTTP headers
app.use(morgan("dev")); // Log HTTP requests (use 'dev' for development)
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use("/api/tasks", taskRoutes); // Mount task-related routes at /api/tasks

// Handle 404 errors (route not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError("Route not found");
});

// Global error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { server };
