import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Đọc biến môi trường
dotenv.config();

// Cấu hình cổng
const PORT = process.env.PORT || 5001;

// Khởi tạo app
const app = express();

// Middleware để phân tích JSON
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB();

// Định nghĩa route cơ bản
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
