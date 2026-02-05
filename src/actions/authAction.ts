"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/constants/constants";

const createSession = async (uid: string) => {
    (await cookies()).set(SESSION_COOKIE_NAME, uid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60*60*24, // 86400 seconds in a day
        path: ROOT_ROUTE
    });

    redirect(HOME_ROUTE);
}

const removeSession = async () => {
    (await cookies()).delete(SESSION_COOKIE_NAME);
}

export {createSession, removeSession};