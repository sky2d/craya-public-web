import { Loader } from "@/utils/loader";
import videos from "components/src/icons/ogImages/videos.png";
import { getLoops, getStoreByName } from "components/src/services/api";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

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
    title: `Craya ${name} – Shop via Scrollable Loops`,
    description: `Watch short video loops by ${name} and shop what you love — powered by Craya’s immersive video-first shopping experience.

`,
    keywords: ["short video shopping", `${name} product reels`, "video commerce India", "fashion loops", "powered by Craya"],
    openGraph: {
      title: `Watch ${name} Fashion Videos – Powered by Craya`,
      description: `Scroll through ${name}’s product videos. Fashion meets content on a platform powered by Craya.`,
      url: `https://${storeName}.craya.shop/videos`,
      siteName: "Craya",
      images: [
        {
          url: videos.src,
          width: 1200,
          height: 630,
          alt: `Watch ${name} Videos | Craya`,
        },
      ],
      type: "website",
    },
  };
}

const VideosPage = dynamic(() => import("./VideoPage"), {
  loading: () => <Loader />,
  ssr: false,
});

export default async function Page({ searchParams }: { searchParams: { storeId: string; reel?: string } }) {
  if (!searchParams.storeId) {
    return <ErrorPage title="Store Not Found" description="Please provide a valid store ID." />;
  }
  const { data, error } = await getLoops(searchParams.storeId);

  return <VideosPage errorMessage={error} loops={data} reelId={searchParams.reel} />;
}
