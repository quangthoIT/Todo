import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Hourglass,
  TrendingUp,
} from "lucide-react";

const StatsDashboard = ({ stats }) => {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="transition-shadow cursor-pointer hover:shadow-md"
        >
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-base ${stat.color_title}`}>{stat.title}</p>
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
  );
};

export default StatsDashboard;
