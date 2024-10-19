import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // WebSocket server

const useWebSocket = (
  onTaskCreated?: (id: string) => void,
  onTaskUpdated?: (id: string) => void,
  onTaskDeleted?: (id: string) => void
) => {
  useEffect(() => {
    socket.on("task:created", (id: string) => {
      onTaskCreated && onTaskCreated(id);
    });

    socket.on("task:updated", (id: string) => {
      onTaskUpdated && onTaskUpdated(id);
    });

    socket.on("task:deleted", (id: string) => {
      onTaskDeleted && onTaskDeleted(id);
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [onTaskCreated, onTaskUpdated, onTaskDeleted]);

  return socket;
};

export default useWebSocket;
