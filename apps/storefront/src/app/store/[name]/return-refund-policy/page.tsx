import { PageHeader } from "components/src/major/PageHeader";
import { getStoreByName } from "components/src/services/api";
import type { Metadata } from "next";
import SocialPolicy from "./SocialPolicy";
export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const storeName = params.name;

  const { data, error } = await getStoreByName(storeName);

  if (!data || error) {
    return {
      title: "Return & Refund Policy – Craya",
      description: "Return & refund policy page not found or unavailable.",
      robots: "noindex, nofollow",
    };
  }

  const name = data.name || storeName;

  return {
    title: `Return & Refund Policy – ${name} on Craya`,
    description: `Check ${name}’s clear and transparent return & refund policy — designed for buyers and powered by Craya.`,
    keywords: [`${name} refund`, "return policy India", "Craya-powered return system", "easy product exchange"],
    openGraph: {
      title: `${name} Return & Refund Policy – Powered by Craya`,
      description: `Easy returns and fair refund policy from ${name} — managed through Craya’s buyer-friendly experience.`,
      url: `https://${storeName}.craya.shop/return-refund-policy`,
      siteName: "Craya",
      images: [
        {
          url: data.logo.fileUrl,
          width: 1200,
          height: 630,
          alt: `Return & Refund Policy for ${name} | Craya`,
        },
      ],
      type: "website",
    },
  };
}

const PolicyPage = async ({ params }: { params: Promise<{ policy: string }> }) => {
  const policyId = (await params).policy;

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {" "}
      <PageHeader title={policyId} />
      <SocialPolicy />
    </div>
  );
};

export default PolicyPage;
