import React from "react";
import { format } from "date-fns";
import { Clock, TriangleAlert } from "lucide-react";
import { getPriorityColor } from "@/lib/utils";

const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  } catch {
    return dateString;
  }
};

// Tính thời gian còn lại
const getTimeRemaining = (dueDate) => {
  const now = new Date();
  const diff = new Date(dueDate) - now;

  if (diff < 0) {
    const minutesOver = Math.floor(Math.abs(diff) / (1000 * 60));
    const hoursOver = Math.floor(minutesOver / 60);
    if (hoursOver < 1) return `Overdue ${minutesOver} mins`;
    return `Overdue ${hoursOver} hours`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);

  if (minutes < 60) {
    return minutes <= 1 ? "1 min left" : `${minutes} mins left`;
  }

  if (hours < 12) return `${hours} hours left`;
};

const NotificationItem = ({ task, onClick }) => {
  const isOverdue =
    new Date(task.dueDate) < new Date() || task.status === "Overdue";
  const timeRemaining = getTimeRemaining(task.dueDate);

  const statusInfo = isOverdue
    ? { text: "Overdue", color: "text-red-500" }
    : { text: "In progress", color: "text-blue-500" };

  return (
    <div
      onClick={onClick}
      className={`px-2 py-1 md:px-6 md:py-4 rounded-lg hover:shadow-md transition bg-gray-100 dark:bg-gray-800
      `}
    >
      <div className="flex items-center gap-4">
        {/* Icon tròn bên trái */}
        <div
          className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
            isOverdue ? "bg-red-500" : "bg-blue-100 dark:bg-gray-100"
          }`}
        >
          <TriangleAlert
            className={`w-6 h-6 ${
              isOverdue ? "text-gray-100" : "text-blue-600"
            }`}
          />
        </div>

        <div className="flex-1 space-y-1">
          {/* Tiêu đề task */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {task.title}
          </h3>
          {/* Mô tả task */}
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-200 truncate">
              {task.description}
            </p>
          )}

          {/* Trang thái task */}
          <div className="flex flex-wrap items-center">
            <p
              className={`px-3 py-1 text-xs rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </p>

            <p
              className={`px-3 py-1 text-sm md:text-base font-medium ${statusInfo.color}`}
            >
              {statusInfo.text}
            </p>
          </div>

          {/* Thời gian task hết hạn */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-200">
            <Clock className="w-4 h-4" />
            <p>Due date: {formatDate(task.dueDate)}</p>
          </div>
        </div>

        {/* Thời gian còn bao lâu */}
        <div>
          {timeRemaining && (
            <p
              className={`flex-shrink-0 px-3 py-1 text-xs md:text-sm text-white rounded-full ${
                isOverdue ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {timeRemaining}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
