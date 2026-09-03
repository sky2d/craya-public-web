import AboutUs from "components/src/icons/iconFiles/AboutUs.svg";
import AboutUsSmall from "components/src/icons/iconFiles/AboutUsSmall.svg";
import Arrow from "components/src/icons/iconFiles/Arrow.svg";
import ArrowSmall from "components/src/icons/iconFiles/ArrowSmall.svg";
import Climbing from "components/src/icons/iconFiles/Climbing.svg";
import ClimbingSmall from "components/src/icons/iconFiles/ClimbingSmall.svg";
import crayaLogo from "components/src/icons/iconFiles/krayaSvg/crayaLogo.svg";
import Stairs from "components/src/icons/iconFiles/Stairs.svg";
import TeamMembers from "components/src/icons/iconFiles/TeamMembers.svg";
import HorizontalScrollImage from "components/src/major/aboutUs/HorizontalScrollImage";
import Mission from "components/src/major/aboutUs/Mission";
import VisionSection from "components/src/major/aboutUs/VisionSection";
import WorkTogetherSection from "components/src/major/aboutUs/WorkTogetherSection";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Craya – Building the Future of Social Commerce",
  description: "Craya is building a world where creators become commerce. Learn about our mission, product, and the people behind the movement.",
  keywords: ["about Craya", "social commerce platform India", "e-commerce for creators", "storefront builder India", "powered by Craya"],
  openGraph: {
    title: "About Craya – Empowering Creator Commerce",
    description: "Craya helps brands and creators sell smarter with storefronts built for video and storytelling.",
    url: "https://craya.store/about",
    images: [
      {
        url: crayaLogo.src,
        width: 1200,
        height: 630,
        alt: "About Craya OG Image",
      },
    ],
    type: "website",
    siteName: "Craya",
  },
};

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="relative hidden aspect-[1728/576] w-full sm:block">
        <Image src={AboutUs} alt="About Us" fill className="object-fill" priority />
      </div>
      <div className="relative aspect-[1/0.6] w-full sm:hidden">
        <Image src={AboutUsSmall} alt="About Us" fill className="object-fill" priority />
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-brand-color1">
        <VisionSection imageSrcLarge={Arrow} imageSrcSmall={ArrowSmall} alt="This is our Vision" />
        <Mission imageLargeSrc={Climbing} imageSmallSrc={ClimbingSmall} alt="this is our mission" />
        <HorizontalScrollImage imageSrc={TeamMembers} alt="This is our Team" />
        <WorkTogetherSection imageSrc={Stairs} alt="we work together" />
      </div>
    </div>
  );
};

export default Page;
