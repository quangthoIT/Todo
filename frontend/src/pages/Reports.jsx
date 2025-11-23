import React, { useState } from "react";
import HeaderPage from "@/components/HeaderPage";
import { useReportsData } from "@/hooks/useReportsData";
import ChartPieTaskStatus from "@/components/ChartPieTaskStatus";
import ChartBarPriority from "@/components/ChartBarPriority";
import ChartLineTaskTrend from "@/components/ChartLineTaskTrend";
import StatsReport from "@/components/StatsReport";
import ChartBarWeekly from "@/components/ChartBarWeekly";
import ChartRadialCompletion from "@/components/ChartRadialCompletion";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const { statusStats, completionRate, priorityStats, trendData, filtered } =
    useReportsData(dateRange);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <div className="space-y-4">
      <HeaderPage
        title="Reports & Analytics"
        description="Track your productivity and progress"
        showDateRangePicker={true}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      <StatsReport stats={statusStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ChartPieTaskStatus
          statusStats={statusStats}
          title="Task Status Breakdown"
        /> */}
        <ChartRadialCompletion
          title="Completion Rate"
          statusStats={statusStats}
          completionRate={completionRate}
        />
        <ChartBarPriority
          priorityStats={priorityStats}
          title="Task Priority Breakdown"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineTaskTrend trendData={trendData} title="Task Activity Trend" />
        <ChartBarWeekly filtered={filtered} title="Task By Weekday" />
      </div>
    </div>
  );
};

export default Reports;
