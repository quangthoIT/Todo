import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyStatsStatus from "./EmptyStatsStatus";

const ChartLineTaskTrend = ({ title, trendData }) => {
  const chartConfig = {
    created: {
      label: "Created",
      color: "var(--chart-created)",
    },
    completed: {
      label: "Completed",
      color: "var(--chart-completed)",
    },
  };

  if (!trendData || trendData.length === 0) {
    return (
      <EmptyStatsStatus
        title={title}
        titleEmpty="No task trend data available"
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
          <LineChart
            data={trendData}
            margin={{
              left: -24,
              right: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "black", fontSize: 14 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "black", fontSize: 14 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="created"
              type="monotone"
              stroke="var(--chart-created)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="completed"
              type="monotone"
              stroke="var(--chart-completed)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartLineTaskTrend;
