import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Hourglass,
  TrendingUp,
} from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import TaskList from "@/components/TaskList";

const Dashboard = () => {
  const { tasks } = useTasks();

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

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: TrendingUp,
      color_title: "text-gray-800",
      color_value_icon: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Hourglass,
      color_title: "text-gray-800",
      color_value_icon: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Clock,
      color_title: "text-gray-800",
      color_value_icon: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color_title: "text-gray-800",
      color_value_icon: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertCircle,
      color_title: "text-gray-800",
      color_value_icon: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  const now = new Date();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Đặt mốc bắt đầu của ngày mai 00:00 ngày kế tiếp
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  // --- TODAY TASKS ---
  const todayTasks = tasks.filter((t) => {
    const startDate = t.startDate ? new Date(t.startDate) : null;
    const dueDate = t.dueDate ? new Date(t.dueDate) : null;
    // Nếu task chưa có ngày bắt đầu hoặc kết thúc thì bỏ qua
    if (!startDate && !dueDate) return false;
    // Nếu task bắt đầu trước ngày mai và kết thúc sau hôm nay thì task đó thuộc về hôm nay
    return (
      (startDate < startOfTomorrow && (!dueDate || dueDate >= startOfToday)) ||
      (startDate >= startOfToday && startDate < startOfTomorrow) ||
      (dueDate && dueDate >= startOfToday && dueDate < startOfTomorrow)
    );
  });

  // --- UPCOMING TASKS ---
  const upcomingTasks = tasks
    .filter((task) => {
      if (task.status === "Completed" || task.status === "Overdue")
        return false;
      // Nếu task chưa có ngày bắt đầu hoặc kết thúc thì bỏ qua
      const startDate = task.startDate ? new Date(task.startDate) : null;
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      // Task được xem là Upcoming nếu start hoặc due đều sau ngày mai
      return (
        (startDate && startDate >= startOfTomorrow) ||
        (dueDate && dueDate >= startOfTomorrow)
      );
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="transition-shadow cursor-pointer hover:shadow-md"
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-base ${stat.color_title}`}>
                    {stat.title}
                  </p>
                  <p
                    className={`mt-2 text-3xl font-bold ${stat.color_value_icon}`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color_value_icon}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList
          title="Today's Tasks"
          tasks={todayTasks}
          emptyMessage="No tasks for today"
          showActions={false}
          showCheckbox={false}
        />

        <TaskList
          title="Upcoming Tasks"
          tasks={upcomingTasks}
          emptyMessage="No upcoming tasks"
          showActions={false}
          showCheckbox={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
