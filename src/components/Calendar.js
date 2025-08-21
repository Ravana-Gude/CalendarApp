import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import Modal from "./Modal";

export default function Calendar({ events, onSelectEvent }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreDate, setMoreDate] = useState("");
  const [moreEvents, setMoreEvents] = useState([]);

  const today = dayjs().format("YYYY-MM-DD");
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.date] = map[e.date] ? [...map[e.date], e] : [e];
    });
    return map;
  }, [events]);

  const openMore = (dateStr) => {
    setMoreDate(dateStr);
    setMoreEvents(eventsByDate[dateStr] || []);
    setMoreOpen(true);
  };

  const cell = (d) => {
    const dateStr = currentMonth.date(d).format("YYYY-MM-DD");
    const dayEvents = eventsByDate[dateStr] || [];

    // conflict detection (same date & same time)
    const conflicts = dayEvents.filter(
      (e1, i) => dayEvents.findIndex(e2 => e2.time === e1.time) !== i
    );

    return (
      <div
        key={d}
        className={`rounded-2xl border p-3 min-h-[120px] transition cursor-default
        ${dateStr === today ? "bg-blue-100 border-blue-500" : "bg-white"}
        hover:shadow-md`}
      >
        <div className="flex items-center justify-between mb-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full
              ${dateStr === today ? "bg-blue-500 text-white font-bold" : "text-gray-700"}`}
          >
            {d}
          </div>
        </div>

        <div className="space-y-1">
          {dayEvents.slice(0, 2).map((ev) => (
            <EventCard key={ev.id} event={ev} onClick={onSelectEvent} />
          ))}
          {dayEvents.length > 2 && (
            <button
              onClick={() => openMore(dateStr)}
              className="text-xs text-blue-600 underline"
            >
              +{dayEvents.length - 2} more
            </button>
          )}
        </div>

        {conflicts.length > 0 && (
          <div className="text-xs text-red-500 mt-1">⚠ Conflict</div>
        )}
      </div>
    );
  };

  const grid = [];
  for (let i = 0; i < startDay; i++) grid.push(<div key={`e-${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) grid.push(cell(d));

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))} className="btn btn-ghost">← Prev</button>
          <h2 className="text-2xl font-bold">{currentMonth.format("MMMM YYYY")}</h2>
          <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))} className="btn btn-ghost">Next →</button>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-gray-500 mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">{grid}</div>
      </div>

      <Modal isOpen={moreOpen} onClose={() => setMoreOpen(false)} title={`Events on ${moreDate}`}>
        <div className="space-y-3">
          {moreEvents.map((ev) => (
            <button
              key={ev.id}
              className="w-full text-left p-3 rounded-lg bg-blue-50 border-l-4 border-blue-500 shadow-sm hover:bg-blue-100"
              onClick={() => {
                setMoreOpen(false);
                onSelectEvent?.(ev);
              }}
            >
              <p className="font-semibold">{ev.title}</p>
              <p className="text-sm text-gray-600">
                {ev.time ? ev.time : "—"} {ev.duration ? `• ${ev.duration}` : ""}
              </p>
            </button>
          ))}
          {moreEvents.length === 0 && <p className="text-gray-500">No events.</p>}
        </div>
      </Modal>
    </>
  );
}
