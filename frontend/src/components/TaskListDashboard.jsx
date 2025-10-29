import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const TaskListDashboard = ({
  title,
  tasks,
  emptyMessage,
  getPriorityColor,
}) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </CardHeader>

      <CardContent>
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-gray-500">{emptyMessage}</p>
        ) : (
          <div className="space-y-3">
            {/* Task item */}
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  task.status === "Completed"
                    ? "bg-green-200"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition`}
              >
                <div className="flex flex-col gap-1">
                  {/* Title */}
                  <span
                    className={
                      task.status === "Completed"
                        ? "line-through text-gray-500 font-semibold"
                        : "text-gray-900 font-semibold"
                    }
                  >
                    {task.title}
                  </span>

                  {/* Description */}
                  {task.description && (
                    <span
                      className={
                        task.status === "Completed"
                          ? "line-through text-gray-400 text-sm"
                          : "text-gray-500 text-sm"
                      }
                    >
                      {task.description}
                    </span>
                  )}

                  {/* Start date and Due date */}
                  {(task.startDate || task.dueDate) && (
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      {task.startDate && (
                        <span className="text-blue-500">
                          Start:{" "}
                          {new Date(task.startDate).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="text-red-500">
                          Due:{" "}
                          {new Date(task.dueDate).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Completed at */}
                  {task.completedAt && (
                    <span className="text-xs text-green-600">
                      Completed at:{" "}
                      {new Date(task.completedAt).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  )}
                </div>

                {/* Priority */}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskListDashboard;
