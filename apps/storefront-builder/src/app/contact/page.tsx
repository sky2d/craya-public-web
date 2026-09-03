import crayaLogo from "components/src/icons/iconFiles/krayaSvg/crayaLogo.svg";
import Contact from "components/src/major/Contact";
import { PageHeader } from "components/src/major/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Craya – Seller Support, Partnerships & Queries",
  description: "Have a question or collab in mind? Contact the Craya team for seller support, integrations, and brand partnerships.",
  keywords: ["contact Craya", "seller support Craya", "Craya for brands", "reach Craya team", "powered by Craya"],
  openGraph: {
    title: "Get in Touch – Craya Seller Contact",
    description: "Let’s connect. Reach out to Craya for queries, feedback, partnerships, or tech support.",
    url: "https://craya.store/contact",
    images: [
      {
        url: crayaLogo.src,
        width: 1200,
        height: 630,
        alt: "Craya Contact OG Image",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

const Page = () => {
  return (
    <div className="flex w-full flex-col justify-start">
      <PageHeader title="Contact Us" />
      <Contact showContactFounder global={true} />
    </div>
  );
};
export default Page;
