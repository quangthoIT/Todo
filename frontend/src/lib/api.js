const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:5001/api");

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

  users: {
    updateProfile: async (userName) => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ userName }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");
      return data;
    },

    updateAvatar: async (avatar) => {
      const isFile = avatar instanceof File;
      let headers = getAuthHeaders();
      let body;

      if (isFile) {
        delete headers["Content-Type"];

        const formData = new FormData();
        formData.append("avatar", avatar);
        body = formData;
      } else {
        body = JSON.stringify({ avatar: avatar });
      }

      const response = await fetch(`${API_URL}/users/avatar`, {
        method: "PUT",
        headers: headers,
        body: body,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update avatar");
      return data;
    },

    changePassword: async (currentPassword, newPassword) => {
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to change password");
      return data;
    },

    deleteAccount: async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete account");
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
