import React from "react";

const categoryColors = {
  meeting: "bg-blue-400",
  call: "bg-emerald-400",
  deadline: "bg-rose-400",
  default: "bg-purple-400",
};

export default function EventCard({ event, onClick }) {
  const title = event.title?.toLowerCase() || "";
  const category = title.includes("meeting")
    ? "meeting"
    : title.includes("call")
    ? "call"
    : title.includes("deadline")
    ? "deadline"
    : "default";

  return (
    <button
      onClick={() => onClick?.(event)}
      className={`${categoryColors[category]} text-left text-white text-xs px-2 py-1 rounded-lg shadow truncate w-full`}
      title={`${event.title}${event.time ? " • " + event.time : ""}`}
    >
      {event.title} {event.time ? `(${event.time})` : ""}
    </button>
  );
}
