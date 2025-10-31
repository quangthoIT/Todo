import { useMemo } from "react";
import { useTasks } from "./useTasks";

export function useDashboardData() {
  const { tasks } = useTasks();

  // --- STATISTICS ---
  const stats = useMemo(() => {
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const overdueTasks = tasks.filter((t) => t.status === "Overdue").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "In_Progress"
    ).length;
    const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

    return {
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      pendingTasks,
    };
  }, [tasks]);

  // ---- DATE RANGES ----
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
