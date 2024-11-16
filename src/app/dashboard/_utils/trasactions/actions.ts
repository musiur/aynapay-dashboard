"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;

export const A__GET__MyTransactions = async () => {
    try {
        const token = cookies().get("token")?.value;
        const role = cookies().get("role")?.value;
        if (!token) {
            return {
                success: false,
                message: "Unauthorized. Please login again!"
            }
        }

        if (!role) {
            return {
                success: false,
                message: "Role was not provided"
            }
        }

        const response = await fetch(`${BASEURL}/wallet/${["ADMIN", "MODERATOR"].includes(role) ? "transactions" : "own-transaction"}-history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store"
        })
        const result = await response.json();

        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}


export const A__POST__TransactionConfirmer = async (id: string, endpoint: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }

        const response = await fetch(`${BASEURL}${endpoint}${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();

        revalidatePath("/dashboard/transactions?tab=transactions");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}


export const A__GET__TransactionsHistory = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        const response = await fetch(`${BASEURL}/txn-event-logs/details/${id}`, {
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

export const A__GET__TransactionView = async (id: string, type: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }


        const endpoints: { [key: string]: string } = {
            payment: "/payment/info/",
            refund: "/refund/details/",
            withdraw: "/withdraw/details/",
            deposit: "/wallet/transaction-info/",
        }

        const endpoint = `${BASEURL}${endpoints[type.toLowerCase()]}${id}`;
        
        const response = await fetch(endpoint, {
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
