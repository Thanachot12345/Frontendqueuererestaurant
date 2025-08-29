import React, { useEffect, useState } from "react";
import BackButton from "../assets/BackButton";
import Swal, { type SweetAlertIcon } from "sweetalert2";
import { useLocation } from "react-router-dom";
import { searchTicketsID, type FromSearchTicket } from "../service/SearchTicketsService";
import { confirmAttendance } from "../service/ConfirmAttendanceService";

type Ticket = {
  id: number;
  ticketCode: string;
  customerName: string;
  waitingAhead: number;
  queueStatus: string;
};

const TicketStatus: React.FC = () => {
  const location = useLocation();
  const formSearch = (location.state ?? {}) as FromSearchTicket;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleShowPopup = async (
    message: string,
    icon: SweetAlertIcon = "info",
    ticketid: number
  ) => {
    Swal.fire({
      title: "แจ้งเตือน",
      text: message,
      icon,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "green",
      cancelButtonColor: "purple", // เดิมพิมพ์ burple ผิด
    }).then((result) => {
      if (result.isConfirmed) {
        confirmAttendance({ id: ticketid, confirmAttendance: false });
      }
    });
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await searchTicketsID(formSearch);
        console.log("raw response:", res);

        // ดึง list ออกมาให้เป็น array เสมอ
        let list: unknown =
          res?.data?.items ?? // เคส API ส่ง { data: { items: [...] } }
          res?.data ?? // เคส API ส่ง { data: [...] } หรือ { data: { ...single } }
          res;

        // ปรับให้เป็น array เสมอ
        let arr: Ticket[] = [];
        if (Array.isArray(list)) {
          arr = list as Ticket[];
        } else if (list && typeof list === "object") {
          // บาง API ส่งตั๋วเดียวเป็น object
          arr = [list as Ticket];
        } else {
          arr = [];
        }

        setTickets(arr);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [formSearch]);

  return (
    <main className="min-h-screen flex items-start justify-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-5xl px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">สถานะการจองคิว</h1>
          <p className="text-gray-500 mt-1">ติดตามสถานะคิวของคุณได้ที่นี่</p>
        </header>

        {loading && <div className="text-center text-gray-500">กำลังโหลด...</div>}

        <div className="space-y-6">
          {(tickets ?? []).map((ticket) => (
            <section
              key={ticket.id}
              className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              <div className="mb-6 sm:mb-8 rounded-lg bg-gray-100 text-center p-8">
                <div className="text-4xl font-extrabold tracking-widest text-gray-900">
                  #{ticket.ticketCode}
                </div>
                <div className="mt-2 text-sm text-gray-500">หมายเลขคิวของคุณ</div>
              </div>

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

              <div className="mt-6">
                <button
                  onClick={() =>
                    handleShowPopup(
                      `คุณต้องการยกเลิกคิว #${ticket.ticketCode}`,
                      "warning",
                      ticket.id
                    )
                  }
                  className="w-full rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100"
                >
                  ยกเลิกการจองคิว
                </button>
              </div>
            </section>
          ))}
        </div>

        {!loading && (tickets ?? []).length === 0 && (
          <div className="text-center text-gray-500 mt-6">ไม่พบข้อมูลคิว</div>
        )}

        <div className="flex justify-center mt-4">
          <BackButton className="">ย้อนกลับ</BackButton>
        </div>
      </div>
    </main>
  );
};

export default TicketStatus;
