import React, { useState } from "react";
import HeaderPage from "@/components/HeaderPage";
import { useReportsData } from "@/hooks/useReportsData";
import ChartPieDonutTaskStatus from "@/components/ChartPieDonutTaskStatus";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const { stats } = useReportsData(dateRange);

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
      <ChartPieDonutTaskStatus stats={stats} />
    </div>
  );
};

export default Reports;