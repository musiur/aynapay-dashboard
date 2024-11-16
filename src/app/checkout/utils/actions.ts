"use server"

import { cookies } from "next/headers"

export const CSR__SetCookie = async (name: string, value: any) => {
    try {
        cookies().set(name, JSON.stringify(value))
        return true;
    } catch (error) {
        throw new Error("Something went wrong! Cookie is not being set")
    }
}

export const CSR__GetCookie = async (name: string) => {
    try {
        const value = cookies().get(name)?.value;
        return value ? JSON.parse(value) : null;
    } catch (error) {
        throw new Error("Something went wrong! Cookie is not found")
    }
}

export const CSR__DeleteCookie = async (name: string) => {
    try {
        cookies().delete(name)
        return true;
    } catch (error) {
        throw new Error("Something went wrong! Cookie is not being deleted")
    }
}