"use server";

import { cookies } from "next/headers";

const BASEURL = process.env.BASEURL;


export const A__GET__Token = async () => {
    return cookies().get("token")?.value || undefined;
}