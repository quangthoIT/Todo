import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import calendarRouter from "./routes/calendarRoute.js";

dotenv.config(); // Đọc biến môi trường

const PORT = process.env.PORT || 5001; // Cấu hình cổng

const app = express(); // Khởi tạo app

app.use(express.json()); // Middleware để phân tích JSON

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB(); // Kết nối cơ sở dữ liệu

// Routes
app.use("/api/users", userRouter); // Route người dùng
app.use("/api/tasks", taskRouter); // Route tasks
app.use("/api/calendar", calendarRouter); // Route calendar
// Định nghĩa route cơ bản
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
