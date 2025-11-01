import calendarEvent from "../models/calendarEventModel.js";

// --- LẤY THÔNG TIN CÁC EVENT CỦA NGƯỜI DÙNG ---
export const getAllEvents = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = { userId: req.user._id };

    if (start && end) {
      query.startDate = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const events = await (await calendarEvent.find(query))
      .populate("taskId", "title")
      .sort({ startDate: 1 });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// --- LẤY MỘT EVENT ---
export const getEvent = async (req, res) => {
  try {
    const event = await calendarEvent
      .findOne({ _id: req.params.id, userId: req.user._id })
      .populate("taskId", "title");

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// --- TẠO EVENT ---
export const createEvent = async (req, res) => {
  try {
    const event = await calendarEvent.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// --- UPDATE EVENT ---
export const updateEvent = async (req, res) => {
  try {
    const event = await calendarEvent.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// --- XÓA EVENT ---
export const deleteEvent = async (req, res) => {
  try {
    const event = await calendarEvent.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
