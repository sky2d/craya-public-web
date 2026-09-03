import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

export const AboutCraya = () => {
  const _plugins = [new AutoPlay()];
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
    <>
      <div className="scrollbar-none flex gap-3 overflow-auto bg-brand-color2 sm:p-5 sm:py-3">
        <Marquee autoFill>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-full p-2 text-xl font-semibold sm:p-3 sm:heading-3">
              Build Your storefront in Mins
            </div>
          ))}
        </Marquee>
      </div>
      <div className="bg-brand-color1 p-10">
        <div className="text-center text-2xl font-bold text-white-light4 sm:text-3xl md:text-4xl lg:text-5xl">Who is Craya</div>
        <p className="text-center text-base font-normal text-white-light4 sm:text-lg md:text-xl lg:text-2xl">Made for social sellers</p>
        <p className="text-center text-base font-normal text-white-light4 sm:text-lg md:text-xl lg:text-2xl">Powered by community</p>
        <p className="text-start text-base font-bold text-white-light4 sm:text-lg md:text-xl lg:text-2xl">
          Build Your <br /> Community
        </p>

        <div className="relative mt-6">
          <Flicking circular={true} plugins={_plugins} className="w-full" ref={carouselRef}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="text-white relative mx-2 flex aspect-[.6257] h-72 items-center justify-center">
                <Image
                  src="https://i.pinimg.com/1200x/06/6f/02/066f0250407f62c2cb6eb7edfeaa55ec.jpg"
                  alt="image"
                  fill
                  className="rounded-lg bg-gray shadow-lg"
                />
              </div>
            ))}
          </Flicking>
          <div className="mt-8 hidden w-full items-end justify-end gap-4 md:flex">
            <button className="h-12 w-12 rounded-full bg-white-light4 p-2 focus:outline-none sm:block" onClick={handlePrevClick}></button>

            <button className="h-12 w-12 rounded-full bg-white-light4 p-2 focus:outline-none sm:block" onClick={handleNextClick}></button>
          </div>
        </div>
      </div>
    </>
  );
};
