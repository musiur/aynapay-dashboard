"use server";

import { cookies } from "next/headers";
import { T__Schema__PromoCode } from "./promo.column";
import { revalidatePath } from "next/cache";

const BASEURL = process.env.BASEURL;

export const A__POST__PromoCode = async (data: T__Schema__PromoCode) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/coupons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/promo-codes")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__PATCH__PromoCode = async (data: T__Schema__PromoCode) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/coupons/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/promo-codes")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__DELETE__PromoCode = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/coupons/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        revalidatePath("/dashboard/promo-codes")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }

    }
}

export const A__GET__PromoCodes = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/coupons/list?limit=999`, {
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

export const A__GET__PromoCode = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/coupons/${id}`, {
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