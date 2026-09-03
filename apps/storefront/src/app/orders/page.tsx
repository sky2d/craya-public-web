import { Loader } from "@/utils/loader";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { PageHeader } from "components/src/major/PageHeader";
import { ErrorPage } from "components/src/module/ErrorPage";
import { getOrders } from "components/src/services/api/orders";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Track & Exchange Your Craya Orders Easily",
  description: "Easily manage all your fashion orders. Track your shipment, raise return or exchange requests, and stay in control with Craya.",
  keywords: ["Track my Craya order", "return Craya product", "Craya exchange process"],
  openGraph: {
    title: "Manage Your Craya Orders",
    description: "Track, return or exchange your orders with just a few clicks. Stay updated, the Craya way.",
    url: "https://craya.shop/orders",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: "/icons/CrayaLogo.svg",
        width: 1200,
        height: 630,
        alt: "Craya Order Management OG Image",
      },
    ],
  },
};

const Orders = dynamic(() => import("./OrderScreen"), {
  ssr: false,
  loading: () => <Loader />,
});

const Page = async () => {
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessTokenPayload || error) {
    if (!hasToken) {
      return redirect("/auth");
    }
    return <TryRefreshComponent key={Date.now()} />;
  }
  const { data, error: orderError } = await getOrders({ token: accessToken });

  if (orderError || !data) {
    return <ErrorPage description={`Order not found: ${orderError || "Unknown error"}`} />;
  }

  return (
    <>
      <PageHeader title="Orders" />
      <Orders orders={data} />
    </>
  );
};

export default Page;
