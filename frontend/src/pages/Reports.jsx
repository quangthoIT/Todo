import React, { useState } from "react";
import HeaderPage from "@/components/HeaderPage";
import { useReportsData } from "@/hooks/useReportsData";
import ChartPieTaskStatus from "@/components/ChartPieTaskStatus";
import ChartBarPriority from "@/components/ChartBarPriority";
import ChartLineTaskTrend from "@/components/ChartLineTaskTrend";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const { statusStats, priorityStats, trendData } = useReportsData(dateRange);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPieTaskStatus
          statusStats={statusStats}
          title="Task Status Overview"
        />
        <ChartBarPriority
          priorityStats={priorityStats}
          title="Priority Distribution"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineTaskTrend trendData={trendData} title="Task Trend" />
      </div>
    </div>
  );
};

export default Reports;
