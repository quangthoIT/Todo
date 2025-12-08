import groupTaskModel from "../models/groupTaskModel.js";
import groupModel from "../models/groupModel.js";

// ----- TẠO TASK CHO NHÓM -----
export const createGroupTask = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { title, description, assignedTo, priority, startDate, dueDate } =
      req.body;
    const userId = req.user._id; // ID người tạo task

    // Kiểm tra tiêu đề task
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    // Kiểm tra người được giao
    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Please assign the task to a member",
      });
    }

    // Lấy thông tin nhóm
    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Chỉ Owner mới được tạo task
    if (group.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only group owner can create tasks",
      });
    }

    // Kiểm tra người được giao có phải thành viên nhóm
    const isMember = group.members.some(
      (member) => member.userId.toString() === assignedTo
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not a member of this group",
      });
    }

    // Tạo task mới
    const newTask = await groupTaskModel.create({
      groupId,
      title: title.trim(),
      description: description?.trim() || "",
      assignedTo,
      assignedBy: userId,
      priority: priority || "Medium",
      startDate: startDate || null,
      dueDate: dueDate || null,
      status: "Pending",
    });

    // Populate thông tin người giao và người được giao
    await newTask.populate("assignedTo", "userName email avatar");
    await newTask.populate("assignedBy", "userName email avatar");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating group task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ----- LẤY TOÀN BỘ TASK CỦA NHÓM -----
export const getGroupTasks = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Kiểm tra user có phải thành viên nhóm
    const isMember = group.members.some(
      (member) => member.userId.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    // Lấy tất cả task trong nhóm
    const tasks = await groupTaskModel
      .find({ groupId })
      .populate("assignedTo", "userName email avatar")
      .populate("assignedBy", "userName email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching group tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ----- LẤY TASK CỦA CHÍNH USER TRONG NHÓM -----
export const getMyGroupTasks = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isMember = group.members.some(
      (member) => member.userId.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    // Lấy task được giao cho chính user
    const tasks = await groupTaskModel
      .find({ groupId, assignedTo: userId })
      .populate("assignedTo", "userName email avatar")
      .populate("assignedBy", "userName email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching my group tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ----- CẬP NHẬT THÔNG TIN TASK -----
export const updateGroupTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo, priority, startDate, dueDate } =
      req.body;
    const userId = req.user._id;

    const task = await groupTaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const group = await groupModel.findById(task.groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Chỉ Owner mới được update task
    if (group.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only group owner can update task details",
      });
    }

    // Update các trường nếu có
    if (title) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (assignedTo) {
      const isMember = group.members.some(
        (member) => member.userId.toString() === assignedTo
      );
      if (!isMember) {
        return res.status(400).json({
          success: false,
          message: "Assigned user is not a member of this group",
        });
      }
      task.assignedTo = assignedTo;
    }
    if (priority) task.priority = priority;
    if (startDate !== undefined) task.startDate = startDate || null;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    await task.save();
    await task.populate("assignedTo", "userName email avatar");
    await task.populate("assignedBy", "userName email avatar");

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating group task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ----- CẬP NHẬT TRANG THÁI TASK -----
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    // Kiểm tra trạng thái hợp lệ
    if (!status || !["Pending", "inProgress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const task = await groupTaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Chỉ người được giao mới update status
    if (task.assignedTo.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update status of tasks assigned to you",
      });
    }

    task.status = status;
    if (status === "Completed") {
      task.completedAt = new Date();
    } else {
      task.completedAt = null;
    }

    await task.save();
    await task.populate("assignedTo", "userName email avatar");
    await task.populate("assignedBy", "userName email avatar");

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ----- XÓA TASK -----
export const deleteGroupTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const task = await groupTaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const group = await groupModel.findById(task.groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Chỉ Owner mới xóa task
    if (group.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only group owner can delete tasks",
      });
    }

    await groupTaskModel.findByIdAndDelete(taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting group task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
