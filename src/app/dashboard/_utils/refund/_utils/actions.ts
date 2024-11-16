"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { A__GET__ProfileInfo } from "../../customers/action";
import { T__Schema__RefundCreate } from "../refund-create";
import { T__Schema__RefundSubmit } from "../refund-submit";

const BASEURL = process.env.BASEURL;

export const A__POST__Refund = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/refund/accept/${id}`, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({})
        });
        const result = await response.json();
        revalidatePath("/dashboard/refunds");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__POST__RefundCreate = async (data: T__Schema__RefundCreate) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/refund/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/refunds")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__POST__RefundSubmit = async (data: T__Schema__RefundSubmit, sessionId: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/refund/submit-refund-info/${sessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/refunds")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}



export const A__GET__Refunds = async (tag: "all" | "own" | "issued") => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const role = cookies().get("role")?.value;
        if (!role) {
            return { success: false, message: "Role was not defined" }
        }

        const userdata = await A__GET__ProfileInfo();
        const balance = userdata?.data?.wallet?.balance || 0;

        const paths: { all: string, own: string, issued: string } = {
            all: `list?amount=${balance}`,
            own: "earn-history",
            issued: "issue-history"
        }


        const response = await fetch(`${BASEURL}/refund/${paths[tag]}`, {
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

export const A__GET__RefundSessionRetrive = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/refund/retrieve-session/${id}`, {
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

export const A__GET__RefundDetails = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/refund/details/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        return result;
        // let modifiedResult: any = null;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const A__POST__RefundApprove = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/refund/confirm/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({})
        })
        const result = await response.json();
        revalidatePath("/dashboard/transactions?tab=refund")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}