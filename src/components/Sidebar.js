import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, ListChecks } from "lucide-react";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition";

  const activeClass =
    "bg-blue-500 text-white";

  return (
    <div className="w-60 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Calendar size={18} /> Calendar
        </NavLink>

        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <ListChecks size={18} /> Upcoming Events
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <ListChecks size={18} /> Completed Events
        </NavLink>
      </nav>
    </div>
  );
}
