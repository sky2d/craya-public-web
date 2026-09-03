"use client";
import Image from "next/image";
import { useState } from "react";

interface BrandInfoProps {
  name: string;
  image: string;
  link: string;
}

export const BrandInfo = ({ name, image, link }: BrandInfoProps) => {
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="h-56 w-56 cursor-pointer overflow-hidden rounded-2xl [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl [backface-visibility:hidden]">
          {loading && <div className="aspect-square h-[56] w-full animate-pulse rounded-2xl bg-white-light1" />}
          <Image
            src={image}
            draggable={false}
            fill
            alt={name}
            className={`rounded-2xl object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>

        {/* Back side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-brand-color2 text-white-light4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-lg font-semibold">{name}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-lg bg-brand-color1 px-3 py-2 text-sm text-white-light4 transition-opacity duration-300 hover:opacity-70"
          >
            Go to link
          </a>
        </div>
      </div>
    </div>
  );
};
