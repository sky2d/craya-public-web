import { getStoreIdFromCookies } from "@/utils/getCookies";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { Loading } from "components/src/minor";
import { ErrorPage } from "components/src/module/ErrorPage";
import { getPolicies } from "components/src/services/api";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RadioGroupClient } from "./RadioGroupClient";

export const RadioGroup = async () => {
  const storeId = await getStoreIdFromCookies();
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }
  if (!storeId) {
    return <ErrorPage description="Store ID not found please refresh the page." />;
  }

  const { data, error: policyError } = await getPolicies(storeId, accessToken);

  if (policyError) {
    return null;
  }

  return (
    <Suspense fallback={<Loading isCentre />}>
      <RadioGroupClient storeId={storeId} initialValue={data} policyType="exchange" />
    </Suspense>
  );
};
