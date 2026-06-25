import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  description: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(["pending", "in_progress", "completed"])
    .optional(),
});

export const updateTaskSchema = taskSchema.partial();

export type TaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;