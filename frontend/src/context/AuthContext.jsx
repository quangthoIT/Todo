import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// const API_URL = "http://localhost:5001/api/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Thông tin User
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Token
  const [loading, setLoading] = useState(true); // Kiểm tra khi load trang

  // Gọi API đăng nhập
  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      setToken(data.token); // Lưu token vào localStorage
      setUser(data.user); // Lưu thông tin người dùng vào state
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Login failed" };
    }
  };

  // Gọi API đăng ký
  const signUp = async (email, password, userName) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/users/register",
        {
          email,
          password,
          userName,
        }
      );
      localStorage.setItem("token", data.token);
      setToken(data.token); // Lưu token vào localStorage
      setUser(data.user); // Lưu thông tin người dùng vào state
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Sign up failed" };
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // Lưu thông tin người dùng vào state
    setToken(null); // Lưu token vào localStorage
    toast.success("Logout successfully!");
  };

  // Load user khi refresh page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setTimeout(() => setLoading(false), 500));
    } else {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  // Trả về thống tin người dùng, chức năng
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
