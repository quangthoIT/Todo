import React, { useEffect, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "../components/CreateTaskDialog";
import TaskList from "@/components/TaskList";
import TaskFilterBar from "@/components/TaskFilterBar";
import HeaderPage from "@/components/HeaderPage";
import TaskPagination from "@/components/TaskPagination";

const Tasks = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const numberTasksOnPage = 10;

  // 🧠 Hàm đổi trạng thái task
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

  // 🔍 Lọc danh sách tasks
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

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredTasks.length / numberTasksOnPage);
  // Xác định vị trí của task cuối cùng trên trang hiện tại
  const indexOfLastTask = currentPage * numberTasksOnPage;
  // Xác định vị trí của task đầu tiên trên trang hiện tại
  const indexOfFirstTask = indexOfLastTask - numberTasksOnPage;
  // Cắt danh sách task thuộc trang hiện tại
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Nếu đổi filter/search - quay lại trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, filterPriority]);

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
        tasks={currentTasks}
        emptyMessage="No tasks found"
        onToggleTaskStatus={handleToggleTaskStatus}
        onDeleteTask={deleteTask}
        onEditTask={(task) => {
          setEditingTask(task);
          setIsDialogOpen(true);
        }}
        showCheckbox={true}
      />

      {/* 📄 Pagination */}
      <TaskPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
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
