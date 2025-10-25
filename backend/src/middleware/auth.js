import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ----- XÁC THỰC NGƯỜI DÙNG QUA JWT -----
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authMiddleware = async (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers.authorization;

  // Không có header Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Không có token, truy cập bị từ chối.",
    });
  }
  // Lấy token từ header
  const token = authHeader.split(" ")[1];
  try {
    // Giải mã token
    const payload = jwt.verify(token, JWT_SECRET);

    // Lấy người dùng theo ID
    const user = await userModel.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Người dùng không tồn tại.",
      });
    }
    // Lưu thông tin người dùng vào req.user để dùng ở controller
    req.user = user;
    next();
  } catch (error) {
    console.log("Lỗi xác thực token:", error);
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ.",
    });
  }
};
