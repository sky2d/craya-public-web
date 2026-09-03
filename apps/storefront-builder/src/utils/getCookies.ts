import { cookies } from "next/headers";

export async function getStoreIdFromCookies() {
  const cookieStore = cookies();
  const storeId = cookieStore.get("storeId")?.value;
  return storeId || null;
}
