import { INITIAL_PRODUCT_DATA } from "@/provider/ProductProvider";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import PaymentSuccessIcon from "components/src/icons/iconFiles/PaymentSuccessIcon.svg";
import { fetchProduct } from "components/src/services/api";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductDetailScreen } from "../components/ProductDetail";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Your Listings – Powered by Craya",
  description: "Fine-tune your product pages: descriptions, photos, variants, and pricing — fully editable, powered by Craya.",
  keywords: ["product info editor", "edit fashion listing", "Craya seller product panel", "update product India", "powered by Craya"],
  openGraph: {
    title: "Edit Product Details – Craya Seller Panel",
    description: "Update your product content, photos, prices, and more through Craya’s seller dashboard.",
    url: "https://craya.store/dashboard/products/details",
    images: [
      {
        url: PaymentSuccessIcon.src,
        width: 1200,
        height: 630,
        alt: "Craya Product Detail Editor",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};
export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  if (id === "addProduct") {
    return <ProductDetailScreen product={INITIAL_PRODUCT_DATA} />;
  }
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();
  if (error) {
    return <TryRefreshComponent key={Date.now()} />;
  }

  if (accessTokenPayload === undefined) {
    if (!hasToken) {
      // Not logged in → redirect to auth
      return redirect("/auth");
    }
    // Has token but expired → Try refresh
    return <TryRefreshComponent key={Date.now()} />;
  }
  const { data } = await fetchProduct(id, accessToken);

  if (!data || error) {
    return <div>Product not found</div>;
  }

  return <ProductDetailScreen product={data} />;
}
