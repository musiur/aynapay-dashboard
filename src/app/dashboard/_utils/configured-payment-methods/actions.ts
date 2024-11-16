"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;

export const A__GET__ConfiguredPaymentMethods = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }

        const response = await fetch(`${BASEURL}/users/configured-payment-methods`, {
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
            messsage: "Something went wrong!"
        }
    }
}

export const A__DELETE__ConfiguredPaymentMethods = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                messasge: "Unauthenticated! Please login again."
            }
        }
        const response = await fetch(`${BASEURL}/users/configured-payment-methods/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        const result = await response.json();
        revalidatePath("/dashboard/configured-payment-methods")
        return result;

    } catch (error) {
        return {
            success: false,
            messsage: "Something went wrong!"
        }
    }
}

export const A__POST__PaymentMethodConfigure = async (data: any) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/config-receiver-payment-methods/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/configured-payment-methods")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}