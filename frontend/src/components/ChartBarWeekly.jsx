import React from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyStatus from "./EmptyStatus";

const ChartBarWeekly = ({ title, filtered }) => {
  // Tính số lượng tasks theo từng ngày trong tuần
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.getDay();
  };

  // Khởi tạo data cho 7 ngày trong tuần
  const weekDays = [
    { day: "Monday", short: "Mon", count: 0, fill: "var(--chart-weekly)" },
    { day: "Tuesday", short: "Tue", count: 0, fill: "var(--chart-weekly)" },
    { day: "Wednesday", short: "Wed", count: 0, fill: "var(--chart-weekly)" },
    { day: "Thursday", short: "Thu", count: 0, fill: "var(--chart-weekly)" },
    { day: "Friday", short: "Fri", count: 0, fill: "var(--chart-weekly)" },
    { day: "Saturday", short: "Sat", count: 0, fill: "var(--chart-weekly)" },
    { day: "Sunday", short: "Sun", count: 0, fill: "var(--chart-weekly)" },
  ];

  // Đếm số tasks theo ngày
  if (filtered && filtered.length > 0) {
    filtered.forEach((task) => {
      const dayIndex = getDayOfWeek(task.startDate);
      const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      weekDays[mappedIndex].count++;
    });
  }

  const chartConfig = {
    count: {
      label: "Tasks",
      color: "var(--chart-weekly)",
    },
  };

  const totalTasks = filtered?.length || 0;

  if (totalTasks === 0) {
    return (
      <EmptyStatus
        title={title}
        titleEmpty="No weekly task data available"
        titleEmptyDesscription="Try selecting a different date range"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={weekDays}
            layout="vertical"
            margin={{
              left: -24,
              right: 8,
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tick={{ fill: "black", fontSize: 14 }} />
            <YAxis
              dataKey="short"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
              tick={{ fill: "black", fontSize: 14 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {props.payload.day}:
                      </span>
                      <span>{value} tasks</span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="count" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartBarWeekly;
