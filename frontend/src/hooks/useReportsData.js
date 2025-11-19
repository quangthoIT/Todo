import { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";

export function useReportsData(dateRange = null) {
  const { tasks } = useTasks();
  const now = new Date();

  const stats = useMemo(() => {
    // ----- TRƯỜNG HỢP KHÔNG CÓ TASK -----
    if (!tasks || tasks.length === 0) {
      //
      return {
        statusStats: {
          totalTasks: 0,
          pending: 0,
          inProgress: 0,
          completed: 0,
          overdue: 0,
        },
        priorityStats: {
          low: 0,
          medium: 0,
          high: 0,
          urgent: 0,
        },
      };
    }

    let filtered = tasks; // Khi chưa lọc mặc định dữ liệu là toàn bộ Task

    // ----- LỌC THEO KHOẢNG THỜI GIAN -----
    // Khi có Từ ngày và Đến ngày
    if (dateRange?.from && dateRange?.to) {
      const startDate = new Date(dateRange.from);
      startDate.setHours(0, 0, 0, 0); // Đặt thời gian bắt đầu là 00:00:00 của Từ ngày
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc là 23:59:59 của Đến ngày

      filtered = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        return taskStartDate >= startDate && taskStartDate <= endDate;
      });
    }
    // Khi chỉ chọn Từ ngày
    else if (dateRange?.from) {
      const startDate = new Date(dateRange.from);
      startDate.setHours(0, 0, 0, 0);

      filtered = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        return taskStartDate >= startDate;
      });
    }

    // ----- TÍNH TOÁN THỐNG KÊ THEO TRANG THÁI -----
    const completed = filtered.filter((t) => t.status === "Completed");
    const inProgress = filtered.filter((t) => t.status === "In_Progress");
    const pending = filtered.filter((t) => t.status === "Pending");
    const overdue = filtered.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
    );

    const statusStats = {
      totalTasks: filtered.length,
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
      overdue: overdue.length,
    };

    // ----- TÍNH TOÁN THỐNG KÊ THEO ĐỘ ƯU TIÊN -----
    const priorityStats = {
      low: filtered.filter((t) => t.priority === "Low").length,
      medium: filtered.filter((t) => t.priority === "Medium").length,
      high: filtered.filter((t) => t.priority === "High").length,
      urgent: filtered.filter((t) => t.priority === "Urgent").length,
    };

    return { statusStats, priorityStats }; // Trả về 2 nhóm dữ liệu
  }, [tasks, dateRange, now]);

  return stats; // Trả về object: { statusStats, priorityStats }
}
