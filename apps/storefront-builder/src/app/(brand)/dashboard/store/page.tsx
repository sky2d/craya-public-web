import type { Metadata } from "next";
import StoreDetails from "./StoreDetails";

export const metadata: Metadata = {
  title: "Edit Your Store – Customize Bio, Logo, and Identity",
  description: "Update your storefront’s branding details — logo, name, links, and more. Fully customizable, powered by Craya.",
  keywords: ["Craya store settings", "edit storefront", "change store logo", "custom brand page", "powered by Craya"],
  openGraph: {
    title: "Customize Your Store – Craya",
    description: "Edit your storefront identity and links with ease. Build your visual presence with Craya.",
    url: "https://craya.store/dashboard/store",
    images: [
      {
        url: "https://craya.store/images/og-store-settings.jpg",
        width: 1200,
        height: 630,
        alt: "Customize Craya Storefront",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

const HomePage = () => {
  return <StoreDetails />;
};
export default HomePage;
