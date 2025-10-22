import express from "express";
import {
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
  changeUserPassword,
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/auth.js";

// Tạo router cho người dùng
const userRouter = express.Router();

// Đăng ký / Đăng nhập (không cần xác thực)
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

// Các route cần xác thực
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile", authMiddleware, updateUserProfile);
userRouter.put("/password", authMiddleware, changeUserPassword);

export default userRouter;
