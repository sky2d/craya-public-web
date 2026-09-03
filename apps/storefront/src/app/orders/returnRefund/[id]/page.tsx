import { validateReturnRefundAccess } from "@/utils/orders";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { PageHeader } from "components/src/major/PageHeader";
import { getOrderById } from "components/src/services/api/orders";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import ReturnRefund from "./ReturnRefund";

interface Props {
  params: {
    orderId: string;
  };
}

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

export function generateMetadata({ params }: Props): Metadata {
  const { orderId } = params;

  return {
    title: `Request an Exchange – Powered by Craya`,
    description: `Didn’t love what you received? Start your exchange request through Craya’s seamless resolutionflow.`,
    keywords: [
      "exchange Craya order",
      "Craya product exchange",
      "initiate exchange on Craya",
      "Craya exchange request",
      "how to exchange on Craya",
      "Craya order issue support",
    ],
    openGraph: {
      title: `Return Your Order – Powered by Craya`,
      description: `Quickly initiate a return or refund request for through Craya’s support-first system.`,
      url: `https://craya.shop/orders/returnRefund/${orderId}`,
      images: [
        {
          url: "https://craya.shop/images/og-return-refund.jpg",
          alt: `Return Order`,
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
  const { id } = await params;
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

  const isValidAccess = validateReturnRefundAccess(order);

  if (!isValidAccess) {
    return (
      <ErrorPage
        title="Exchange Unavailable"
        statusCode={403}
        description="You are not authorized to request an exchange for this order. Please ensure the order is eligible or contact support for help."
      />
    );
  }

  return (
    <>
      <PageHeader title="Request for Return / Exchange" />
      <ReturnRefund order={order} index={index} />
    </>
  );
}
