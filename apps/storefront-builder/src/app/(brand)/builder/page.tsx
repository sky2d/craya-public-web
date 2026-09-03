import { Metadata } from "next";
import Builder from "./components/Builder";

export const metadata: Metadata = {
  title: "Craya Storefront Builder – Design Your Brand’s Online Identity",
  description: "Build a visual, swipe-style storefront that feels like a profile but sells like a pro — powered by Craya.",
  keywords: ["storefront builder India", "design D2C store", "create fashion storefront", "brand page builder Craya", "powered by Craya"],
  openGraph: {
    title: "Craya Storefront Builder",
    description: "Build your storefront in minutes. Drag, drop, customize — powered by Craya.",
    url: "https://craya.store/builder",
    images: [
      {
        url: "https://craya.store/images/og-store-builder.jpg",
        width: 1200,
        height: 630,
        alt: "Craya Storefront Builder OG Image",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

const HomePage = () => {
  return <Builder />;
};

export default HomePage;
