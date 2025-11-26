import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
// npm install multer cloudinary
import dotenv from "dotenv";

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình Multer (Lưu file vào RAM tạm thời)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware xử lý upload
export const uploadAvatarMiddleware = (req, res, next) => {
  // 'avatar' là tên field mà Frontend gửi lên trong FormData
  const uploadSingle = upload.single("avatar");

  uploadSingle(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Upload failed", error: err.message });
    }

    // Nếu người dùng gửi file ảnh
    if (req.file) {
      try {
        // Convert buffer sang base64 để upload lên Cloudinary
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload lên Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "Todo_Avatars", // Tên folder trên Cloudinary
          resource_type: "auto",
        });

        // Gán URL ảnh mới vào req.body.avatar để Controller dùng
        req.body.avatar = result.secure_url;
        next();
      } catch (uploadError) {
        console.error("Cloudinary Error:", uploadError);
        return res
          .status(500)
          .json({ success: false, message: "Error uploading to Cloudinary" });
      }
    }
    // Nếu người dùng gửi URL string
    else if (req.body.avatar) {
      // Không làm gì cả, giữ nguyên URL string đó chuyển cho controller
      next();
    }
    // Không có gì cả
    else {
      return res
        .status(400)
        .json({ success: false, message: "No avatar provided" });
    }
  });
};
