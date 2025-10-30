import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In_Progress", "Completed", "Overdue"],
      default: "Pending",
    },
    startDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", function (next) {
  const now = new Date();

  if (this.startDate && this.dueDate && this.startDate > this.dueDate) {
    return next(new Error("Start date must be before due date"));
  }

  if (this.status !== "Completed") {
    if (this.startDate && now < this.startDate) {
      this.status = "Pending";
    } else if (this.dueDate && now >= this.startDate && now <= this.dueDate) {
      this.status = "In_Progress";
    } else if (this.dueDate && now > this.dueDate) {
      this.status = "Overdue";
    }
  }
  next();
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
