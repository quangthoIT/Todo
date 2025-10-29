import Task from "../models/taskModel.js";

// ----- TẠO TASK MỚI -----
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      startDate,
      dueDate,
      completed,
    } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      status,
      startDate,
      dueDate,
      completed: completed || false,
      createdBy: req.user._id,
    });

    if (task.completed || task.status === "Completed") {
      task.completedAt = new Date();
    }
    const savedTask = await task.save();
    res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lỗi server khi tạo task", error });
  }
};

// ----- LẤY TẤT CẢ CÁC TASK -----
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi lấy task", error });
  }
};

// ----- LẤY TASK THEO ID -----
export const getTaskbyId = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy task." });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi lấy task", error });
  }
};

// ----- CẬP NHẬT TASK -----
export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === "Yes" || data.completed === true;
    }

    if (data.completed || data.status === "Completed") {
      data.completedAt = new Date();
    } else if (data.completed === false) {
      data.completedAt = null;
    }

    const updated = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy task để cập nhật." });
    }
    res.status(200).json({ success: true, task: updated });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lỗi server khi cập nhật task", error });
  }
};

// ----- XÓA TASK -----
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy task để xóa." });
    }
    res.status(200).json({ success: true, task: deleted });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lỗi server khi xóa task", error });
  }
};
