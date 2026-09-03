"use client";

import Footer from "@/components/home/components/Footer";
import Navbar from "@/components/home/components/Navbar";
import { ComponentProvider } from "components/src/major";
import { usePathname } from "next/navigation";
import MobileBlock from "./MobileBlock";

export const MobileBlockChecker = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname !== "/") {
    return <MobileBlock />;
  }

  return (
    <>
      <Navbar />
      <ComponentProvider>{children}</ComponentProvider>
      <Footer />
    </>
  );
};
