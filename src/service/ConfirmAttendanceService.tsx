import { config } from "../config/config";

interface FromConfirmAttendance {
    id: number;
    confirmAttendance: boolean;
}

export const confirmAttendance = async (formConfirm: FromConfirmAttendance) => {
    try {
        const response = await fetch(`${config.API_URL}/api/queue/ConfirmAttendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formConfirm),
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error confirming attendance:", error);
        throw error; 
    }
}