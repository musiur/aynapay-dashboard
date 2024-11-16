"use server"

import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;


/**
 * only client side action in SSR. This has no effect on Backend server
 * as there is no such endpoint for logout and it has nothing to do with MyAction
 */
export const LogoutAction = async () => {
    try {
        cookies().delete("token")
        cookies().delete("uid")
        return { success: true, message: "Successfully logged out" }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__Login = async (data: { email: string, password: string }) => {
    try {
        const response = await fetch(`${BASEURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        

        const result = await response.json();
        
        if (result.success && result?.data?.token && !result?.data?.twoFactorSessionId) {
            cookies().set("token", result.data.token);
            cookies().set("uid", result.data.uid);
            cookies().set("role", result.data.role);
        }
        
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__POST__TwoFactorAfterLogin = async (data: {
    "sessionId": string,
    "code": string
}) => {
    try {
        const response = await fetch(`${BASEURL}/auth/retrieve-login-data-after-2fa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if (result.success && result?.data?.token) {
            cookies().set("token", result.data.token);
            cookies().set("uid", result.data.uid);
            cookies().set("role", result.data.role);
        }
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}


// code by anik
export const A__POST__AddCustomer = async (data: {
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string
}) => {
    try {
        const response = await fetch(`${BASEURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies().get("token")?.value}`
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}

export const A__POST__ForgetPassword = async (data:{email: string}) => {
    try {
        const response = await fetch(`${BASEURL}/auth/forget-password-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}

export const A__POST__ResetPassword = async (data:{otp: string, newPassword: string}, sessionId: string) => {
    try {

        const zData = {
            otp: Number(data?.otp),
            newPassword: data?.newPassword
        }

        const response = await fetch(`${BASEURL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-session-id': `${sessionId}`,
            },
            body: JSON.stringify(zData)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}



export const A__POST__ChangePassword = async (data:{oldPassword: string, newPassword: string}) => {
    try {
        const token = cookies().get('token')?.value;
        const uid = cookies().get('uid')?.value;

        if(!token) {
            return {
                success: false,
                message: "Token is not provided!",
            }
        }
        if(!uid) {
            return {
                success: false,
                message: "Uid is not provided!",
            }
        }   

        

        const response = await fetch(`${BASEURL}/auth/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({...data, uid})
        })
        const result = await response.json();
        return result;

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error: `${error}`
        }
    }
}

// auth/forget-password-request