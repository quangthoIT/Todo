import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Tự động lấy API_URL từ biến môi trường
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:5001/api");

// Khởi tạo Context để chia sẻ trạng thái đăng nhập cho toàn app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State lưu thông tin user
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Token lưu trong localStorage để giữ đăng nhập sau khi reload
  const [loading, setLoading] = useState(true); // Dùng để hiển thị loading khi load trang

  // Gọi API đăng nhập
  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);
      // Lưu thông tin người dùng vào state
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Login failed" };
    }
  };

  // Gọi API đăng ký
  const signUp = async (email, password, userName) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        userName,
      });
      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);
      // Lưu thông tin người dùng vào state
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Sign up failed" };
    }
  };

  // Đăng xuất
  const logout = () => {
    // Xóa token + user khỏi state và localStorage
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logout successfully!");
  };

  // Load user khi refresh page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Gọi API lấy thông tin user theo token
      axios
        .get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        // Cập nhật thông tin user
        .then((res) => setUser(res.data.user))
        // Nếu token hết hạn - tự logout
        .catch(() => logout())
        // Delay nhỏ để mượt hơn
        .finally(() => setTimeout(() => setLoading(false), 500));
    } else {
      // Nếu chưa có token → không đăng nhập
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  // Trả về các hàm và state cho toàn app dùng
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
