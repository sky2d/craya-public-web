import { SuperTokensProvider } from "@/components/auth/SuperTokenProvider";
import Footer from "@/components/home/components/Footer";
import { MobileBlockChecker } from "@/components/home/components/MobileBlockChecker";
import Navbar from "@/components/home/components/Navbar";
import { LoadingProvider } from "@/provider/LoadingProvider";
import { UserProvider } from "@/provider/UserProvider";
import { ConfigProvider } from "antd";
import { ComponentProvider } from "components/src/major";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { Suspense } from "react";
import "../global.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Craya Storefront Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const userAgent = headers().get("user-agent") || "";
  const isMobile = /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile/i.test(userAgent);

  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "__Poppins_9b9fd1",
          },
        }}
      >
        <SuperTokensProvider>
          <body className={`${poppins.className} scroll-smooth`}>
            {/* Conditionally block mobile users except on `/` */}
            {isMobile ? (
              <Suspense fallback={null}>
                <MobileBlockChecker>{children}</MobileBlockChecker>
              </Suspense>
            ) : (
              <LoadingProvider>
                <UserProvider>
                  <Navbar />
                  <ComponentProvider>{children}</ComponentProvider>
                  <Footer />
                </UserProvider>
              </LoadingProvider>
            )}
          </body>
        </SuperTokensProvider>
      </ConfigProvider>
    </html>
  );
}
