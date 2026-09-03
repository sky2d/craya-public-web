import { Loader } from "@/utils/loader";
import { Store } from "components/src/interfaces";
import { fetchAllStores, getStoreBasicInfo } from "components/src/services/api";
import { Metadata } from "next";
import { Suspense } from "react";
import StoreLayoutShell from "./StoreLayoutShell";

export async function generateStaticParams() {
  const { data } = await fetchAllStores();
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((store: Store) => ({
    name: store.name,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata | null> {
  const storeName = params.name;

  if (!storeName || storeName === "favicon.ico") {
    return null;
  }

  try {
    const { data: fullStoreData, error } = await getStoreBasicInfo(storeName);

    if (!fullStoreData || error) {
      return {
        title: "Discover Stores at Craya",
        description: "Explore unique shops and curated collections on Craya.",
        robots: "index, follow",
      };
    }

    const { name, description, logo } = fullStoreData;

    const storeTitle = name || "Storefront | Craya";
    const storeDescription = description || "Discover amazing products in our store.";
    const storeLogo = logo?.fileUrl || "/default-icon.png";
    const storeUrl = fullStoreData.url || `https://${storeName}.${process.env.NEXT_PUBLIC_PREPROD_BASE_DOMAIN || "craya.shop"}`;
    return {
      title: `${storeTitle} Powered by Craya`,
      description: `${storeDescription}`,
      keywords: fullStoreData.storeTags.join(", "),
      authors: [{ name: "Craya Team" }],
      robots: "index, follow",
      icons: {
        icon: storeLogo,
      },
      openGraph: {
        title: `${storeTitle} Powered by Craya`,
        description: `Discover ${storeName}'s fashion storefront powered by Craya. Curated drops, expressive branding, and swipe-to-shop magic.`,
        url: storeUrl,
        siteName: "Craya",
        images: logo?.fileUrl
          ? [
              {
                url: storeLogo,
                width: 1200,
                height: 630,
                alt: `${storeTitle} Logo`,
              },
            ]
          : [],
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Error | Craya",
      description: "An unexpected error occurred.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function StoreLayout({ children, params }: { children: React.ReactNode; params: { name: string } }) {
  if (!params.name || params.name === "favicon.ico") {
    return null;
  }
  return (
    <Suspense fallback={<Loader />}>
      <StoreLayoutShell params={params}>{children}</StoreLayoutShell>
    </Suspense>
  );
}
