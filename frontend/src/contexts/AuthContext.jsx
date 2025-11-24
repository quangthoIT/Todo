import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:5001/api");

// Cấu hình axios mặc định
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Login failed" };
    }
  };

  const signUp = async (email, password, userName) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        userName,
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || "Sign up failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logout successfully!");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setTimeout(() => setLoading(false), 500));
    } else {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);