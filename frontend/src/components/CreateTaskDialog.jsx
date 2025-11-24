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
import { toast } from "sonner";

// Hàm chuyển datetime-local sang ISO string (giữ nguyên timezone địa phương)
const localDateTimeToISO = (dateTimeLocalString) => {
  if (!dateTimeLocalString) return null;
  const date = new Date(dateTimeLocalString);
  return date.toISOString();
};

// Hàm chuyển ISO string sang datetime-local format để hiển thị trong input
const isoToLocalDateTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const CreateTaskDialog = ({ isOpen, onClose, onSubmit, task: editingTask }) => {
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
        startDate: isoToLocalDateTime(editingTask.startDate),
        dueDate: isoToLocalDateTime(editingTask.dueDate),
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

  // Hàm xử lý người dùng "Create" hay "Update"
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();

    // Chuyển datetime-local string sang Date object
    const start = task.startDate ? new Date(task.startDate) : now;
    const due = task.dueDate ? new Date(task.dueDate) : null;

    // Kiểm tra nhập ngày bắt đầu và hạn kết thúc
    if (!due) {
      toast.error("Due Date is required!");
      return;
    }

    // Kiểm tra ngày bắt đầu phải nhỏ hơn ngày kết thúc
    if (start > due) {
      toast.error("Start Date must be before Due Date!");
      return;
    }

    // Chuyển sang ISO string để gửi lên server
    const taskData = {
      ...task,
      startDate: localDateTimeToISO(task.startDate) || now.toISOString(),
      dueDate: localDateTimeToISO(task.dueDate),
      _id: editingTask?._id,
    };

    onSubmit(taskData);

    setTask({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "Medium",
    });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
          <DialogDescription>
            {editingTask
              ? "Update the task details below"
              : "Fill in the details below"}
          </DialogDescription>
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
            required
          />

          {/* Create Button & Cancel Button */}
          <DialogFooter>
            <Button type="submit" variant="default">
              {editingTask ? "Update" : "Create"}
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
};

export default CreateTaskDialog;
