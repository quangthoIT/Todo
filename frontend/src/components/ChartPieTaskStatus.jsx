import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartPieTaskStatus = ({ statusStats, title }) => {
  const chartData = [
    {
      key: "completed",
      name: "Completed",
      value: statusStats.completed,
      fill: "var(--chart-completed)",
    },
    {
      key: "inProgress",
      name: "In Progress",
      value: statusStats.inProgress,
      fill: "var(--chart-inProgress)",
    },
    {
      key: "pending",
      name: "Pending",
      value: statusStats.pending,
      fill: "var(--chart-pending)",
    },

    {
      key: "overdue",
      name: "Overdue",
      value: statusStats.overdue,
      fill: "var(--chart-overdue)",
    },
  ];

  const chartConfig = {
    overdue: { label: "Overdue", color: "var(--chart-overdue)" },
    completed: { label: "Completed", color: "var(--chart-completed)" },
    inProgress: { label: "In Progress", color: "var(--chart-inProgress)" },

    pending: { label: "Pending", color: "var(--chart-pending)" },
  };

  const total = statusStats.totalTasks;

  // ----- KHI KHOẢNG THỜI GIAN KHÔNG CÓ DỮ LIỆU -----
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            <div className="text-center">
              <p className="text-xl font-medium">No tasks found</p>
              <p className="text-sm mt-1">
                Try selecting a different date range
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ----- KHI KHOẢNG THỜI GIAN CÓ Dữ LIỆU -----
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>

      <CardContent className="space-y-3">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && viewBox.cx && viewBox.cy) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 5}
                          className="fill-black text-5xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 25}
                          className="text-base fill-black"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartPieTaskStatus;
