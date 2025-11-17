import React, { useState } from "react";
import HeaderPage from "@/components/HeaderPage";
import { useReportsData } from "@/hooks/useReportsData";

const Reports = () => {
  const [period, setPeriod] = useState("week");
  const { stats } = useReportsData(period);

  return (
    <div className="space-y-4">
      <HeaderPage
        title="Reports & Analytics"
        description="Track your productivity and progress"
        showFilter={true}
      />

      <div className="flex justify-center py-10">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#3B82F6"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${stats.productivity * 3.51} 351.68`}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold">{stats.productivity}%</p>
            </div>
          </div>
          <p className="text-gray-600 mt-3">Productivity Score</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
