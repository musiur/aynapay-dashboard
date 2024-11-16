"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;

export const A__POST__Document = async (data: FormData) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/documents/submit`, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: data
        });
        const result = await response.json();
        revalidatePath("/dashboard/documents");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__PATCH__Document = async (data: FormData, id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/documents/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: data.get("status") })
        });
        const result = await response.json();
        revalidatePath("/dashboard/documents")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__DELETE__Document = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/documents/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        revalidatePath("/dashboard/documents")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }

    }
}

export const A__GET__Documents = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const role = cookies().get("role")?.value;
        if (!role) {
            return { success: false, message: "Role was not defined" }
        }


        const response = await fetch(`${BASEURL}/documents${["ADMIN", "MODERATOR"].includes(role) ? "": "/own"}?limit=999`, {
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

export const A__GET__Document = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/documents/details/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        let modifiedResult: any = null;
        if (result?.data?.images) {
            modifiedResult = {
                success: true,
                data: {
                    ...result.data,
                    images: result.data.images.map((item: { imgUrl: string }) => item.imgUrl)
                }
            }
        }

        return modifiedResult;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}