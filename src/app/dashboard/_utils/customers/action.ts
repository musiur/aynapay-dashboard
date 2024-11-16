"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { T__Schema__Customers } from "./customers.column";
import { T__Schema__CustomersStatus } from "./patch-wallet-status";
import { T__Schema__FeesCommission } from "./patch-fees-commission";
import { T__Schema__ProfileInfo } from "./patch-profile-info";

const BASEURL = process.env.BASEURL;

export const A__GET__ProfileInfo = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/users/profile-info`, {
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


export const A__PATCH__ProfileInfo = async (data: T__Schema__ProfileInfo) => {
    try {
        const token = cookies().get("token")?.value;
        const role = cookies().get("role")?.value;
        const uid = cookies().get("uid")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        if (!role) {
            return {
                success: false,
                message: "Role was not provided"
            }
        }

        if (!uid) {
            return {
                success: false,
                message: "User ID was not provided"
            }
        }

        let payload: any = {...data, uid: data?.id};
        if (["ADMIN", "MODERATOR"].includes(role)) {
            payload = { account: payload }
        }
        const endpoint = ["ADMIN", "MODERATOR"].includes(role) && uid !== data?.id ? `update-account-info` : "profile-update";
        const response = await fetch(`${BASEURL}/users/${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await response.json();
        revalidatePath("/dashboard/customers")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__PATCH__Customer = async (data: T__Schema__Customers) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/profile-update/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/customers")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__DELETE__Customer = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }
        const response = await fetch(`${BASEURL}/users/${id}`, {
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

export const A__GET__Customers = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/all-users?limit=999`, {
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

export const A__GET__Customer = async (id: string) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/${id}`, {
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

export const A__PATCH__CustomerStatus = async (data: T__Schema__CustomersStatus) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/update-account-info`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/customers")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}
export const A__PATCH__FeesCommission = async (data: T__Schema__FeesCommission) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return { success: false, message: "Token was not provided" }
        }

        const response = await fetch(`${BASEURL}/users/update-fees-and-commission`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        revalidatePath("/dashboard/customers")
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

