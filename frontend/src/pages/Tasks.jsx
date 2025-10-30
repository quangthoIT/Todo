import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useTasks } from "@/hooks/useTasks";
import { TaskFilterBar } from "../components/TaskFilterBar";
import { CreateTaskDialog } from "../components/CreateTaskDialog";
import TaskList from "@/components/TaskList";

export default function Tasks() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setIsDialogOpen(false);
  };

  const handleToggleTaskStatus = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await updateTask(taskId, {
      status: newStatus,
      completed: newStatus === "Completed",
      completedAt: newStatus === "Completed" ? new Date().toISOString() : null,
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex items-center justify-between">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks and track progress
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex w-full md:w-auto items-center justify-center gap-2 md:py-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer"
        >
          <Plus />
          New Task
        </button>
      </div>

      {/* Filter + Task List */}
      <TaskList
        headerFilters={
          <TaskFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
          />
        }
        tasks={filteredTasks}
        onToggleTaskStatus={handleToggleTaskStatus}
        onDeleteTask={deleteTask}
        showCheckbox={true}
      />

      {/* Create Dialog */}
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={setIsDialogOpen}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
