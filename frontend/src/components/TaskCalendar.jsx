import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks }) => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const events = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    start: new Date(task.startDate),
    end: new Date(task.dueDate),
    allDay: false,
    priority: task.priority,
  }));
  return (
    <div className="h-[calc(100vh-250px)] flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        view={view}
        onView={(newView) => setView(newView)}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        popup
        step={60}
        timeslots={1}
        showMultiDayTimes
        toolbar={true}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              event.priority === "Urgent"
                ? "oklch(63.7% 0.237 25.331)"
                : event.priority === "High"
                ? "oklch(70.5% 0.213 47.604)"
                : event.priority === "Medium"
                ? "oklch(85.2% 0.199 91.936)"
                : "oklch(70.7% 0.022 261.325)",
            color: "white",
            borderRadius: "6px",
            padding: "2px 6px",
          },
        })}
        formats={{
          dayFormat: (date, culture, localizer) =>
            localizer.format(date, "ddd D", culture),
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "hh:mm A", culture),
        }}
      />
    </div>
  );
};

export default TaskCalendar;
