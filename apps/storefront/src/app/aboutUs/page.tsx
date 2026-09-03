import Footer from "@/components/footer/Footer";
import AboutUs from "components/src/icons/iconFiles/AboutUs.svg";
import AboutUsSmall from "components/src/icons/iconFiles/AboutUsSmall.svg";
import Arrow from "components/src/icons/iconFiles/Arrow.svg";
import ArrowSmall from "components/src/icons/iconFiles/ArrowSmall.svg";
import Climbing from "components/src/icons/iconFiles/Climbing.svg";
import ClimbingSmall from "components/src/icons/iconFiles/ClimbingSmall.svg";
import Stairs from "components/src/icons/iconFiles/Stairs.svg";
import TeamMembers from "components/src/icons/iconFiles/TeamMembers.svg";
import aboutUs from "components/src/icons/ogImages/aboutUs.png";
import HorizontalScrollImage from "components/src/major/aboutUs/HorizontalScrollImage";
import Mission from "components/src/major/aboutUs/Mission";
import VisionSection from "components/src/major/aboutUs/VisionSection";
import WorkTogetherSection from "components/src/major/aboutUs/WorkTogetherSection";
import Image from "next/image";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Craya: India’s Most Fun Shopping Team",
  description:
    "We’re on a mission to make online shopping fun. Learn how Craya blends entertainment and fashion to build a new era of product discovery.",
  keywords: ["About Craya", "Craya founder story", "next-gen shopping India", "ecommerce startup story"],
  openGraph: {
    title: "About Craya",
    description: "Get to know the people and mission behind Craya — where e-commerce meets entertainment.",
    url: "https://craya.shop/aboutUs",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: aboutUs.src,
        width: 1200,
        height: 630,
        alt: "Craya About Us",
      },
    ],
  },
};

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="relative hidden aspect-[1728/576] w-full sm:block">
        <Image src={AboutUs} alt="About Us" draggable={false} fill className="object-fill" priority />
      </div>
      <div className="relative aspect-[1/0.6] w-full sm:hidden">
        <Image src={AboutUsSmall} alt="About Us" draggable={false} fill className="object-fill" priority />
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-brand-color1">
        <VisionSection imageSrcLarge={Arrow} imageSrcSmall={ArrowSmall} alt="This is our Vision" />
        <Mission imageLargeSrc={Climbing} imageSmallSrc={ClimbingSmall} alt="this is our mission" />
        <HorizontalScrollImage imageSrc={TeamMembers} alt="This is our Team" />
        <WorkTogetherSection imageSrc={Stairs} alt="we work together" />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
