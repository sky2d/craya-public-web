"use client";

import Image, { StaticImageData } from "next/image";

type MissionImageProps = {
  imageLargeSrc: string | StaticImageData;
  imageSmallSrc: string | StaticImageData;
  alt?: string;
};
const Mission = ({ imageLargeSrc, imageSmallSrc, alt = "Vision Background" }: MissionImageProps) => {
  return (
    <section className="relative flex min-h-screen w-full items-start justify-end overflow-hidden bg-[#7B4DFF] p-2">
      {/* Content */}
      <div className="relative z-10 max-w-7xl px-6 sm:px-20">
        <h1 className="mb-6 text-5xl font-extrabold text-white-light4 sm:text-6xl">Mission</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white-light4 sm:text-xl">To</p>
      </div>

      <div className="absolute inset-0 h-full w-full">
        <Image src={imageLargeSrc} alt={alt} fill draggable={false} className="hidden object-cover object-right sm:block" priority />
        <Image src={imageSmallSrc} alt={alt} fill draggable={false} className="object-contain object-right sm:hidden" priority />
      </div>
    </section>
  );
};

export default Mission;
