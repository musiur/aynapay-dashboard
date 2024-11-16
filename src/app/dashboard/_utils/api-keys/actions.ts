"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;

export const A__POST__GenerateApiKey = async (password: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Token was not provided",
            }
        }
        
        const response = await fetch(`${BASEURL}/users/generate-api-key`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password })
        });

        const result = await response.json();
        

        revalidatePath("/dashboard/api-keys")
        return result;
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__DELETE__RemoveApiKey = async (password: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Token was not provided",
            }
        }
        
        const response = await fetch(`${BASEURL}/users/remove-api-key`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password })
        });

        const result = await response.json();
        

        revalidatePath("/dashboard/api-keys")
        return result;
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong"
        }
    }
}