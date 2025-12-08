import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";

dotenv.config(); // Đọc biến môi trường từ file .env

const PORT = process.env.PORT || 5001; // Cổng mặc định nếu không có trong .env

const __dirname = path.resolve(); // Lấy đường dẫn thư mục gốc

const app = express(); // Khởi tạo server

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
}

app.use(express.json()); // Middleware để phân tích JSON

// API routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

if (process.env.NODE_ENV === "production") {
  // Phục vụ tệp tĩnh từ thư mục build của frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Bắt tất cả các route và phục vụ index.html
  app.use((req, res, next) => {
    // Chỉ serve index.html cho non-API requests
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    } else {
      next();
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Kết nối DB và khởi động server
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
);
