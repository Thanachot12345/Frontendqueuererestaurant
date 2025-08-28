import { config } from "../config/config";
export interface FromSearchTicket {
    id?: string;
    phone?: string;
    date?: string;
    all: boolean;
}

export const searchTickets = async () => {
    const url = `${config.API_URL}/api/queue/detail`;
    console.log("Fetching tickets from URL:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        // log status code และ headers
        console.log("Response status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));

        // ถ้าไม่ใช่ 2xx → อ่าน text ก่อน log
        if (!response.ok) {
            const text = await response.text();
            console.error("HTTP error response:", text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // ตรวจสอบว่าเป็น JSON จริงหรือไม่
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Expected JSON but got something else:", text);
            throw new Error("Server did not return JSON");
        }

        // parse JSON
        const data = await response.json();
        console.log("Fetched data:", data);
        // return data;

    } catch (error) {
        console.error("Error searching tickets:", error);
        throw error;
    }
};


export const searchTicketsID = async (searchTicketsID: FromSearchTicket) => {
    console.log("Fetching tickets...", `${config.API_URL}/api/queue/${3}/detail`);
    try {
        const response = await fetch(`${config.API_URL}/api/queue/detail`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error searching tickets:", error);
        throw error;
    }
};
