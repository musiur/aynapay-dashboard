"use server"

const BASEURL = process.env.BASEURL;



export const A__POST__PaymentTransactionInfo = async (data: { requestId: string, transactionId: string, transactionSource: string, apiKey: string }) => {
    try {
        if (!data.apiKey) {
            return { success: false, message: "Unauthorized" }
        }
        const resonse = await fetch(`${BASEURL}/payment/submit-transaction-info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": data.apiKey
            },
            body: JSON.stringify(data)
        })
        const result = await resonse.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__POST__PaymentCreate = async (data: any) => {
    try {
        if (!data.apiKey) {
            return {
                success: false,
                message: "Unauthorized!"
            }
        }
        const response = await fetch(`${BASEURL}/payment/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": data.apiKey
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const A__GET__AllPaymentMethods = async (apiKey: string) => {
    try {
        if (!apiKey) {
            return {
                success: false,
                messsage: "Unauthorized!"
            }
        }

        const response = await fetch(`${BASEURL}/users/available-payment-methods/${apiKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
            cache: "no-store"
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}
export const A__GET__PaymentInfo = async (apiKey: string, id: string) => {
    try {
        if (!apiKey) {
            return {
                success: false,
                messsage: "Unauthorized!"
            }
        }

        const response = await fetch(`${BASEURL}/payment/info/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
            cache: "no-store"
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}