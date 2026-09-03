"use client";

import Image, { StaticImageData } from "next/image";

type WorkTogetherSectionProps = {
  imageSrc: string | StaticImageData;
  alt?: string;
};

const WorkTogetherSection = ({ imageSrc, alt = "Stairs to Success" }: WorkTogetherSectionProps) => {
  return (
    <section className="relative flex h-full h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FFD232] p-2 text-center">
      <h1 className="relative mb-10 text-4xl font-extrabold text-black-dark1 sm:text-[4vw]">
        <span className="relative z-10">LET&apos;S WORK TOGETHER</span>
        <span className="absolute inset-0 z-0 translate-x-1 translate-y-1 select-none text-white-light1">LET&apos;S WORK TOGETHER</span>
      </h1>

      <button className="border-black relative z-10 mt-4 rounded-full border-2 bg-transparent px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:scale-105 sm:text-xl">
        DROP A HI!! 👋
      </button>

      <div className="relative bottom-0 right-0 h-full w-full md:absolute md:w-[40%]">
        <Image src={imageSrc} alt={alt} draggable={false} fill className="w-full object-contain" priority />
      </div>
    </section>
  );
};

export default WorkTogetherSection;
