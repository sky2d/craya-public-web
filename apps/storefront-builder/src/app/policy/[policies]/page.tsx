import NotFound from "@/app/not-found";
import crayaLogo from "components/src/icons/iconFiles/krayaSvg/crayaLogo.svg";
import CancellationRefundPolicy from "./CancellationRefundPolicy";
import PrivacyAndPolicy from "./PrivacyPolicy";
import ShippingPolicy from "./Shipping";
import TermsAndTech from "./TermsAndTech";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { policy: string } }): Promise<Metadata> {
  const { policy } = params;

  return {
    title: `Craya Policies – Privacy, Returns, Shipping & Seller Terms`,
    description: "Review Craya’s policies to understand our commitment to buyers, sellers, and platform transparency.",
    keywords: ["Craya privacy policy", "seller refund policy", "terms and conditions Craya", "platform rules", "powered by Craya"],
    openGraph: {
      title: "Policies – Craya Platform Terms",
      description: "Access all legal and support documents including privacy, terms, shipping, and return policies.",
      url: `https://craya.shop/policy/${policy}`,
      images: [
        {
          url: crayaLogo.src,
          width: 1200,
          height: 630,
          alt: "Craya Policy",
        },
      ],
    },
  };
}

const Page = ({ params }: { params: { policies: string } }) => {
  const { policies } = params;

  const renderContent = () => {
    switch (policies) {
      case "privacy":
        return <PrivacyAndPolicy />;
      case "terms":
        return <TermsAndTech />;
      case "CancellationRefundPolicy":
        return <CancellationRefundPolicy />;
      case "shipping":
        return <ShippingPolicy />;
      default:
        return <NotFound message={"No Openings Currently"} />;
    }
  };

  return <div className="flex h-full w-full flex-col items-center justify-start">{renderContent()}</div>;
};

export default Page;
