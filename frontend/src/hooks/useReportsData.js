import { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";

export function useReportsData(period = "week") {
  const { tasks } = useTasks();
  const now = new Date();

  const stats = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
        completedToday: 0,
        completedWeek: 0,
        completedMonth: 0,
        productivity: 0,
      };
    }

    const ranges = {
      week: 7,
      month: 30,
      year: 365,
    };

    const startDate = new Date(
      now.getTime() - ranges[period] * 24 * 60 * 60 * 1000
    );

    const filtered = tasks.filter((t) => new Date(t.created_at) >= startDate);

    const completed = filtered.filter((t) => t.status === "Completed");
    const inProgress = filtered.filter((t) => t.status === "In_Progress");
    const pending = filtered.filter((t) => t.status === "Pending");

    const overdue = filtered.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
    );

    // Completed today
    const completedToday = completed.filter((t) => {
      if (!t.completedAt) return false;
      const d = new Date(t.completedAt);
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    // Completed this week
    const completedWeek = completed.filter((t) => {
      if (!t.completedAt) return false;
      const d = new Date(t.completedAt);
      return now - d <= 7 * 24 * 60 * 60 * 1000;
    });

    // Completed this month
    const completedMonth = completed.filter((t) => {
      if (!t.completedAt) return false;
      const d = new Date(t.completedAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });

    // Productivity (Completed / total)
    const productivity = filtered.length
      ? Math.round((completed.length / filtered.length) * 100)
      : 0;

    return {
      totalTasks: filtered.length,
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
      overdue: overdue.length,
      completedToday: completedToday.length,
      completedWeek: completedWeek.length,
      completedMonth: completedMonth.length,
      productivity,
    };
  }, [tasks, period]);

  return { stats };
}
