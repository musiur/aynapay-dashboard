"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL

export const A__POST__TwoFactorAuth = async () => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }
        const resposne = await fetch(`${BASEURL}/auth/generate-two-factor-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({})
        });
        const result = await resposne.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch two-factor authentication status",
        };
    }
};



export const A__POST__TwoFactorActivation = async (payload: { secretKey: string, code: string }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }

        const resposne = await fetch(`${BASEURL}/auth/active-two-factor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const result = await resposne.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to activate two-factor authentication",
        };
    }
};

export const A__POST__TwoFactorDisable = async (payload: { code: string }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }
        const resposne = await fetch(`${BASEURL}/auth/deactivate-two-factor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const result = await resposne.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to disable two-factor authentication",
        };
    }
}


export const A__POST__EnableSecret = async (payload: { secret: string, walletId: string, currentPassword: string }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }
        const resposne = await fetch(`${BASEURL}/wallet/set-secret/${payload.walletId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const result = await resposne.json();
        revalidatePath("/dashboard/settings");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to enable secret",
        };
    }
};


export const A__PATCH__UpdateSecret = async (payload: { currentSecret: string, walletId: string, newSecret: string, }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }
        const resposne = await fetch(`${BASEURL}/wallet/update-secret/${payload.walletId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const result = await resposne.json();
        
        revalidatePath("/dashboard/settings");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to update secret",
        };
    }
};


export const A__POST__RemoveSecret = async (payload: { walletId: string, currentSecret: string, currentPassword: string }) => {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            return {
                success: false,
                message: "No token found",
            }
        }
        const resposne = await fetch(`${BASEURL}/wallet/remove-secret/${payload.walletId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const result = await resposne.json();
        revalidatePath("/dashboard/settings");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to disable secret",
        };
    }
}