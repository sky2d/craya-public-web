import CrayaFaqSection from "components/src/major/CrayaFaqSection";
import { PageHeader } from "components/src/major/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craya FAQ – Learn How Fun Shopping Works Here",
  description: "Got questions? Learn everything about how Craya works — from video shopping to order tracking.",
  keywords: ["Craya FAQ", "how Craya works", "Craya video shopping explained", "Craya help center"],
  openGraph: {
    title: "Craya Help Center – Frequently Asked Questions",
    description: "From how shopping works to where your orders are — get all your Craya questions answered here.",
    url: "https://craya.shop/faq",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: "/icons/CrayaLogo.svg",
        width: 1200,
        height: 630,
        alt: "Craya FAQ OG Image",
      },
    ],
  },
};

const Page = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-start">
      {" "}
      <PageHeader title="Frequently Asked Questions (FAQ)" />
      <CrayaFaqSection />
    </div>
  );
};

export default Page;
