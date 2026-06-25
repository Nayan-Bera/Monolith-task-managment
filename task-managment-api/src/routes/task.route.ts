import express from "express";
import taskController from "../controller/task.controller.js";
import { auth } from "../index.js";
const router =  express.Router();

router.post("/add",auth, taskController.createTask);
router.get("/get", auth, taskController.getTasks);
router.put("/update/:id", auth, taskController.updateTask);
router.delete("/delete/:id", auth, taskController.deleteTask);

export default router;