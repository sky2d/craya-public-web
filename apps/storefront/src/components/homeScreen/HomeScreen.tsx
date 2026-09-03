"use client";

import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Components
import FancyButton from "components/src/minor/FancyButton";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

// Icons
import icons from "@/assets/icons";
import images from "@/assets/image";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const HomeScreen = () => {
  const crayaSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToCraya: () => void = () => {
    crayaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const iconComponents = [icons.Hat, icons.Bag, icons.Jumper, icons.BlackDress, icons.Suit, icons.LongformalDress];

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-[82vh] snap-start flex-col items-center justify-center bg-brand-color1 p-2 text-center">
        <div className="flex w-full flex-col items-start sm:flex-row sm:items-center">
          <div className="relative aspect-[4/3] w-full sm:w-1/2">
            {" "}
            {/* Added height */}
            <Image
              src={icons.Laptop}
              alt="Laptop"
              fill
              sizes="100vw"
              draggable={false}
              className="object-contain" // or object-cover
            />
          </div>

          <div className="mt-8 flex w-full flex-col items-start justify-center p-5 text-start sm:w-1/2">
            <h1 className="text-4xl font-black text-[#F2D012] sm:text-[4vw]">Swipe. Click. Own</h1>
            <p className="mt-2 max-w-md text-lg text-white-light4">
              No more DMs—shop your favorite brands effortlessly.
              <br />
              <span className="text-2xl font-bold text-[#F2D012]">Shopping has never been more FUN</span>
            </p>
            <FancyButton text="Start Discovering" className="cursor-pointer" />
          </div>
        </div>

        <button
          onClick={scrollToCraya}
          className="mb-6 flex items-center justify-between rounded-3xl border-t-2 border-t-white-light3 bg-brand-color3 p-2 text-white-light4 shadow-2xl"
        >
          <IoIosArrowDown className="mx-1" />
          <span className="mx-1">Why Craya</span>
        </button>
      </section>

      <div className="flex aspect-[1/2] w-full snap-start flex-col justify-center sm:h-screen" ref={crayaSectionRef}>
        {/* Section 1 */}
        <div className="flex h-full flex-1 flex-col items-center justify-between gap-4 bg-brand-color2 p-1 sm:flex-row">
          <div className="flex items-center justify-start">
            <div className="max-w-[30%] text-3xl font-bold">
              <Image draggable={false} src={"/icons/One.svg"} alt="First Image" width={440} height={155} />
            </div>
            <div className="w-full">
              <h2 className="text-[6vw] font-black text-brand-color1 md:text-[3vw]">One tap checkout</h2>
              <p className="lg:[1.5vw] text-[4vw] font-semibold text-white-light4 sm:text-[2vw]">No dms no wait</p>
            </div>
          </div>
          <div className="relative h-full min-h-10 w-full">
            <Image src={images.Cart} draggable={false} alt="Arrow" fill className="object-contain" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex h-full flex-1 flex-col items-center justify-between gap-4 bg-brand-color3 p-1 sm:flex-row">
          <div className="flex items-center justify-start">
            <div className="max-w-[30%] text-3xl font-bold">
              <Image src={icons.Two} draggable={false} alt="Second Image" width={440} height={155} />
            </div>
            <div className="w-full">
              <h2 className="text-[6vw] font-black text-brand-color1 md:text-[3vw]">Curated brands</h2>
              <p className="lg:[1.5vw] text-[4vw] font-semibold text-white-light4 sm:text-[2vw]">Unique finds that are nowhere else to be found</p>
            </div>
          </div>
          <div className="relative flex w-full items-center gap-x-6 overflow-hidden px-4 py-6 sm:max-w-[50%]">
            {/* Left gradient fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-brand-color3 via-brand-color3 to-transparent sm:w-16" />

            {/* Actual marquee */}
            <Marquee autoFill className="relative z-0">
              {iconComponents.map((icon, index) => (
                <div
                  key={index}
                  className="mx-2 flex aspect-square w-[15vw] min-w-20 items-center justify-center rounded-full bg-white-light4 shadow-md md:w-[9vw]"
                >
                  <Image src={icon} draggable={false} alt={`icon-${index}`} width={60} height={60} />
                </div>
              ))}
            </Marquee>

            {/* Right gradient fade (fixed direction) */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-brand-color3 via-brand-color3 to-transparent sm:w-16" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex h-full flex-1 flex-col items-center justify-between gap-4 bg-brand-color1 p-1 sm:flex-row">
          <div className="flex items-center justify-start">
            <div className="max-w-[30%] text-3xl font-bold">
              <Image src={icons.Three} draggable={false} alt="Third Image" width={440} height={155} />
            </div>
            <div className="w-full">
              <h2 className="text-[6vw] font-black text-brand-color2 md:text-[3vw]">Shop while you swipe</h2>
              <p className="lg:[1.5vw] text-[4vw] font-semibold text-white-light4 sm:text-[2vw]">Like Instagram, but much better</p>
            </div>
          </div>
          <div className="relative flex h-full w-full justify-center text-5xl">
            <Image src={icons.Side} draggable={false} alt="Arrow" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Discovery Section */}
      {/* <section className="min-h-screen bg-brand-color2 p-2">
        <p className="text-center text-6xl font-black text-white-light4">Start Discovering</p>
        <div className="relative flex flex-col items-center justify-center p-4 sm:flex-row">
          <Image src={icons.Swipe} alt="Swipe" sizes="100vw" className="left-[1.5vw] top-5 m-2 w-28 sm:absolute lg:w-[15rem]" />
          <div className="flex h-full w-full snap-center items-center justify-center">
            <iframe
              className="aspect-[1/1.8] h-auto max-h-screen w-full rounded-xl sm:w-auto"
              src="https://craya.shop/lavia/videos"
              title="Showcase"
            ></iframe>
          </div>
        </div>
        <div className="my-2 flex items-center justify-center">
          <div className="relative h-[10vh] w-3/4 cursor-pointer sm:w-[20vw]">
            <Image src={icons.Button} alt="Fullscreen" fill className="object-contain transition hover:translate-y-1 hover:shadow-md" />
          </div>
        </div>
      </section> */}

      {/* Why Wait */}
      <section className="flex snap-start flex-col items-center bg-[linear-gradient(180deg,#7C54E9_0%,rgba(124,84,233,0.96)_60%,rgba(124,84,233,0.96)_56%,rgba(124,84,233,0.73)_80.5%,rgba(124,84,233,0)100%)] p-4">
        <p className="text-center text-5xl font-black text-white-light4 sm:text-[7vw]">Why wait?</p>
        <p className="mb-2 mt-8 text-center text-3xl font-black text-[#F2D012] sm:text-[4vw]">
          Mauka bhi hai,
          <br />
          dastoor bhi...
          <br />
          toh deri kis baat ki?
        </p>
        <div className="relative my-4 aspect-[4/1] w-[50vw] cursor-pointer hover:translate-y-1 sm:w-[20vw]">
          <Image src={images.NaaMane} draggable={false} alt="Dress" fill className="object-contain" />
        </div>
      </section>

      {/* Plot Twist Section */}
      <section className="relative my-4 flex w-full snap-start items-center justify-center">
        <Image src={icons.WaitStop} draggable={false} fill alt="Stop" sizes="100vw" className="w-full" />
      </section>

      <section className="flex snap-center items-center justify-start bg-brand-color2">
        <p className="my-10 flex w-full flex-col p-2">
          <span className="text-[2vw] font-black text-brand-color1">Plot twist:</span>
          <span className="text-[5vw] font-black text-brand-color1">We are just getting started</span>
        </p>
        <p className="flex w-auto items-center justify-center text-center text-[15vw]">😉</p>
      </section>

      <Footer />
    </div>
  );
};

export default HomeScreen;
