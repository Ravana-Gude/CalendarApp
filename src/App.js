import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarPage from "./pages/CalendarPage";
import UpcomingEvents from "./pages/UpcomingEvents";
import CompletedEvents from "./pages/CompletedEvents";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/upcoming" element={<UpcomingEvents />} />
          <Route path="/completed" element={<CompletedEvents />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
