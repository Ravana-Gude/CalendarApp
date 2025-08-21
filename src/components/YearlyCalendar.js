import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

function MiniMonth({ monthStart, eventsByDate }) {
  const month = monthStart.month();
  const year = monthStart.year();
  const label = monthStart.format("MMM");

  const daysInMonth = monthStart.daysInMonth();
  const startDay = monthStart.startOf("month").day();

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(<div key={`e-${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = dayjs(new Date(year, month, d)).format("YYYY-MM-DD");
    const hasEvents = (eventsByDate[dateStr] || []).length > 0;
    cells.push(
      <div key={d} className={`h-7 w-7 rounded-md text-[10px] flex items-center justify-center border ${hasEvents ? "bg-blue-100 border-blue-400" : "bg-white"}`}>
        {d}
      </div>
    );
  }

  return (
    <div className="border rounded-2xl p-3">
      <div className="text-sm font-semibold mb-2">{label}</div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-500 mb-1">
        {["S","M","T","W","T","F","S"].map((d)=> <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
}

export default function YearlyCalendar({ events }) {
  const [year, setYear] = useState(dayjs().year());

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.date] = map[e.date] ? [...map[e.date], e] : [e];
    });
    return map;
  }, [events]);

  const months = Array.from({ length: 12 }, (_, m) => dayjs(new Date(year, m, 1)));

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setYear(year - 1)} className="btn btn-ghost">← {year - 1}</button>
        <h2 className="text-2xl font-bold">{year}</h2>
        <button onClick={() => setYear(year + 1)} className="btn btn-ghost">{year + 1} →</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {months.map((m) => (
          <MiniMonth key={m.month()} monthStart={m} eventsByDate={eventsByDate} />
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Highlighted days have at least one event.
      </div>
    </div>
  );
}
