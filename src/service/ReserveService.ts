import { config } from "../config/config";
export interface FormTicket {
  customerName: string;
  phone: string;
  people: number;
  note: string;
}

// ฟังก์ชันเรียก API
export const createTicket = async (ticket: FormTicket) => {
  try {
    const response = await fetch(`${config.API_URL}/api/queue/createticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};
