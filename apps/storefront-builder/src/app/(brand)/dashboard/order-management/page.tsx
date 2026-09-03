import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { DeliveryStatusEnum } from "components/src/interfaces/orders";
import { ErrorPage } from "components/src/module/ErrorPage";
import { getOrders } from "components/src/services/api/orders";
import { redirect } from "next/navigation";
import OrdersDashboard from "./components/OrdersDashboard";
import { StatsGrid } from "./components/StatsGrid";

const OrderManagement = async () => {
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }
  const { data, error: orderError } = await getOrders({ token: accessToken, deliveryStatus: DeliveryStatusEnum.PENDING, seller: true });

  if (orderError || !data) {
    return <ErrorPage description={`Order not found: ${orderError || "Unknown error"}`} />;
  }
  return (
    <>
      <h1 className="p-4 text-[1.7vw] font-semibold">Order Management</h1>
      <StatsGrid />
      <OrdersDashboard orderData={data.orders} totalOrders={data.total} />
    </>
  );
};

export default OrderManagement;
