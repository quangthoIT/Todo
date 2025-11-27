import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getPriorityColor as getColorHelper } from "../lib/utils";

const TaskList = ({
  tasks,
  title,
  headerFilters,
  emptyMessage,
  getPriorityColor = getColorHelper,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  showActions = true,
  showCheckbox = true,
}) => {
  return (
    <Card>
      <CardHeader>
        {headerFilters || (
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        )}
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
                className={`flex items-center justify-between p-3 rounded-lg hover:shadow-md ${
                  task.status === "Completed"
                    ? "bg-green-200"
                    : task.status === "Overdue"
                    ? "bg-red-200"
                    : "bg-gray-100"
                } transition`}
              >
                {/* Checkbox */}
                <div className="flex items-center gap-3 flex-1">
                  {showCheckbox && (
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => onToggleTaskStatus(task._id)}
                      className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    {/* Title */}
                    <p
                      className={
                        task.status === "Completed" || task.status === "Overdue"
                          ? "text-gray-500 font-semibold"
                          : "text-gray-900 font-semibold"
                      }
                    >
                      {task.title}
                    </p>

                    {/* Description */}
                    {task.description && (
                      <p
                        className={
                          task.status === "Completed" ||
                          task.status === "Overdue"
                            ? "text-gray-400 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {task.description}
                      </p>
                    )}

                    {/* Start date and Due date */}
                    {(task.startDate || task.dueDate) && (
                      <div className="flex items-center gap-2 md:gap-3 text-xs text-gray-400">
                        {task.startDate && (
                          <p className="text-blue-500">
                            Start:{" "}
                            {new Date(task.startDate).toLocaleString([], {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        )}
                        {task.dueDate && (
                          <p className="text-red-400">
                            Due:{" "}
                            {new Date(task.dueDate).toLocaleString([], {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Completed at */}
                    {task.completedAt && (
                      <p className="text-xs text-green-600">
                        Completed at:{" "}
                        {new Date(task.completedAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                  {/* Priority */}
                  <p
                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </p>

                  {/* Nút edit/delete nếu được bật */}
                  {showActions && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditTask?.(task)}
                      >
                        <Pencil className="size-4 md:size-5 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteTask(task._id)}
                      >
                        <Trash2 className="size-4 md:size-5 text-red-600" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
