import React, { useEffect, useState } from "react";
import BackButton from "../assets/BackButton";
import type { SweetAlertIcon } from "sweetalert2";
import Swal from "sweetalert2";
import { confirmAttendance } from "../service/ConfirmAttendanceService";
import { searchTickets } from "../service/SearchTicketsService";

const ConfirmAttendance: React.FC = () => {
    const [tickets, settickets] = useState<any[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await searchTickets();
                if (data.success) {
                    settickets(data.data);
                } else {
                    console.error("Error fetching tickets:", data.message);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, []);

    const handleShowPopup = async (message: string, icon: SweetAlertIcon = "info", ticketid: number, isConfirmAttendance: boolean) => {
        Swal.fire({
            title: "แจ้งเตือน",
            text: message,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "green",
            cancelButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                confirmAttendance({ id: ticketid, confirmAttendance: isConfirmAttendance })
                    // .then((data) => {
                    //     if (data.status === "Success") {
                    //         Swal.fire("สำเร็จ", "ยืนยันการเข้าร่วมเรียบร้อยแล้ว", "success");
                    //     } else {
                    //         Swal.fire("ผิดพลาด", data.message, "error");
                    //     }
                    // })
                    // .catch((error) => {
                    //     console.error("Error confirming attendance:", error);
                    //     Swal.fire("ผิดพลาด", "ไม่สามารถยกเลิกการเข้าร่วมได้", "error");
                    // });
            }
        });
    };

    return (
        <main className="min-h-screen flex items-start justify-center bg-gray-50 text-gray-800">
            <div className="w-full  px-4 py-10">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        สถานะการจองคิว
                    </h1>
                    <p className="text-gray-500 mt-1">ติดตามสถานะ</p>
                </header>

                {/* ลิสต์การจองคิว */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <section
                            key={ticket.id}
                            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
                        >
                            {/* Queue Number */}
                            <div className="mb-6 sm:mb-8 rounded-lg bg-gray-100 text-center p-8">
                                <div className="text-4xl font-extrabold tracking-widest text-gray-900">
                                    #{ticket.ticketCode}
                                </div>
                                <div className="mt-2 text-sm text-gray-500">หมายเลขคิวของคุณ</div>
                            </div>

                            {/* Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                                <div className="space-y-1">
                                    <div className="text-gray-500">ชื่อ:</div>
                                    <div className="font-medium">{ticket.customerName}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-gray-500">จำนวนคิวที่รอ:</div>
                                    <div className="font-medium">{ticket.waitingAhead} คน</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-gray-500">สถานะการจองคิว:</div>
                                    <div className="font-medium">{ticket.queueStatus}</div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 space-y-2">
                                <button
                                    onClick={() => handleShowPopup(`คุณต้องการยืนยันคิว #${ticket.ticketCode}`, "warning", ticket.id, true)}
                                    className="w-full rounded-md border border-gray-300 bg-black text-white py-2.5 text-sm font-medium hover:text-black active:text-black hover:bg-gray-50 active:bg-gray-100"
                                >
                                    ยืนยันคิว
                                </button>

                                <button
                                    onClick={() => handleShowPopup(`คุณต้องการยกเลิกคิว #${ticket.queue}`, "warning", ticket.id, false)}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100"
                                >
                                    ยกเลิกคิว
                                </button>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <BackButton className="">ย้อนกลับ</BackButton>
                </div>
            </div>
        </main>
    );
};

export default ConfirmAttendance;
