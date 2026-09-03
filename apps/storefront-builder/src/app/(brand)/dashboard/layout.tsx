import { ContentWrapper } from "@/components/dashboard/ContentWrapper";
import { LeftPanel } from "@/components/dashboard/LeftPanel";
import { DashboardProvider } from "@/provider/DashboardProvider";
import { ProductProvider } from "@/provider/ProductProvider";
import ColoredBlackLogo from "components/src/icons/iconFiles/krayaSvg/ColoredBlackLogo.svg";

interface LayoutProps {
  children: React.ReactNode;
}

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Seller Dashboard – Manage Performance & Orders on Craya",
  description: "Track your sales, manage your storefront, and get actionable insights — all from one seller dashboard.",
  keywords: ["Craya dashboard", "seller analytics", "track sales Craya", "storefront performance", "powered by Craya"],
  openGraph: {
    title: "Your Craya Seller Dashboard",
    description: "Track your brand’s growth with real-time analytics and order performance, powered by Craya.",
    url: "https://craya.store/dashboard",
    images: [
      {
        url: "https://craya.store/images/og-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Craya Seller Dashboard OG Image",
      },
    ],
    siteName: "Craya",
    type: "website",
  },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ProductProvider>
      <DashboardProvider>
        <div className="h-screen w-screen !overflow-y-hidden">
          <div className="flex h-[9%] w-full items-center border border-[#CDCDCD] bg-[#fffff]">
            <div className="relative h-[40px] w-[170px]">
              <Image src={ColoredBlackLogo} alt="Colored Logo" fill className="cursor-pointer" />
            </div>
          </div>
          <div className="full flex w-screen flex-1">
            <LeftPanel />
            <ContentWrapper>{children}</ContentWrapper>

            {/* <div className="h-[91dvh] w-[20%] flex-shrink-0 bg-[#F9F9FB]">
              <TooltipScreen />
            </div> */}
          </div>
        </div>
      </DashboardProvider>
    </ProductProvider>
  );
};

export default Layout;
