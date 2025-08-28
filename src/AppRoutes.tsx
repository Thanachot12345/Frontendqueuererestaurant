import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Reserve from "./pages/Reserve";
import TicketStatus from "./pages/TicketStatus";
import ConfirmAttendance from "./pages/ConfirmAttendance";
import SearchTickets from "./pages/SearchTickets";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/ticketstatus" element={<TicketStatus />} />
      <Route path="/confirmattendance" element={<ConfirmAttendance />} />
      <Route path="/searchtickets" element={<SearchTickets />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
