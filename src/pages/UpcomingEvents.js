import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const upcoming = events.filter(e =>
    dayjs(e.date).isAfter(dayjs(), "day")
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {upcoming.length === 0 ? (
        <p className="text-gray-500">No upcoming events</p>
      ) : (
        <div className="grid gap-4">
          {upcoming.map(ev => (
            <div
              key={ev.id}
              className="shadow-md rounded-2xl border p-4 hover:shadow-lg transition bg-white"
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
