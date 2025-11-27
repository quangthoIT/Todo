import React from "react";
import { AlertCircle, CheckCircle2, Clock, Hourglass } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsDashboard = ({ stats }) => {
  const statCards = [
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Hourglass,
      colorTitle: "text-gray-800 dark:text-gray-100",
      colorValueIcon: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Clock,
      colorTitle: "text-gray-800 dark:text-gray-100",
      colorValueIcon: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      colorTitle: "text-gray-800 dark:text-gray-100",
      colorValueIcon: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertCircle,
      colorTitle: "text-gray-800 dark:text-gray-100",
      colorValueIcon: "text-red-600",
      bg: "bg-red-100",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          colorTitle={stat.colorTitle}
          colorValueIcon={stat.colorValueIcon}
          bg={stat.bg}
        />
      ))}
    </div>
  );
};

export default StatsDashboard;
