import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectField,
} from "@/components/ui/select";

export function CreateTaskDialog({
  isOpen,
  onClose,
  onSubmit,
  task: editingTask,
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    startDate: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        startDate: editingTask.startDate || "",
        dueDate: editingTask.dueDate || "",
      });
    } else {
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        startDate: "",
        dueDate: "",
      });
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      task.startDate &&
      task.dueDate &&
      new Date(task.startDate) > new Date(task.dueDate)
    ) {
      alert("Start Date must be before Due Date!");
      return;
    }
    onSubmit(task);
    if (!editingTask) {
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        startDate: "",
        dueDate: "",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Fill in the details below</DialogDescription>
        </DialogHeader>
        <div className="border-b border-gray-300"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <Input
            type="text"
            placeholder="Task Title"
            label="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />

          {/* Task Description */}
          <Textarea
            label="Description"
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          {/* Task Priority */}
          <SelectField label="Priority">
            <Select
              value={task.priority}
              onValueChange={(value) => setTask({ ...task, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </SelectField>

          {/* Task Start Date */}
          <Input
            label="Start Date & Time"
            type="datetime-local"
            value={task.startDate}
            onChange={(e) => setTask({ ...task, startDate: e.target.value })}
          />

          {/* Task Due Date */}
          <Input
            label="Due Date & Time"
            type="datetime-local"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />

          {/* Create Button & Cancel Button */}
          <DialogFooter>
            <Button type="submit" variant="default">
              Create
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
