import Header from "@/components/navbar/Header";
import { ComponentProvider } from "components/src/major";
import { headers } from "next/headers";
import { CartProvider } from "./CartProvider";
import { ModalProvider } from "./ModalProvider";
import { ServiceWorkerProvider } from "./ServiceWorkerProvider";
import { UserProvider } from "./UserProvider";

const ROOT_HOSTNAMES = ["craya.shop", "www.craya.shop", "craya.xyz", "craya.local"];
export default async function RootProvider({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const hostname = headersList.get("host") || "";

  const isRootDomain = ROOT_HOSTNAMES.includes(hostname);

  return (
    <ComponentProvider>
      <UserProvider>
        <CartProvider>
          <ModalProvider>
            {isRootDomain && <Header isRootDomain={isRootDomain} />}
            {children}
            <ServiceWorkerProvider />
          </ModalProvider>
        </CartProvider>
      </UserProvider>
    </ComponentProvider>
  );
}
