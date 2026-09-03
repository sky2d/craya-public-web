import { validateTrackAccess } from "@/utils/orders";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { PageHeader } from "components/src/major/PageHeader";
import { trackOrder } from "components/src/services/api";
import { getOrderById } from "components/src/services/api/orders";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import TrackYourProductScreen from "./TrackYourProduct";

interface Props {
  params: {
    orderId: string;
  };
}

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

export function generateMetadata({ params }: Props): Metadata {
  const { orderId } = params;

  return {
    title: `Track Your Order – Powered by Craya`,
    description: `Track your delivery in real-time. Fast and easy updates powered by Craya’s logistics engine.`,
    keywords: ["Craya order tracking", `shipping status`, "live tracking fashion order", "powered by Craya"],
    openGraph: {
      title: `Track Order – Craya`,
      description: `Follow your delivery status from — updated in real-time and powered by Craya.`,
      url: `https://craya.shop/orders/trackYourProduct/${orderId}`,
      images: [
        {
          url: "https://craya.shop/images/og-track.jpg",
          alt: `Track Order`,
        },
      ],
      type: "website",
    },
  };
}

function splitOrderId(input: string): { orderId: string; index: number } {
  const lastDash = input.lastIndexOf("-");
  const orderId = input.substring(0, lastDash);
  const index = parseInt(input.substring(lastDash + 1), 10);
  return { orderId, index };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const { orderId, index } = splitOrderId(id);
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }

  if (!accessToken) {
    return (
      <ErrorPage
        title="Please login"
        statusCode={403}
        description="You are not authorized to review this order. Only customers who have received the product can leave a review."
      />
    );
  }

  const { data: order, error: orderError } = await getOrderById(orderId, accessToken);

  if (orderError || !order) {
    return <ErrorPage description={`Order #${orderId} not found.`} />;
  }

  const isValidAccess = validateTrackAccess(order);

  if (!isValidAccess) {
    return (
      <ErrorPage
        title="Tracking Unavailable"
        statusCode={403}
        description="You are not authorized to view the tracking information for this order. Please contact support if you believe this is a mistake."
      />
    );
  }

  const { data: trackingData } = await trackOrder(order, accessToken);

  return (
    <>
      <PageHeader title="Track Your Order" />
      <TrackYourProductScreen order={order} index={index} trackingData={trackingData} />
    </>
  );
}
