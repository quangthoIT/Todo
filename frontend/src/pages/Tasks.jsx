import React, { useState } from "react";
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

  // Hàm đổi trạng thái task
  const handleToggleTaskStatus = async (taskId) => {
    // Tìm kiếm task theo id
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    // Cập nhật trạng thái task
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await updateTask(taskId, {
      status: newStatus,
      completed: newStatus === "Completed",
      completedAt: newStatus === "Completed" ? new Date().toISOString() : null,
    });
  };

  // Lọc danh sách tasks theo từ khóa và bộ lọc
  const filteredTasks = tasks.filter((task) => {
    // Lọc theo từ khóa
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    // Lọc theo trạng thái
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    // Lọc theo độ ưu tiên
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-4">
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

      {/* Create Task Dialog */}
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
