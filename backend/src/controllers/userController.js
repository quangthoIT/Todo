import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMailForgotPassword } from "../utils/sendMailForgotPassword.js";
import otpGenerator from "otp-generator";

// ----- CẤU HÌNH JWT -----
const JWT_SECRET = process.env.JWT_SECRET; // Khóa bí mật JWT
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
      .json({ success: false, message: "All fields are required" });
  }

  // Kiểm tra định dạng email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Email not valid" });
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters.",
    });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    if (await userModel.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use" });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- ĐĂNG NHẬP NGƯỜI DÙNG -----
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Kiểm tra các trường bắt buộc

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Tìm người dùng theo email
    const user = await userModel.findOne({ email });
    // Kiểm tra người dùng tồn tại hay không
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã băm
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- LẤY THÔNG TIN NGƯỜI DÙNG -----
export const getUserProfile = async (req, res) => {
  try {
    // req.user được lấy từ middleware xác thực token
    const user = await userModel
      .findById(req.user._id)
      .select("userName email avatar");

    // Kiểm tra người dùng tồn tại hay không
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error getting user profile", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- CẬP NHẬT THÔNG TIN NGƯỜI DÙNG -----
export const updateUserProfile = async (req, res) => {
  const { userName } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!userName || userName.trim().length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }

  try {
    // Cập nhật thông tin người dùng (không cho phép đổi email)
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { userName: userName.trim() },
      { new: true, runValidators: true, select: "userName email avatar" }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- CẬP NHẬT AVATAR -----
export const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar URL is required" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true, select: "userName email avatar" }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- THAY ĐỔI MẬT KHẨU NGƯỜI DÙNG -----
export const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // Kiểm tra dữ liệu đầu vào
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Invalid password information",
    });
  }

  try {
    // Lấy người dùng theo ID từ req.user
    const user = await userModel.findById(req.user._id).select("password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password does not match" });
    }

    // Băm mật khẩu mới và cập nhật
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- QUÊN MẬT KHẨU NGƯỜI DÙNG -----
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Kiểm tra người dùng có tồn tại hay không
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Tạo mã OTP 6 số
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    // Lưu OTP với thời gian là 10 phút
    user.resetPasswordOTP = otp;
    user.otpExpiresTime = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendMailForgotPassword(email, otp);
    res.status(200).json({
      success: true,
      message: "OTP has been sent to your email",
    });
  } catch (error) {
    console.log("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ----- XÁC THỰC OTP -----
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user || user.resetPasswordOTP !== otp) {
      return res.status(400).json({ success: false, message: "OTP not valid" });
    }

    if (Date.now() > user.otpExpiresTime) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    res.json({
      success: true,
      message: "OTP successfully verified",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ----- ĐẶT LẠI MẬT KHẨU -----
export const resetPassword = async (req, res) => {
  const { email, password, otp } = req.body;

  // Kiểm tra đầu vào
  if (!email || !password || !otp) {
    return res.status(400).json({
      success: false,
      message: "Missing required information",
    });
  }

  // Kiểm tra độ dài mật khẴu
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    // Kiểm tra người dùng có tồn tại hay không
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Kiểm tra OTP
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }

    // Kiểm tra thời gian mã OTP
    if (Date.now() > user.otpExpiresTime) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Cập nhật mật khẩu
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordOTP = undefined;
    user.otpExpiresTime = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "Server error when resetting password",
    });
  }
};

// ----- XÓA TÀI KHOẢN -----
export const deleteUserAccount = async (req, res) => {
  try {
    // Lấy ID người dùng từ req.user
    const userId = req.user._id;

    // Xóa tất cả tasks của user trước
    await taskModel.deleteMany({ createdBy: userId });

    // Xóa người dùng khỏi cơ sở dữ liệu
    const deletedUser = await userModel.findByIdAndDelete(userId);

    // Kiểm tra nếu người dùng không tồn tại
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error when deleting account",
      error,
    });
  }
};
