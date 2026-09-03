import { Loader } from "@/utils/loader";
import wishlist from "components/src/icons/ogImages/wishlist.png";
import { PageHeader } from "components/src/major/PageHeader";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Your Wishlist – Save Favorites on Craya",
  description: "Save your favorite finds from India's top creator brands and shop them when you’re ready.",
  keywords: ["Craya wishlist", "fashion finds India", "save favorite brands Craya"],
  openGraph: {
    title: "Your Craya Wishlist",
    description: "Save your favorite Craya finds for later. Build your wishlist and shop when the time is right.",
    url: "https://craya.shop/wishlist",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: wishlist.src,
        width: 1200,
        height: 630,
        alt: "Craya Wishlist",
      },
    ],
  },
};

const WishListProduct = dynamic(() => import("./WishListProduct"), {
  ssr: false,
  loading: () => <Loader />,
});

const Page = () => (
  <div className="flex w-full flex-col items-center justify-start">
    <PageHeader title="Wishlist Items" />
    <WishListProduct />
  </div>
);

export default Page;
