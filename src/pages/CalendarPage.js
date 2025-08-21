import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Calendar from "../components/Calendar";
import WeeklyCalendar from "../components/WeeklyCalendar";
import YearlyCalendar from "../components/YearlyCalendar";
import AddEventModal from "../components/AddEventModal";
import dayjs from "dayjs";

export default function CalendarPage() {
  const [view, setView] = useState("monthly");
  const [events, setEvents] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Load directly from events.json every time
  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const addEvent = (e) => {
    const id = events.length ? Math.max(...events.map((x) => x.id)) + 1 : 1;
    const record = { id, ...e, createdAt: dayjs().toISOString() };
    setEvents([...events, record]);
    setAddOpen(false);
  };

  const updateEvent = (patch) => {
    if (!selected) return;
    const updated = events.map((ev) =>
      ev.id === selected.id ? { ...ev, ...patch } : ev
    );
    setEvents(updated);
    setEditOpen(false);
    setSelected(null);
  };

  const deleteEvent = () => {
    if (!selected) return;
    setEvents(events.filter((ev) => ev.id !== selected.id));
    setEditOpen(false);
    setSelected(null);
  };

  const openEdit = (ev) => {
    setSelected(ev);
    setEditOpen(true);
  };

  return (
    <>
      <Topbar view={view} setView={setView} onAddEvent={() => setAddOpen(true)} />

      {view === "monthly" && <Calendar events={events} onSelectEvent={openEdit} />}
      {view === "weekly" && <WeeklyCalendar events={events} onSelectEvent={openEdit} />}
      {view === "yearly" && <YearlyCalendar events={events} />}

      
      <AddEventModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={addEvent}
      />
      <AddEventModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initial={selected}
        onSave={(form) => updateEvent(form)}
        onDelete={deleteEvent}
      />
    </>
  );
}
