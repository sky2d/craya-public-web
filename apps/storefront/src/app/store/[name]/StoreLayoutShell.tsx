import NotFound from "@/app/not-found";
import { getStoreByName } from "components/src/services/api";
import StoreLayoutClient from "./StoreLayoutClient";

async function fetchAndProcessStoreData(storeName: string) {
  const { data: fullStoreData, error } = await getStoreByName(storeName);
  return { fullStoreData, error };
}

export default async function StoreLayoutShell({ children, params }: { children: React.ReactNode; params: { name: string } }) {
  const storeName = params.name;

  const { fullStoreData, error } = await fetchAndProcessStoreData(storeName);

  if (error || !fullStoreData) {
    return <NotFound />;
  }

  return <StoreLayoutClient fullStoreData={fullStoreData}>{children}</StoreLayoutClient>;
}
