import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import TaskCalendar from "@/components/TaskCalendar";
import HeaderPage from "@/components/HeaderPage";

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
    <div className="space-y-4">
      {/* Header */}
      <HeaderPage
        title="Calendar"
        description="Plan and track tasks directly below the calendar"
        showButton={true}
        onButtonClick={() => setIsDialogOpen(true)}
      />

      {/* Calendar */}
      <TaskCalendar />

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default Calendar;
