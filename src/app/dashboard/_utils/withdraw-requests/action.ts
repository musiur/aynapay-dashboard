"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

const BASEURL = process.env.BASEURL


export const A__GET__AllWithdrawRequests = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        const response = await fetch(`${BASEURL}/withdraw/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export const A__PATCH__WithdrawStatus = async (data: { id: string, status: string, note?: string }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        
        const response = await fetch(`${BASEURL}/withdraw/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        
        revalidatePath("/dashboard/withdraw-requests");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export const A__POST__WithdrawConfirmer = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        const response = await fetch(`${BASEURL}/withdraw/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: "Completed" }),
        });
        const result = await response.json();
        revalidatePath("/dashboard/withdraw-requests");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export const A__DELETE__WithdrawRequest = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        const response = await fetch(`${BASEURL}/users/withdraw-request/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        revalidatePath("/dashboard/withdraw-requests");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export const A__GET__SingleTransactionInfo = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }

        const response = await fetch(`${BASEURL}/wallet/transaction-info/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}