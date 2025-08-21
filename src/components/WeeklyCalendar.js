import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import EventCard from "./EventCard";

export default function WeeklyCalendar({ events, onSelectEvent }) {
  const [anchor, setAnchor] = useState(dayjs()); // any date inside the week
  const start = anchor.startOf("week");
  const days = Array.from({ length: 7 }, (_, i) => start.add(i, "day"));

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.date] = map[e.date] ? [...map[e.date], e] : [e];
    });
    return map;
  }, [events]);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setAnchor(anchor.subtract(1, "week"))} className="btn btn-ghost">← Prev Week</button>
        <h2 className="text-xl font-bold">
          {start.format("MMM D")} – {start.add(6, "day").format("MMM D, YYYY")}
        </h2>
        <button onClick={() => setAnchor(anchor.add(1, "week"))} className="btn btn-ghost">Next Week →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {days.map((d) => {
          const key = d.format("YYYY-MM-DD");
          const list = eventsByDate[key] || [];
          const isToday = key === dayjs().format("YYYY-MM-DD");

          return (
            <div key={key} className={`rounded-2xl border p-3 ${isToday ? "bg-blue-50 border-blue-400" : "bg-white"}`}>
              <div className="font-semibold mb-2">
                {d.format("ddd DD")}
              </div>
              <div className="space-y-1">
                {list.length
                  ? list.map((ev) => <EventCard key={ev.id} event={ev} onClick={onSelectEvent} />)
                  : <div className="text-xs text-gray-400">No events</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
