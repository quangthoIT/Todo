import { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";

export function useReportsData(dateRange = null) {
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
      };
    }

    let filtered = tasks;

    // Lọc theo khoảng thời gian được chọn (dựa trên startDate)
    if (dateRange?.from && dateRange?.to) {
      // Đặt thời gian bắt đầu là 00:00:00 của Từ ngày
      const startDate = new Date(dateRange.from);
      startDate.setHours(0, 0, 0, 0);

      // Đặt thời gian kết thúc là 23:59:59 của Đến ngày
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999);

      filtered = tasks.filter((task) => {
        // Sử dụng startDate thay vì created_at
        const taskStartDate = new Date(task.startDate);
        const isInRange = taskStartDate >= startDate && taskStartDate <= endDate;

        return isInRange;
      });

    } else if (dateRange?.from) {
      // Chỉ có ngày bắt đầu, lọc từ ngày đó đến hiện tại
      const startDate = new Date(dateRange.from);
      startDate.setHours(0, 0, 0, 0);

      filtered = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        return taskStartDate >= startDate;
      });
    }

    // Tính toán thống kê
    const completed = filtered.filter((t) => t.status === "Completed");
    const inProgress = filtered.filter((t) => t.status === "In_Progress");
    const pending = filtered.filter((t) => t.status === "Pending");
    const overdue = filtered.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
    );

    const result = {
      totalTasks: filtered.length,
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
      overdue: overdue.length,
    };

    return result;
  }, [tasks, dateRange, now]);

  return { stats };
}