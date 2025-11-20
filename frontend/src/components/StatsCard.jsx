import React from "react";
import { Card, CardContent } from "./ui/card";

const StatsCard = ({
  colorTitle,
  title,
  colorValueIcon,
  value,
  bg,
  icon: IconComponent,
}) => {
  return (
    <Card className="transition-shadow cursor-pointer hover:shadow-md">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-base ${colorTitle}`}>{title}</p>
            <p className={`mt-2 text-3xl font-bold ${colorValueIcon}`}>
              {value}
            </p>
          </div>
          <div className={`${bg} p-3 rounded-lg`}>
            <IconComponent className={`w-6 h-6 ${colorValueIcon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
