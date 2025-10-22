import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { get } from "mongoose";

// ----- CẤU HÌNH JWT -----
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Khóa bí mật JWT (nên lưu trong biến môi trường)
const TOKEN_EXPIRES = "7d"; // Token hết hạn sau 7 ngày
// Hàm tạo Token từ ID người dùng
const createToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

// ----- ĐĂNG KÝ NGƯỜI DÙNG MỚI -----
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  // Kiểm tra các trường bắt buộc
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Tất cả các trường đều bắt buộc." });
  }

  // Kiểm tra định dạng email
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Email không hợp lệ." });
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    if (await userModel.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email đã được sử dụng." });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Tạo người dùng mới
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Tạo token
    const token = createToken(user._id);
    // Trả về người dùng với token
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    // Xử lý lỗi
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};

// ----- ĐĂNG NHẬP NGƯỜI DÙNG -----
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Kiểm tra các trường bắt buộc

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Tất cả các trường đều bắt buộc." });
  }

  try {
    // Tìm người dùng theo email
    const user = await userModel.findOne({ email });
    // Kiểm tra người dùng tồn tại hay không
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc mật khẩu không đúng." });
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã băm
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc mật khẩu không đúng." });
    }

    // Tạo token và trả về thông tin người dùng
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
      user: {
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    // Xử lý lỗi
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};

// ----- LẤY THÔNG TIN NGƯỜI DÙNG -----
export const getUserProfile = async (req, res) => {
  try {
    // req.user được lấy từ middleware xác thực token
    const user = await userModel.findById(req.user.id).select("userName email");

    // Kiểm tra người dùng tồn tại hay không
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Lỗi lấy profile:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};

// ----- CẬP NHẬT THÔNG TIN NGƯỜI DÙNG -----
export const updateUserProfile = async (req, res) => {
  const { userName, email } = req.body;
  // Kiểm tra dữ liệu đầu vào
  if (!userName || !email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin không hợp lệ." });
  }

  try {
    // Kiểm tra email đã được sử dụng bởi người dùng khác chưa
    const exists = await userModel.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    // Khi email được sử dụng
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Email đã được sử dụng." });
    }

    // Cập nhật thông tin người dùng
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { userName, email },
      { new: true, runValidators: true, select: "userName email" }
    );
    res.json({ success: true, user });
  } catch (error) {
    console.log("Lỗi cập nhật profile:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};

// ----- THAY ĐỔI MẬT KHẨU NGƯỜI DÙNG -----
export const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // Kiểm tra dữ liệu đầu vào
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Thông tin mật khẩu không hợp lệ.",
    });
  }

  try {
    // Lấy người dùng theo ID từ req.user
    const user = await userModel.findById(req.user.id).select("password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại." });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu hiện tại không đúng." });
    }

    // Băm mật khẩu mới và cập nhật
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Mật khẩu đã được thay đổi thành công.",
    });
  } catch (error) {
    console.log("Lỗi khi thay đổi mật khẩu:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};

// ----- XÓA TÀI KHOẢN -----
export const deleteUserAccount = async (req, res) => {
  try {
    // Lấy ID người dùng từ req.user
    const userId = req.user._id;
    // Xóa người dùng khỏi cơ sở dữ liệu
    const deletedUser = await userModel.findByIdAndDelete(userId);
    // Kiểm tra nếu người dùng không tồn tại
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản để xóa.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tài khoản đã được xóa thành công.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server khi xóa tài khoản.",
      error,
    });
  }
};
