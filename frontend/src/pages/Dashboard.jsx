import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import TaskListDashboard from "@/components/TaskListDashboard";

const Dashboard = () => {
  const { tasks } = useTasks();

  const [stats, setStats] = useState({
    totalTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: TrendingUp,
      color_title: "text-gray-600",
      color_value_icon: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Clock,
      color_title: "text-gray-600",
      color_value_icon: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color_title: "text-gray-600",
      color_value_icon: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertCircle,
      color_title: "text-gray-600",
      color_value_icon: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "text-white bg-red-500";
      case "High":
        return "text-white bg-orange-600";
      case "Medium":
        return "text-gray-900 bg-yellow-400";
      default:
        return "text-white bg-gray-400";
    }
  };

  useEffect(() => {
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const overdueTasks = tasks.filter((t) => t.status === "Overdue").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status !== "Completed" && t.status !== "Overdue"
    ).length;

    setStats({
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
      overdueTasks,
    });
  }, [tasks]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks.filter((t) => {
    const start = t.startDate ? new Date(t.startDate).toDateString() : "";
    const due = t.dueDate ? new Date(t.dueDate).toDateString() : "";
    return start === today.toDateString() || due === today.toDateString();
  });

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.status !== "Completed" && new Date(task.dueDate) > new Date()
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <TaskListDashboard
          title="Today's Tasks"
          tasks={todayTasks}
          emptyMessage="No tasks for today"
          getPriorityColor={getPriorityColor}
        />

        <TaskListDashboard
          title="Upcoming Tasks"
          tasks={upcomingTasks}
          emptyMessage="No upcoming tasks"
          getPriorityColor={getPriorityColor}
        />
      </div>
    </div>
  );
};

export default Dashboard;
