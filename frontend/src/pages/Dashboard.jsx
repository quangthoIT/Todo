import React from "react";
import TaskList from "@/components/TaskList";
import { useDashboardData } from "@/hooks/useDashboarData";
import StatsDashboard from "@/components/StatsDashboard";

const Dashboard = () => {
  const { stats, todayTasks, upcomingTasks } = useDashboardData();

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today
        </p>
      </div>

      {/* Stats Dashboard */}
      <StatsDashboard stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Lists - Today's Tasks */}
        <TaskList
          title="Today's Tasks"
          tasks={todayTasks}
          emptyMessage="No tasks for today"
          showActions={false}
          showCheckbox={false}
        />

        {/* Task Lists - Upcoming Tasks */}
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
