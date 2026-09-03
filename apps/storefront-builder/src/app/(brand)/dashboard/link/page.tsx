import type { Metadata } from "next";
import ShopAppLinks from "../screen/ShopAppLinks";

export const metadata: Metadata = {
  title: "Get Your Craya Store Link & Seller App Access",
  description:
    "Generate your unique Craya storefront link and access the seller app. Start sharing your store and managing products with ease — powered by Craya.",
  keywords: [
    "create Craya store link",
    "get seller app Craya",
    "Craya seller dashboard",
    "storefront URL Craya",
    "Craya store setup",
    "Craya brand link generator",
  ],
  openGraph: {
    title: "Get Your Craya Store Link & Seller App",
    description:
      "Generate your unique storefront URL and access the Craya seller app to start managing your store and sharing it with your audience.",
    url: "https://craya.store/dashboard/link",
    images: [
      {
        url: "https://craya.store/images/og-store-link.jpg",
        alt: "Craya Store Link & Seller App",
      },
    ],
    type: "website",
  },
};

const StoreAppNavigation = () => {
  return <ShopAppLinks />;
};

export default StoreAppNavigation;
