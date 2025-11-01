import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/calendarController.js";

const calendarRouter = express.Router();

calendarRouter
  .route("/")
  .get(authMiddleware, getAllEvents)
  .post(authMiddleware, createEvent);

calendarRouter
  .route("/:id")
  .get(authMiddleware, getEvent)
  .put(authMiddleware, updateEvent)
  .delete(authMiddleware, deleteEvent);

export default calendarRouter;
