import type { Metadata } from "next";
import AddProductScreen from "../screen/AddProductScreen";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add & Manage Products – Seller Product Panel on Craya",
  description: "Add SKUs, update inventory, edit pricing and photos — everything you need to manage your products in one place.",
  keywords: ["add fashion products", "manage SKUs Craya", "product inventory Craya", "seller dashboard India", "powered by Craya"],
  openGraph: {
    title: "Manage Your Products – Craya Seller Panel",
    description: "Add and edit your brand’s product catalog in just a few clicks. Fast, scalable, powered by Craya.",
    url: "https://craya.store/dashboard/products",
    images: [
      {
        url: "https://craya.store/images/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Craya Seller Products Panel",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

export default function HomePage() {
  return <AddProductScreen />;
}
