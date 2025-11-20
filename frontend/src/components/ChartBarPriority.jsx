import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartBarPriority = ({ priorityStats, title }) => {
  const chartData = [
    {
      priority: "Low",
      count: priorityStats.low,
      fill: "var(--chart-low)",
    },
    {
      priority: "Medium",
      count: priorityStats.medium,
      fill: "var(--chart-medium)",
    },
    {
      priority: "High",
      count: priorityStats.high,
      fill: "var(--chart-high)",
    },
    {
      priority: "Urgent",
      count: priorityStats.urgent,
      fill: "var(--chart-urgent)",
    },
  ];

  const chartConfig = {
    count: {
      label: "Tasks",
    },
    low: {
      label: "Low",
      color: "var(--chart-low)",
    },
    medium: {
      label: "Medium",
      color: "var(--chart-medium)",
    },
    high: {
      label: "High",
      color: "var(--chart-high)",
    },
    urgent: {
      label: "Urgent",
      color: "var(--chart-urgent)",
    },
  };

  const totalTasks =
    priorityStats.low +
    priorityStats.medium +
    priorityStats.high +
    priorityStats.urgent;

  // ----- KHI KHOẢNG THỜI GIAN KHÔNG CÓ TASK -----
  if (totalTasks === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-center h-[250px]">
            <div className="text-center">
              <p className="text-xl font-medium">No priority data available</p>
              <p className="text-sm mt-1">
                Try selecting a different date range
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ----- KHI KHOẢNG THỜI GIAN CÓ TASK-----
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              left: -30,
              right: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="priority"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tick={{ fill: "black", fontSize: 14 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "black", fontSize: 14 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartBarPriority;
