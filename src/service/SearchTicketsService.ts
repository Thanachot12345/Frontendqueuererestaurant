import { config } from "../config/config";
export interface FromSearchTicket {
    id?: string;
    phone?: string;
    date?: string;
    all: boolean;
}

export const searchTickets = async (formSearch: FromSearchTicket) => {
    try {
        const response = await fetch(`${config.API_URL}/api/SearchTickets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formSearch),
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error searching tickets:", error);
        throw error; 
    }
};