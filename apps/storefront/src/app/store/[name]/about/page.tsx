import { Loader } from "@/utils/loader";
import { getStoreByName } from "components/src/services/api";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const storeName = params.name;

  const { data, error } = await getStoreByName(storeName);

  if (!data || error) {
    return {
      title: "Store Not Found – Craya",
      description: "This store doesn't exist or is unavailable.",
      robots: "noindex, nofollow",
    };
  }

  const name = data.name || storeName;

  return {
    title: `About ${name} –  Powered by Craya`,
    description: `Learn about ${name} — the people, the vibe, and the values behind the brand. All made discoverable through Craya’s storefront builder.

`,
    keywords: [`about ${name}`, "creator-led fashion", "Instagram fashion India", "indie brand story", "powered by Craya"],
    openGraph: {
      title: `About ${name} – Powered by Craya`,
      description: `Discover the story behind ${name} and what drives the brand. Built on storytelling, powered by Craya.`,
      url: `https://${storeName}.craya.shop/aboutus`,
      siteName: "Craya",
      images: [
        {
          url: "https://craya.shop/images/og-about-store.jpg",
          width: 1200,
          height: 630,
          alt: `About ${name} | Craya`,
        },
      ],
      type: "website",
    },
  };
}

const AboutUs = dynamic(() => import("./AboutUs"), {
  loading: () => <Loader />,
});

const Page = () => (
  <div className="flex h-full w-full justify-center overflow-x-hidden">
    <AboutUs />
  </div>
);

export default Page;
