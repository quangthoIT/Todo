import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Hourglass,
  TrendingUp,
} from "lucide-react";
import StatsCard from "./StatsCard";

const StatsReport = ({ statusStats }) => {
  const statCards = [
    {
      title: "Total Tasks",
      value: statusStats.totalTasks,
      icon: TrendingUp,
      colorTitle: "text-gray-800",
      colorValueIcon: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      title: "Pending",
      value: statusStats.pending,
      icon: Hourglass,
      colorTitle: "text-gray-800",
      colorValueIcon: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "In Progress",
      value: statusStats.inProgress,
      icon: Clock,
      colorTitle: "text-gray-800",
      colorValueIcon: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed",
      value: statusStats.completed,
      icon: CheckCircle2,
      colorTitle: "text-gray-800",
      colorValueIcon: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Overdue",
      value: statusStats.overdue,
      icon: AlertCircle,
      colorTitle: "text-gray-800",
      colorValueIcon: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
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

export default StatsReport;
