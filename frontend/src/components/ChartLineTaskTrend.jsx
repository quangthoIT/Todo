import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyStatus from "./EmptyStatus";
import { useTheme } from "@/contexts/ThemeContext";

const ChartLineTaskTrend = ({ title, trendData }) => {
  const { theme } = useTheme();
  const textColor =
    theme === "dark"
      ? "oklch(96.7% 0.003 264.542)"
      : "oklch(21% 0.034 264.665)";

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
      <EmptyStatus
        title={title}
        titleEmpty="No task trend data available"
        titleEmptyDesscription="Try selecting a different date range"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
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
              tick={{ fill: textColor, fontSize: 14 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: textColor, fontSize: 14 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-gray-900" />}
            />
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
