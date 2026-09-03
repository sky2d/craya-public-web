import { INITIAL_COUPON_DATA } from "@/provider/CouponProvider";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { ErrorPage } from "components/src/module/ErrorPage";
import { getCoupon } from "components/src/services/api/coupons";
import { redirect } from "next/navigation";
import { CouponDetail } from "../Components/CouponDetail";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (id === "addCoupon") {
    return <CouponDetail coupon={INITIAL_COUPON_DATA} />;
  }
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();
  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }
  const { data, error: couponError } = await getCoupon(id, accessToken);

  if (couponError || !data) {
    return <ErrorPage description={`Coupon not found: ${couponError || "Unknown error"}`} />;
  }
  return <CouponDetail coupon={data} />;
};

export default page;
