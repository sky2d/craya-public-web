import crayaLogo from "components/src/icons/iconFiles/krayaSvg/crayaLogo.svg";
import CrayaFaqSection from "components/src/major/CrayaFaqSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craya Seller FAQ – Everything You Need to Get Started",
  description: "New to Craya? Explore how to set up your storefront, upload products, manage orders, and more.",
  keywords: ["Craya seller FAQ", "how to use Craya builder", "creator storefront help", "onboarding Craya", "powered by Craya"],
  openGraph: {
    title: "Craya FAQ for Sellers",
    description: "Got questions? We’ve got answers. Learn everything about selling with Craya.",
    url: "https://craya.store/faq",
    images: [
      {
        url: crayaLogo.src,
        width: 1200,
        height: 630,
        alt: "Craya Seller FAQ",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

const Page = () => {
  return <CrayaFaqSection />;
};

export default Page;
