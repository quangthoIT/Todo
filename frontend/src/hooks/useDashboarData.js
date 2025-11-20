import { useMemo } from "react";
import { useTasks } from "./useTasks";

export function useDashboardData() {
  const { tasks } = useTasks();

  // --- STATISTICS ---
  const stats = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
      };
    }

    // ----- DASHBOARD STATS CHỈ LẤY BẮT ĐẦU TỪ NGÀY HÔM NAY -----
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOnwardsTasks = tasks.filter((task) => {
      const taskStartDate = task.startDate ? new Date(task.startDate) : null;
      const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

      // Nếu không có cả startDate và dueDate thì bỏ qua
      if (!taskStartDate && !taskDueDate) return false;

      // Task startDate và dueDate có ngày hôm nay trở đi thì tính
      if (taskDueDate) {
        taskDueDate.setHours(0, 0, 0, 0);
        if (taskDueDate >= today) return true;
      }
      if (taskStartDate) {
        taskStartDate.setHours(0, 0, 0, 0);
        if (taskStartDate >= today) return true;
      }

      return false;
    });

    // Phân loại các task từ hôm nay trở đi
    const pendingTasks = todayOnwardsTasks.filter(
      (t) => t.status === "Pending"
    );
    const inProgressTasks = todayOnwardsTasks.filter(
      (t) => t.status === "In_Progress"
    );
    const completedTasks = todayOnwardsTasks.filter((t) => t.status === "Completed");
    const overdueTasks = todayOnwardsTasks.filter((t) => t.status === "Overdue");

    const result = {
      totalTasks: todayOnwardsTasks.length,
      pendingTasks: pendingTasks.length,
      inProgressTasks: inProgressTasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length,
    };

    return result;
  }, [tasks]);

  // ---- DATE RANGES ----

  // Đặt mốc bắt đầu của ngày hôm nay 00:00
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  // Đặt mốc bắt đầu của ngày mai 00:00 ngày kế tiếp
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);

  // --- TODAY'S TASKS ---
  const todayTasks = tasks.filter((task) => {
    const startDate = task.startDate ? new Date(task.startDate) : null;
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    // Nếu task chưa có ngày bắt đầu hoặc kết thúc thì bỏ qua
    if (!startDate && !dueDate) return false;
    // Nếu task bắt đầu trước ngày mai và kết thúc sau hôm nay thì task đó thuộc về hôm nay
    return (
      (startDate &&
        startDate < startOfTomorrow &&
        (!dueDate || dueDate >= startOfToday)) ||
      (dueDate && dueDate >= startOfToday && dueDate < startOfTomorrow)
    );
  });
  const todayTaskIds = todayTasks.map((t) => t._id);

  // --- UPCOMING TASKS ---
  const upcomingTasks = tasks
    .filter((task) => {
      if (task.status === "Completed" || task.status === "Overdue")
        return false;
      // Những task trong ngày hôm nay thì bỏ qua
      if (todayTaskIds.includes(task._id)) return false;
      // Nếu task chưa có ngày bắt đầu hoặc kết thúc thì bỏ qua
      const startDate = task.startDate ? new Date(task.startDate) : null;
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      // Nếu task chưa có ngày bắt đầu hoặc kết thúc thì bỏ qua
      if (!startDate && !dueDate) return false;
      // Task được xem là Upcoming nếu start hoặc due đều sau ngày mai
      return (
        (startDate && startDate >= startOfTomorrow) ||
        (dueDate && dueDate >= startOfTomorrow)
      );
    })
    .sort((a, b) => {
      const aStart = a.startDate ? new Date(a.startDate) : Infinity;
      const bStart = b.startDate ? new Date(b.startDate) : Infinity;
      return aStart - bStart;
    })
    .slice(0, 5);

  return { stats, todayTasks, upcomingTasks };
}
