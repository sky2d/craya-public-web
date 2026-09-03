"use client";

import Image, { StaticImageData } from "next/image";

type VisionSectionProps = {
  imageSrcSmall: string | StaticImageData;
  imageSrcLarge: string | StaticImageData;
  alt?: string;
};

const VisionSection = ({ imageSrcSmall, imageSrcLarge, alt = "Vision Background" }: VisionSectionProps) => {
  return (
    <section className="relative flex w-full items-start justify-start overflow-hidden bg-[#7B4DFF] p-[4vw] pb-[32vw]">
      {/* Content */}
      <div className="relative z-10 mr-auto w-[80%] max-w-7xl px-6">
        <h1 className="text-2xl font-extrabold text-white-light4 sm:mb-6 sm:text-6xl">VISION</h1>
        <p className="max-w-2xl text-xs leading-relaxed text-white-light4 sm:text-xl">
          We envision a world where shopping feels less like a chore and more like an experience. Where discovering something uniquely brings you
          actual joy. Where the path from &quot;I want this&quot; to &quot;it&apos;s mine&quot; feels magical instead of tedious.
        </p>
      </div>

      {/* Background Images */}
      <div className="absolute inset-0 w-full">
        {/* Small screen image */}
        <Image src={imageSrcSmall} alt={alt} draggable={false} fill className="!relative !h-auto object-contain object-right sm:hidden" priority />
        {/* Large screen image */}
        <Image
          src={imageSrcLarge}
          alt={alt}
          draggable={false}
          fill
          className="!relative hidden !h-auto object-contain object-right sm:block"
          priority
        />
      </div>
    </section>
  );
};

export default VisionSection;
