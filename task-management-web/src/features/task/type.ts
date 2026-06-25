export type TaskStatus =
  | "pending"
  | "in_progress"
  | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  success: boolean;
  count: number;
  data: Task[];
}

export interface SingleTaskResponse {
  success: boolean;
  message: string;
  data: Task;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}