import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import EmptyStatsStatus from "./EmptyStatsStatus";

const ChartRadialCompletion = ({ title, statusStats, completionRate }) => {
  const safeCompletionRate = Math.min(
    100,
    Math.max(0, Number(completionRate) || 0)
  );
  const totalTasks = statusStats?.totalTasks || 0;
  const completedTasks = statusStats?.completed || 0;

  const chartData = [
    {
      name: "completed",
      label: "Completed Tasks",
      value: completedTasks,
      fill: "var(--chart-completed)",
    },
    {
      name: "total",
      label: "Total Tasks",
      value: totalTasks,
      fill: "var(--chart-total)",
    },
  ];

  const chartConfig = {
    value: {
      label: "Tasks",
    },
    completed: {
      label: "Completed Tasks",
      color: "var(--chart-completed)",
    },
    total: {
      label: "Total Tasks",
      color: "var(--chart-total)",
    },
  };

  if (totalTasks === 0) {
    return (
      <EmptyStatsStatus
        title={title}
        titleEmpty="No task status data available"
      />
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white px-2 py-1 border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: data.fill }}
            />
            <span className="text-sm font-medium text-gray-900">
              {data.label}: {data.value}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full h-full flex items-center justify-center"
        >
          <RadialBarChart
            data={chartData}
            innerRadius="55%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            barGap={0}
            barCategoryGap={0}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          dy={0}
                          dominantBaseline="middle"
                          className="text-2xl md:text-3xl xl:text-4xl font-bold"
                        >
                          {safeCompletionRate}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            <ChartTooltip cursor={false} content={<CustomTooltip />} />

            <RadialBar dataKey="value" background cornerRadius={0} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartRadialCompletion;
