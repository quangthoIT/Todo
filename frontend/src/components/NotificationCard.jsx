import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RefreshCw } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { Button } from "./ui/button";
import EmptyStatus from "./EmptyStatus";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notifications, title, onRefresh }) => {
  const navigate = useNavigate();

  if (notifications.length === 0) {
    return (
      <EmptyStatus
        title={title}
        titleEmpty="No notifications"
        titleEmptyDesscription="You currently have no upcoming task reminders"
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
        >
          <RefreshCw />
          Refresh
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {notifications.map((task) => (
            <NotificationItem
              key={task._id}
              task={task}
              onClick={() => navigate("/tasks")}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;