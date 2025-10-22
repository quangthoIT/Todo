import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getTaskbyId,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

// Lấy danh sách task của user hiện tại và tạo task mới
taskRouter
  .route("/")
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

// Lấy chi tiết 1 task, cập nhật và xóa task
taskRouter
  .route("/:id")
  .get(authMiddleware, getTaskbyId)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default taskRouter;
