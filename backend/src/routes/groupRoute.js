import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import { createGroup } from "../controllers/groupController.js";
import { getUserGroups } from "../controllers/groupController.js";
import { getGroupById } from "../controllers/groupController.js";
import { updateGroup } from "../controllers/groupController.js";
import { deleteGroup } from "../controllers/groupController.js";
import { inviteMember } from "../controllers/groupController.js";
import { joinGroup } from "../controllers/groupController.js";
import { removeMember } from "../controllers/groupController.js";
import { leaveGroup } from "../controllers/groupController.js";
import {
  createGroupTask,
  deleteGroupTask,
  getGroupTasks,
  getMyGroupTasks,
  updateGroupTask,
  updateTaskStatus,
} from "../controllers/groupTaskController.js";

const groupRouter = express.Router();

groupRouter.post("/", authMiddleware, createGroup);
groupRouter.get("/", authMiddleware, getUserGroups);
groupRouter.get("/:groupId", authMiddleware, getGroupById);
groupRouter.put("/:groupId", authMiddleware, updateGroup);
groupRouter.delete("/:groupId", authMiddleware, deleteGroup);

groupRouter.post("/:groupId/invite", authMiddleware, inviteMember);
groupRouter.post("/join/:token", authMiddleware, joinGroup);
groupRouter.delete("/:groupId/members/:memberId", authMiddleware, removeMember);
groupRouter.post("/:groupId/leave", authMiddleware, leaveGroup);

groupRouter.post("/:groupId/tasks", authMiddleware, createGroupTask);
groupRouter.get("/:groupId/tasks", authMiddleware, getGroupTasks);
groupRouter.get("/:groupId/my-tasks", authMiddleware, getMyGroupTasks);
groupRouter.put("/tasks/:taskId", authMiddleware, updateGroupTask);
groupRouter.patch("/tasks/:taskId/status", authMiddleware, updateTaskStatus);
groupRouter.delete("/tasks/:taskId", authMiddleware, deleteGroupTask);

export default groupRouter;
