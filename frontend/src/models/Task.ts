export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  dueDate: string; // ISO 8601 string
}
