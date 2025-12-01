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
      enum: ["Pending", "inProgress", "Completed", "Overdue"],
      default: "Pending",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
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

  if (!this.startDate) {
    this.startDate = now;
  }

  if (this.startDate && this.dueDate && this.startDate > this.dueDate) {
    return next(new Error("Start date must be before due date"));
  }

  if (this.status !== "Completed") {
    if (this.startDate && now < this.startDate) {
      this.status = "Pending";
    } else if (this.dueDate && now >= this.startDate && now <= this.dueDate) {
      this.status = "inProgress";
    } else if (this.dueDate && now > this.dueDate) {
      this.status = "Overdue";
    }
  }
  next();
});

const taskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default taskModel;
