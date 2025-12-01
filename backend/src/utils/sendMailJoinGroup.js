import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMailJoinGroup = async (
  email,
  groupName,
  inviteLink,
  inviterName
) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const html = `
      <div style="font-family:'Inter',sans-serif;background:#f3f4f6;padding:30px;text-align:center;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 6px 14px rgba(0,0,0,0.1);padding:20px;">
          <h2 style="color:#2563eb;">LỜI MỜI THAM GIA NHÓM</h2>
          <p style="font-size:16px;">Chào bạn,</p>
          <p style="font-size:16px;">
            <b>${inviterName || "Một thành viên"}</b> đã mời bạn tham gia nhóm
            <b style="color:#2563eb;">${groupName}</b> trên Todo.
          </p>
          <div style="margin:30px 0;">
            <a href="${inviteLink}"
               style="background:#3b82f6;color:#fff;padding:12px 30px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold;font-size:16px;">
              Tham Gia Nhóm
            </a>
          </div>
          <p style="color:#6b7280;font-size:14px;">
            Hoặc copy link sau vào trình duyệt:<br/>
            <span style="background:#f3f4f6;padding:8px 12px;border-radius:4px;display:inline-block;margin-top:8px;word-break:break-all;">
              ${inviteLink}
            </span>
          </p>
          <p style="margin-top:20px;color:#ef4444;font-weight:500;">
            Link mời có hiệu lực trong <b>1 ngày</b>.
          </p>
          <p style="font-size:14px;color:#6b7280;">
            Nếu bạn không mong đợi lời mời này, vui lòng bỏ qua email.
          </p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;"/>
          <p style="font-size:13px;color:#9ca3af;">© ${new Date().getFullYear()} Todo. All rights reserved.</p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Todo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Lời mời tham gia nhóm ${groupName}`,
      html,
    });

    console.log("Group invitation email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending group invitation email:", error);
    throw error;
  }
};
