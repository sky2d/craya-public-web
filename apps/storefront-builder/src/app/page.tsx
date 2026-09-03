import HomeScreen from "@/components/homeScreen/sellers/HomeScreen";
import shopImage from "components/src/icons/ogImages/shopHome.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell with Craya – Build a Stunning Storefront in Minutes",
  description:
    "Launch your fashion brand with Craya. Build dynamic, creator-led storefronts in minutes and turn your content into a powerful selling engine.",
  keywords: ["launch fashion brand online", "build video storefront", "Craya seller onboarding", "social commerce tool India", "powered by Craya"],
  openGraph: {
    title: "Sell on Craya – Launch Your Storefront Today",
    description: "Design, launch, and scale your fashion brand with Craya’s storefront builder. Fast, visual, and creator-first.",
    url: "https://craya.store",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: shopImage.src,
        width: 1200,
        height: 630,
        alt: "Sell on Craya OG Image",
      },
    ],
  },
};
const Page = () => {
  return <HomeScreen />;
};

export default Page;
