import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Example: Handle task updates
    socket.on("task:update", (taskId: string) => {
      io.emit("task:updated", taskId); // Broadcast task update to all clients
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
