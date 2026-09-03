import { validateReviewAccess } from "@/utils/orders";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { PageHeader } from "components/src/major/PageHeader";
import { getOrderById } from "components/src/services/api/orders";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import RateYourProduct from "./RateYourProduct";

interface Props {
  params: {
    orderId: string;
  };
}

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

export function generateMetadata({ params }: Props): Metadata {
  const { orderId } = params;

  return {
    title: `Rate Order – Help Improve, Powered by Craya`,
    description: `Share your experience shopping from. Rate the product and help the brand grow — powered by Craya’s review system.`,
    keywords: [`Craya product review`, "fashion feedback Craya", "rate your order India", "powered by Craya"],
    openGraph: {
      title: `Rate Your Order – Powered by Craya`,
      description: `Loved your delivery? Let us know! Rate your purchase in seconds on Craya.`,
      url: `https://craya.shop/orders/rateYourProduct/${orderId}`,
      images: [
        {
          url: "https://craya.shop/images/og-rate.jpg",
          alt: `Rate Order`,
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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
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

  const isValidAccess = validateReviewAccess(order);

  if (!isValidAccess) {
    return (
      <ErrorPage
        title="Review Unavailable"
        statusCode={403}
        description="You are not authorized to review this order. Only customers who have received the product can leave a review."
      />
    );
  }

  return (
    <>
      <PageHeader title="Rate Your Product" />
      <RateYourProduct order={order} index={index} />
    </>
  );
}
