"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartPieDonutTaskStatus = ({ stats }) => {

  const chartData = [
    {
      key: "pending",
      name: "Pending",
      value: stats.pending,
      fill: "var(--chart-1)",
    },
    {
      key: "inProgress",
      name: "In Progress",
      value: stats.inProgress,
      fill: "var(--chart-2)",
    },
    {
      key: "completed",
      name: "Completed",
      value: stats.completed,
      fill: "var(--chart-3)",
    },
    {
      key: "overdue",
      name: "Overdue",
      value: stats.overdue,
      fill: "var(--chart-4)",
    },
  ];

  const chartConfig = {
    pending: { label: "Pending", color: "var(--chart-1)" },
    inProgress: { label: "In Progress", color: "var(--chart-2)" },
    completed: { label: "Completed", color: "var(--chart-3)" },
    overdue: { label: "Overdue", color: "var(--chart-4)" },
  };

  const total = stats.totalTasks;

  // Hiển thị thông báo nếu không có dữ liệu
  if (total === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Task Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-6">
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

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Status Overview</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
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
              innerRadius={60}
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
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground text-sm"
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

export default ChartPieDonutTaskStatus;