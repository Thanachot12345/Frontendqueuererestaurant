import React, { useState } from "react";
import type { FromSearchTicket } from "../service/SearchTicketsService";
import { searchTickets } from "../service/SearchTicketsService";
import Button from "../assets/Button";
import BackButton from "../assets/BackButton";
import { useNavigate } from "react-router-dom";
import Swal, { type SweetAlertIcon } from "sweetalert2";

const SearchTickets: React.FC = () => {
    const navigate = useNavigate();
    const [formSearch, setFormSearch] = useState<FromSearchTicket>({
        phone: '',
        date: '',
        all: false,
    });
console.log(formSearch)
    const handleShowPopup = (message: string, icon: SweetAlertIcon = "info") => {
        Swal.fire({
            title: "แจ้งเตือน",
            text: message,
            icon: icon,
            confirmButtonText: "ยกเลิก",
            confirmButtonColor: "red",
        });
    };

    const handleSubmit = async () => {
        if (!formSearch.date || !formSearch.phone  ||  formSearch.phone.length > 10 ||  formSearch.phone.length < 10) {
            handleShowPopup("กรุณากรอกวันเดือนและเบอร์โทรให้ถูกต้อง", "warning");
            return;
        }
        try {
            const data = await searchTickets(formSearch);
            console.log(data);
            if (data.status === "success") {
                 navigate("/TicketStatus", { state: formSearch });
            } else {
                handleShowPopup(data.message, "warning");
            }
        } catch (error) {
            handleShowPopup("ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้", "error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormSearch({
            ...formSearch,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-80 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                    <h1 className="text-center mb-4 font-bold">ข้อมูลการจองคิว</h1>

                    <input
                        type="date"
                        name="date"
                        placeholder="วันที้จอง (dd/mm)"
                        value={formSearch.date}
                        onChange={handleChange}
                        className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="number"
                        name="phone"
                        placeholder="เบอร์โทรศัพท์"
                        value={formSearch.phone}
                        onChange={handleChange}
                        className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <Button onClick={handleSubmit} className="w-full py-2 rounded-lg">ค้นหาคิว</Button>
                </div>
                <div className="flex justify-center mt-4">
                    <BackButton className="mt-4">กลับ</BackButton>
                </div>
            </div>
        </div>
    );
}
export default SearchTickets;