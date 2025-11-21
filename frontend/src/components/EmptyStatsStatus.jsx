import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const EmptyStatsStatus = ({ title, titleEmpty }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-center h-[250px]">
          <div className="text-center">
            <p className="text-xl font-medium">{titleEmpty}</p>
            <p className="text-sm mt-1">Try selecting a different date range</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyStatsStatus;
