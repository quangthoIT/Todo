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

    // ----- TÍNH TOÁN THỐNG KÊ THEO XU HƯỚNG -----
    const trendData = generateTrendData(filtered, dateRange);

    return { statusStats, priorityStats, trendData, filtered }; // Trả về 3 nhóm dữ liệu
  }, [tasks, dateRange, now]);

  return stats; // Trả về object: { statusStats, priorityStats, trendData }
}

// ----- HÀM TÍNH TOÁN DỮ LIỆU THEO XU HƯỚNG -----
function generateTrendData(tasks, dateRange) {
  if (tasks.length === 0) return [];

  // Determine date range
  let startDate, endDate;

  // Trường hợp có cả Từ ngày và Đến ngày
  if (dateRange?.from && dateRange?.to) {
    startDate = new Date(dateRange.from);
    endDate = new Date(dateRange.to);
  }
  // Chỉ có Từ ngày - mặc định kết thúc là hôm nay
  else if (dateRange?.from) {
    startDate = new Date(dateRange.from);
    endDate = new Date();
  }
  // Không chọn gì - mặc định lấy 7 ngày gần nhất
  else {
    endDate = new Date();
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
  }

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const trendMap = {}; // Tạo object trendMap để lưu dữ liệu ngày
  const currentDate = new Date(startDate);

  // Duyệt qua từng ngày trong khoảng thời gian
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split("T")[0];
    trendMap[dateKey] = {
      date: dateKey,
      created: 0,
      completed: 0,
    };
    currentDate.setDate(currentDate.getDate() + 1); // Sang ngày tiếp theo
  }

  // Đếm task tương ứng với từng ngày
  tasks.forEach((task) => {
    const taskDate = new Date(task.startDate);
    const dateKey = taskDate.toISOString().split("T")[0];

    if (trendMap[dateKey]) {
      trendMap[dateKey].created++;
    }

    // Nếu task hoàn thành, đếm cho Completed
    if (task.status === "Completed" && task.completedAt) {
      const completedDate = new Date(task.completedAt);
      const completedKey = completedDate.toISOString().split("T")[0];

      if (trendMap[completedKey]) {
        trendMap[completedKey].completed++;
      }
    }
  });

  // Convert trendMap sang array để đưa vào chart
  return Object.values(trendMap).map((item) => ({
    ...item,
    displayDate: formatDateForDisplay(item.date),
  }));
}

function formatDateForDisplay(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}
