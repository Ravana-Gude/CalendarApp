import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function CompletedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const past = events.filter(e =>
    dayjs(e.date).isBefore(dayjs(), "day")
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Events</h2>
      {past.length === 0 ? (
        <p className="text-gray-500">No completed events</p>
      ) : (
        <div className="grid gap-4">
          {past.map(ev => (
            <div
              key={ev.id}
              className="shadow-md rounded-2xl border p-4 hover:shadow-lg transition bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-600">
                {dayjs(ev.date).format("DD MMM YYYY")} at {ev.time}
              </p>
              <p className="text-sm text-gray-500"> {ev.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
