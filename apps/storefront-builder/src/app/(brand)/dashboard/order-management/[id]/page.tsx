import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import { ErrorPage } from "components/src/module/ErrorPage";
import { getOrderById } from "components/src/services/api/orders";
import { redirect } from "next/navigation";
import OrderDetailsPage from "../components/OrderDetails";

const OrderDetails = async ({ params, searchParams }: { params: { id: string }; searchParams: { storeId?: string } }) => {
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }

  const orderId = params.id;
  const storeId = searchParams.storeId;

  if (!orderId) {
    return <ErrorPage description="Order ID is missing in the URL." />;
  }

  const { data: order, error: orderError } = await getOrderById(orderId, accessToken, true, storeId);

  if (orderError || !order) {
    return <ErrorPage description={`Order #${orderId} not found.`} />;
  }

  return (
    <>
      <header className="flex items-center justify-start pb-6 pt-4">
        <h1 className="text-[clamp(20px,1.7vw,30px)] font-semibold">
          Order ID #{order.id}
          <span className="ml-2 text-[clamp(10px,0.8vw,15px)] font-normal">{new Date(order.createdAt).toLocaleString()}</span>
        </h1>
        <Button2 label={order.paymentStatus} className="mx-2 !w-auto !bg-[#519C66]" type={ButtonType.PRIMARY} />
        <Button2 label={order.deliveryStatus} className="mx-2 !w-auto !bg-[#FFF2E2] text-black-dark1" type={ButtonType.PRIMARY} />
      </header>
      <OrderDetailsPage order={order} />
    </>
  );
};

export default OrderDetails;
