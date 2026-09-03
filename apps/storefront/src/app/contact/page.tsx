import Contact from "components/src/major/Contact";
import { PageHeader } from "components/src/major/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Craya – Collaborate, Partner, or Say Hello",
  description: "Contact Craya for support, collaborations, or feedback. We’re always ready to help you connect, shop, or grow your brand.",
  keywords: ["Contact Craya", "partner with Craya", "Craya support", "collaborate with Craya"],
  openGraph: {
    title: "Contact Craya",
    description: "We’d love to hear from you! Reach out to Craya for support, feedback, or brand partnerships.",
    url: "https://craya.shop/contact",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: "/icons/CrayaLogo.svg",
        width: 1200,
        height: 630,
        alt: "Craya Contact OG Image",
      },
    ],
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
