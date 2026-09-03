import { SuperTokensProvider } from "@/components/auth/SuperTokenProvider";
import RootProvider from "@/provider/RootProvider";
import { ConfigProvider } from "antd";
import shopHome from "components/src/icons/ogImages/shopHome.png";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop Unique Instagram Brands with Fun Videos",
  description:
    " Discover Craya: shop bold Instagram-first fashion brands via fun, swipeable short videos. Entertainment meets shopping, all in one place..",
  keywords: [
    "social commerce India",
    "discover Instagram brands",
    "video shopping platform India",
    "fun way to shop online",
    "brand central",
    "video commerce",
    "swipe-style shopping",
    "curated fashion brands India",
    "fun way of online shopping",
    "Instagram fashion brands India",
    "discover fashion brands online",
    "entertaining online shopping",
    "video-first product discovery",
    "social shopping India",
    "unique Instagram stores",
    "homegrown brands India",
    "no more DMs to shop",
    "one-tap checkout fashion",
    "online fashion marketplace India",
  ],
  robots: "index, follow",
  metadataBase: new URL("https://craya.shop"),
  openGraph: {
    title: "Discover Instagram-Native Brands | Shop via Videos",
    description: "Craya is where fashion discovery meets entertainment. Join the waitlist and shop from curated Instagram brands via short videos.",
    url: "https://craya.shop",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: shopHome.src,
        width: 1200,
        height: 630,
        alt: "Craya Homepage OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craya - The Best Platform for Your Needs",
    description: "Experience seamless transactions and business management with Craya.",
    site: "@CrayaOfficial",
    creator: "@CrayaOfficial",
    images: ["/icons/Craya.svg"],
  },
};

export const revalidate = 21600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.className} relative h-full min-h-screen overflow-x-hidden scroll-smooth`}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "__Poppins_9b9fd1",
            },
          }}
        >
          <SuperTokensProvider>
            <RootProvider>{children}</RootProvider>
          </SuperTokensProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
