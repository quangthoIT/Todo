import React from "react";
import TaskList from "@/components/TaskList";
import { useDashboardData } from "@/hooks/useDashboarData";
import StatsDashboard from "@/components/StatsDashboard";
import HeaderPage from "@/components/HeaderPage";

const Dashboard = () => {
  const { stats, todayTasks, upcomingTasks } = useDashboardData();

  return (
    <div className="space-y-4">
      {/* Header */}
      <HeaderPage
        title="Dashboard"
        description="Welcome back! Here's what's happening today"
        showButton={false}
      />

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
