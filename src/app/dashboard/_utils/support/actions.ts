"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;

export const A__GET__SupportTickets = async () => {
    try {
        const token = cookies().get("token")?.value;
        const role = cookies().get("role")?.value;

        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            }
        }

        if (!role) {
            return {
                success: false,
                message: "Unauthorized",
            }
        }
        const response = await fetch(`${BASEURL}/support/${["ADMIN", "MODERATOR"].includes(role) ? "list" : "own"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch support tickets",
        };
    }
};

export const A__DELETE__SupportTicket = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        const response = await fetch(`${BASEURL}/support/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        revalidatePath("/dashboard/support");
        return data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete support ticket",
        };
    }
};

export const A__POST__SupportTicket = async (data: any) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            }
        }
        const response = await fetch(`${BASEURL}/support/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        revalidatePath("/dashboard/support");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to create support ticket",
        };
    }
};

export const A__GET__SupportTicketSingle = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        const response = await fetch(`${BASEURL}/support/id/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch support ticket",
        };
    }
}

export const A__POST__SupportTicketReply = async (data: any) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            }
        }
        const response = await fetch(`${BASEURL}/support/reply/${data?.ticketId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ message: data?.message }),
        });
        const result = await response.json();
        revalidatePath("/dashboard/support/view");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to reply to support ticket",
        };
    }
}


export const A__PATCH__SupportTicketMarkAsResolved = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Unauthorized",
            }
        }
        const response = await fetch(`${BASEURL}/support/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status: "CLOSED" }),
        });
        const result = await response.json();
        revalidatePath("/dashboard/support");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to mark as resolved",
        };
    }
}
