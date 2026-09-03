"use server";

import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { CouponProvider } from "@/provider/CouponProvider";
import { StoreProvider } from "@/provider/StoreProvider";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { ErrorPage } from "components/src/module/ErrorPage";
import { fetchStores } from "components/src/services/api";
import { redirect } from "next/navigation";
import { ClientLayout } from "./clientLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }
  const { data, error: storeError } = await fetchStores(accessToken);

  if (storeError || !data) {
    return <ErrorPage description={`Store not found: ${storeError || "Unknown error"}`} />;
  }

  return (
    <SessionAuthForNextJS>
      <StoreProvider initialStoreData={data[0]}>
        <CouponProvider>
          <ClientLayout>{children}</ClientLayout>
        </CouponProvider>
      </StoreProvider>
    </SessionAuthForNextJS>
  );
};

export default Layout;
