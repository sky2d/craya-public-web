import NotFound from "@/app/not-found";
import { PageHeader } from "components/src/major/PageHeader";
import type { Metadata } from "next";
import CancellationRefundPolicy from "./CancellationPolicy";
import PrivacyAndPolicy from "./PrivacyPolicy";
import ShippingPolicy from "./ShippingPolicy";
import TermsAndTech from "./TermsAndTech";

export const metadata: Metadata = {
  title: "Craya Policies – Refunds, Shipping, Privacy & Terms",
  description: "  Craya is on a mission to make shopping fun again. Discover the people, the product, and the playful spirit behind our platform.",
  keywords: ["Craya refund policy India", "Craya shipping timelines", "Craya terms and conditions", "secure checkout"],
  openGraph: {
    title: "Craya Policy Center",
    description: "Explore Craya’s return, shipping, and privacy policies — built to keep your experience simple and secure.",
    url: "https://craya.shop/policy", // dynamic policy slug handled in runtime
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: "/icons/CrayaLogo.svg",
        width: 1200,
        height: 630,
        alt: "Craya Policy OG Image",
      },
    ],
  },
};

const Page = ({ params }: { params: { policies: string } }) => {
  const { policies } = params;

  const renderContent = () => {
    switch (policies) {
      case "privacy":
        return <PrivacyAndPolicy />;
      case "terms":
        return <TermsAndTech />;
      case "refund":
        return <div className="p-4">This is the Refund Policy content.</div>;
      case "shipping":
        return <ShippingPolicy />;
      case "cancellation-refund":
        return <CancellationRefundPolicy />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <PageHeader title={policies} />
      {renderContent()}
    </div>
  );
};

export default Page;
