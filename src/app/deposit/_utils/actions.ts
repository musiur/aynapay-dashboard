"use server"

const BASEURL = process.env.BASEURL;



export const A__POST__DepositTransactionInfo = async (data: { requestId: string, transactionId: string, transactionSource: string, apiKey: string }) => {
    try {
        if (!data.apiKey) {
            return { success: false, message: "Unauthorized" }
        }
        const resonse = await fetch(`${BASEURL}/deposit/submit-transaction-info`, {
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

export const A__POST__DepositCreate = async (data: any) => {
    try {
        if (!data.apiKey) {
            return {
                success: false,
                message: "Unauthorized!"
            }
        }
        const response = await fetch(`${BASEURL}/deposit/create`, {
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

export const A__GET__AlldepositMethods = async (apiKey: string) => {
    try {


        const response = await fetch(`${BASEURL}/users/available-deposit-methods/${apiKey}`, {
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
export const A__GET__DepositInfo = async (id: string) => {
    try {


        const response = await fetch(`${BASEURL}/deposit/info/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ""
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

export const A__POST__ActiveReceivers = async (data: any) => {
    try {
        const response = await fetch(`${BASEURL}/agent/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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