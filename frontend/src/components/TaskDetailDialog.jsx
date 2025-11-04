import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

const TaskDetailDialog = ({ task, isOpen, onClose, onEdit }) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            {task.description || "No description provided"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 text-sm mt-4">
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {(() => {
              const now = new Date();
              const start = new Date(task.startDate);
              const due = new Date(task.dueDate);

              if (task.completed) {
                return (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                );
              } else if (now < start) {
                return (
                  <span className="text-amber-600 font-semibold">Pending</span>
                );
              } else if (now >= start && now <= due) {
                return (
                  <span className="text-blue-600 font-semibold">
                    In Progress
                  </span>
                );
              } else if (now > due) {
                return (
                  <span className="text-red-600 font-semibold">Overdue</span>
                );
              }
            })()}
          </p>
          <p>
            <strong>Start Date: </strong>
            {new Date(task.startDate).toLocaleString()}
          </p>
          <p>
            <strong>Due Date: </strong>
            {new Date(task.dueDate).toLocaleString()}
          </p>
          {task.completed && (
            <p>
              <strong>Completed at: </strong>
              {new Date(task.completedAt).toLocaleString()}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" variant="default" onClick={onEdit}>
            Edit
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
