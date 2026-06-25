import { NextFunction, Request, Response } from "express";
import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { AppError } from "../middleware/errorHandler.js";
import { tasks } from "../db/schema/index.js";
import { taskSchema, updateTaskSchema } from "../validators/task.validator.js";

const taskController = {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorData = taskSchema.parse(req.body);
      const { title, description, status } = validatorData;

      const userId = req.user.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }
     
      const [task] = await db
        .insert(tasks)
        .values({
          title,
          description,
          status: status || "pending",
          userId: userId,
        })
        .returning();

      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  },

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;
      const userId = req.user.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }
      let taskList;

      if (status) {
        taskList = await db.query.tasks.findMany({
          where: and(
            eq(tasks.userId, userId),
            eq(tasks.status, status as "pending" | "in_progress" | "completed"),
          ),
          orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
        });
      } else {
        taskList = await db.query.tasks.findMany({
          where: eq(tasks.userId, userId),
          orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
        });
      }

      return res.status(200).json({
        success: true,
        count: taskList.length,
        data: taskList,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const validatorData = updateTaskSchema.parse(req.body);

    const { title, description, status } = validatorData;

    const userId = req.user.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const existingTask = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, id), eq(tasks.userId, userId)),
    });

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    const updateData: Partial<typeof tasks.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
      .returning();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
},
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }
      const existingTask = await db.query.tasks.findFirst({
        where: and(eq(tasks.id, id), eq(tasks.userId, userId)),
      });

      if (!existingTask) {
        throw new AppError("Task not found", 404);
      }

      await db
        .delete(tasks)
        .where(and(eq(tasks.id, id), eq(tasks.userId, userId)));

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default taskController;
