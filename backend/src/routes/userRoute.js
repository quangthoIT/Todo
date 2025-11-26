import express from "express";
import {
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
  changeUserPassword,
  deleteUserAccount,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateUserAvatar,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

// Tạo router cho người dùng
const userRouter = express.Router();

// Đăng ký / Đăng nhập (không cần xác thực)
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

// Các route cần xác thực
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile", authMiddleware, updateUserProfile);
userRouter.put("/change-password", authMiddleware, changeUserPassword);
userRouter.put("/avatar", authMiddleware, updateUserAvatar);
userRouter.delete("/profile", authMiddleware, deleteUserAccount);

// Route quản lý tài khoản người dùng
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
