import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskDetailDialog from "./TaskDetailDialog";
import { useTasks } from "@/hooks/useTasks";
import CreateTaskDialog from "./CreateTaskDialog";


const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { tasks, updateTask, refreshTasks } = useTasks();
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (selectedTask && tasks.length > 0) {
      const updatedTask = tasks.find((t) => t._id === selectedTask._id);
      if (updatedTask) {
        setSelectedTask(updatedTask);
      }
    }
  }, [tasks]);

  const handleSelectEvent = (event) => {
    const task = tasks.find((t) => t._id === event.id);
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleEditTask = () => {
    setIsDetailOpen(false);
    setIsEditOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    await updateTask(updatedTask._id, updatedTask);
    setIsEditOpen(false);
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    const updatedTask = await updateTask(taskId, {
      status: newStatus,
      completed: newStatus === "Completed",
      completedAt: newStatus === "Completed" ? new Date().toISOString() : null,
    });

    if (updatedTask) {
      setSelectedTask(updatedTask);
    }

    await refreshTasks();
  };

  const events = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    start: new Date(task.startDate),
    end: new Date(task.dueDate),
    allDay: false,
    priority: task.priority,
    completed: task.status === "Completed",
    overdue: task.status === "Overdue",
  }));

  return (
    <div className="h-[calc(100vh-235px)] flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        view={view}
        onView={(newView) => setView(newView)}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        popup
        step={60}
        timeslots={1}
        showMultiDayTimes
        toolbar={true}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => {
          let backgroundColor;
          if (event.completed) {
            backgroundColor = "oklch(72.3% 0.219 149.579)";
          } else if (event.overdue) {
            backgroundColor = "oklch(63.7% 0.237 25.331)";
          } else {
            backgroundColor = "oklch(70.7% 0.022 261.325)";
          }

          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: "6px",
              padding: "0 6px",
            },
          };
        }}
        formats={{
          dayFormat: (date, culture, localizer) =>
            localizer.format(date, "ddd D", culture),
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "hh:mm A", culture),
        }}
      />

      <TaskDetailDialog
        task={selectedTask}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditTask}
        onToggleComplete={handleToggleComplete}
      />

      <CreateTaskDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdateTask}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskCalendar;
