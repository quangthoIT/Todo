import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "../components/CreateTaskDialog";
import TaskList from "@/components/TaskList";
import TaskFilterBar from "@/components/TaskFilterBar";
import HeaderPage from "@/components/HeaderPage";

const Tasks = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

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
      <HeaderPage
        title="Tasks"
        description="Manage your tasks and track progress"
        showButton={true}
        onButtonClick={() => setIsDialogOpen(true)}
      />

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
        emptyMessage="No tasks found"
        onToggleTaskStatus={handleToggleTaskStatus}
        onDeleteTask={deleteTask}
        onEditTask={(task) => {
          setEditingTask(task);
          setIsDialogOpen(true);
        }}
        showCheckbox={true}
      />

      {/* Create Dialog */}
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSubmit={async (taskData) => {
          if (editingTask) {
            await updateTask(editingTask._id, taskData);
          } else {
            await createTask(taskData);
          }
          setEditingTask(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};

export default Tasks;
