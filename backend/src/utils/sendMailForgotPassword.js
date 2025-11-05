import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const OAuth2 = google.auth.OAuth2;

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMailForgotPassword = async (email, otp) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const html = `
      <div style="font-family:'Inter',sans-serif;background:#f3f4f6;padding:30px;text-align:center;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 6px 14px rgba(0,0,0,0.1);padding:20px;">
          <h2 style="color:#2563eb;">ĐẶT LẠI MẬT KHẨU TODO</h2>
          <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản <b>${email}</b>.</p>
          <p>Sử dụng mã OTP bên dưới để xác nhận:</p>
          <div style="background:#dbeafe;padding:15px 30px;border-radius:8px;font-size:22px;font-weight:bold;color:#2563eb;display:inline-block;margin:20px 0;">
            ${otp}
          </div>
          <p>Mã OTP có hiệu lực trong <b>10 phút</b>.</p>
          <p>Nếu bạn không yêu cầu thao tác này, vui lòng bỏ qua email này.</p>
          <hr/>
          <p style="font-size:13px;color:#9ca3af;">© ${new Date().getFullYear()} Todo. All rights reserved.</p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Todo Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu",
      html,
    });
  } catch (err) {
    console.error("Lỗi gửi email:", err);
  }
};
