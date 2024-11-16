"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { A__GET__ProfileInfo } from "../customers/action";

const BASEURL = process.env.BASEURL;

export const A__POST__PaymentMethod = async (data: FormData) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/platform-payment-methods/create`, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: data
        });
        const result = await response.json();
        revalidatePath("/dashboard/payment-methods")

        return result;
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__PATCH__PaymentMethod = async (data: FormData, id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/platform-payment-methods/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        });
        const result = await response.json();

        revalidatePath("/dashboard/payment-methods")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__DELETE__PaymentMethod = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/platform-payment-methods/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        revalidatePath("/dashboard/payment-methods")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }

    }
}

export const A__GET__PaymentMethods = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/platform-payment-methods/list?limit=999`, {
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
            message: "Something went wrong"
        }
    }
}

export const A__GET__RefundPaymentMethods = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const fetchApiKey = await A__GET__ProfileInfo();
        const apiKey = fetchApiKey?.data?.developmentInfo?.apiKey || "";

        if (!apiKey) {
            return { success: false, message: "API Key was not found" }
        }

        const response = await fetch(`${BASEURL}/payment/methods`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "x-api-key": apiKey
            },
            cache: "no-store"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__GET__PaymentMethod = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/platform-payment-methods/details/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

