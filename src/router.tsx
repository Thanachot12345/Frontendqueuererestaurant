
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
            <Route path="/Home" element={<Home />} />
            <Route path="/Reserve" element={<Reserve />} />
            <Route path="/TicketStatus" element={<TicketStatus />} />
            <Route path="/ConfirmAttendance" element={<ConfirmAttendance />} />
            <Route path="/SearchTickets" element={<SearchTickets />} />
        </Routes>
    );
}

