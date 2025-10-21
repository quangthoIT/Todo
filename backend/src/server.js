import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config(); // Đọc biến môi trường

const PORT = process.env.PORT || 5001; // Cấu hình cổng

const app = express(); // Khởi tạo app

app.use(express.json()); // Middleware để phân tích JSON

connectDB(); // Kết nối cơ sở dữ liệu

app.use("/api/user", userRouter); // Route người dùng

// Định nghĩa route cơ bản
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
