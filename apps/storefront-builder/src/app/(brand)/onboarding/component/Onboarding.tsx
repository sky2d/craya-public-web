"use client";

import onboardingImage from "@/assets/images/onboardingImage.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <div className="relative h-screen">
      <Image src={onboardingImage} alt="Onboarding Image" fill priority />
      <div className="absolute right-[21rem] top-20 animate-bounce">
        <div className="animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-brand-color2 via-brand-color2 to-brand-color2 opacity-70 blur-lg transition-all duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"></div>
        <button
          onClick={() => router.push("/dashboard/store")}
          title="Get quote now"
          className="font-pj focus:ring-gray-900 relative inline-flex items-center justify-center rounded-xl bg-white-light4 px-8 py-4 text-lg font-bold text-brand-color1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          role="button"
        >
          Let&apos;s get started
        </button>
      </div>
    </div>
  );
};
