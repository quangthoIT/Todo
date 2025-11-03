import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import TaskCalendar from "@/components/TaskCalendar";

const Calendar = () => {
  const { tasks, createTask, loading } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex items-center justify-between">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">
            Plan and track tasks directly below the calendar
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

      <TaskCalendar tasks={tasks} loading={loading} />

      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default Calendar;
