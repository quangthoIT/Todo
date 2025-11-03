import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const data = await api.tasks.getAll();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const data = await api.tasks.create(taskData);
      setTasks((prevTasks) => [data.task, ...prevTasks]);
      return data.task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const data = await api.tasks.update(id, updates);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? data.task : task))
      );
      return data.task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.tasks.delete(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
}
