import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION);
    console.log("Kết nối cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("Lỗi khi kết nối cơ sở dữ liệu:", error.message);
    process.exit(1);
  }
};
