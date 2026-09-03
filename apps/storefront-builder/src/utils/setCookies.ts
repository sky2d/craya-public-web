"use server";

import { cookies } from "next/headers";

export async function setStoreCookie(storeId: string) {
  cookies().set("storeId", storeId, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
