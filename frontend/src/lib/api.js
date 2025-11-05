const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  auth: {
    forgotPassword: async (email) => {
      const res = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to send reset email");
      return data;
    },
    resetPassword: async (email, password, otp) => {
      const res = await fetch(`${API_URL}/users/reset-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      return data;
    },
  },

  tasks: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch tasks");
      return data;
    },

    create: async (taskData) => {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create task");
      return data;
    },

    update: async (id, updates) => {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update task");
      return data;
    },

    delete: async (id) => {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete task");
      }
      return true;
    },
  },
};
