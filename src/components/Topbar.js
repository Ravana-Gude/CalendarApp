import React from "react";

export default function Topbar({ view, setView, onAddEvent }) {
  const btn = (key, label) => (
    <button
      onClick={() => setView(key)}
      className={`btn ${
        view === key ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="card flex items-center justify-between">
      <div className="flex gap-2">
        {btn("monthly", "Monthly")}
        {btn("weekly", "Weekly")}
        {btn("yearly", "Yearly")}
      </div>
      <div className="flex gap-2">
        <button onClick={onAddEvent} className="btn btn-primary">+ Add Event</button>
      </div>
    </div>
  );
}
