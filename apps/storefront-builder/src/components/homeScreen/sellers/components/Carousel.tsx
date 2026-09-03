"use client";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import Mobile from "../assets/SmallSize.png";

interface Slide {
  id: number;
  alt: string;
  heading: string;
  description: string;
  videoSrc: string;
}

const slides: Slide[] = [
  {
    id: 1,
    videoSrc: "https://craya-public-prod.s3.ap-south-1.amazonaws.com/1so+what+are+loops+-+loops2.mp4",
    alt: "Illustration showing Loops feature concept",
    heading: "So what are loops?",
    description:
      "Loops are like reels but better. They are a tool for you to market your products by making discovery fun. Loops promote spontaneous shopping and drive sales.",
  },
  {
    id: 2,
    videoSrc: "https://craya-public-prod.s3.ap-south-1.amazonaws.com/so+what+are+loops+-+autodm.mp4",
    alt: "Illustration showing product marketing via Loops",
    heading: "Auto-DM",
    description:
      "Send product links, coupons and goodies via fully customizable DMs to potential buyers that perform certain actions like commenting on your IG reels.",
  },
  {
    id: 3,
    videoSrc: "https://craya-public-prod.s3.ap-south-1.amazonaws.com/so+what+are+loops+-+coupons.mp4",
    alt: "Illustration showing increased sales through Loops",
    heading: "What's the deal with discounts",
    description: "Create, launch, and track promotional campaigns in seconds. No complex rules - just effective discounts that drive sales.",
  },
];

const Carousel: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<Flicking | null>(null);

  const handlePrevClick = useCallback(async () => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);
    await carouselRef.current.prev();
    setIsAnimating(false);
  }, [isAnimating]);

  const handleNextClick = useCallback(async () => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);
    await carouselRef.current.next();
    setIsAnimating(false);
  }, [isAnimating]);
  return (
    <div className="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden py-12 md:my-48">
      <Flicking align="prev" circular={true} ref={carouselRef} moveType="strict" className="relative transition-opacity duration-300">
        {slides.map((item, index) => (
          <div key={item.id} className="w-full flex-shrink-0 p-4 sm:w-[80%]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
              <div key={index} className="relative aspect-[9/12] w-full max-w-sm flex-shrink-0 md:w-1/2">
                <Image
                  src={Mobile}
                  alt="Background SVG"
                  fill
                  style={{
                    objectFit: "contain",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                  priority
                />

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: "1%",
                    left: "20%",
                    width: "60%",
                    height: "96.5%",
                    objectFit: "cover",
                    borderRadius: "20px",
                    zIndex: 0,
                  }}
                >
                  <source src={item.videoSrc} type="video/mp4" />
                </video>
              </div>
              <div className="text-white w-full text-center md:w-1/2 md:text-left">
                <h2 className="mb-3 text-[6vw] font-bold text-brand-color1 sm:text-[4.5vw] md:mb-4 md:text-[3vw] lg:text-[2.7vw]">{item.heading}</h2>
                <p className="text-[3.5vw] leading-relaxed sm:text-[2vw] md:text-[1.5vw] lg:text-[1.3vw]">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Flicking>
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[30%]"
        style={{
          background: "linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      ></div>
      <div className="bottom-0 hidden w-full items-center justify-center sm:absolute sm:flex">
        <button className="hover:bg-gray-100 rounded-full p-2 focus:outline-none sm:block" onClick={handlePrevClick}>
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: "#B2B7F150",
              color: "#7C54E9",
            }}
          >
            <MdOutlineArrowBackIos />
          </span>
        </button>

        <button className="hover:bg-gray-100 rounded-full p-2 focus:outline-none sm:block" onClick={handleNextClick}>
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: "#B2B7F150",
              color: "#7C54E9",
            }}
          >
            <MdOutlineArrowForwardIos />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
