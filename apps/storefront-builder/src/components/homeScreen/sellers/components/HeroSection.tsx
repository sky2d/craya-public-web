"use client";
import { steps } from "@/constant/createStoreStep";
import Send from "components/src/icons/iconFiles/Send.svg";
import FancyButton from "components/src/minor/FancyButton";
import Image from "next/image";
import AIFeature from "./heroSection/AIFeature";
import { StepCard } from "./slides/TimeLineSlide";

export const HeroSection = () => {
  const mainText = "Your first-ever Social Shop <br /> is just 3 STEPS away";
  const lines = mainText.split(/<br \/>/g);
  const subText = String("Fast, Fun and Effortless").split("");
  return (
    <div className="relative w-full snap-start">
      <div className="flex h-full w-full flex-col justify-center px-2 py-4 md:flex-row">
        <div className="order-2 flex w-full items-center justify-center sm:w-1/2 md:order-1">
          <div className="my-8 flex w-auto flex-col items-center justify-center p-1">
            <p className="text-center text-3xl font-bold text-black-dark1 sm:text-4xl md:text-5xl lg:text-6xl">
              {lines.map((letter, index) => (
                <span
                  key={index}
                  className="animate-pop-up inline-block text-black-dark1"
                  style={{
                    animationDelay: `${index * 0.07}s`,
                    opacity: 0, // Start with opacity 0 before animation begins
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </p>
            <div className="relative z-0 my-10 border-4 border-brand-color2 p-2 text-xl font-bold text-black-dark1 sm:text-3xl xl:text-5xl">
              {subText.map((letter, index) => (
                <span
                  key={index}
                  className="animate-pop-up inline-block text-brand-color1"
                  style={{
                    animationDelay: `${index * 0.07}s`,
                    opacity: 0,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}

              <div className="absolute -right-10 bottom-[60%] aspect-square h-[50px] md:h-[70px] md:w-[70px]">
                <Image src="/icons/sparkle.svg" alt="sparkle" fill />
              </div>
              <div className="absolute -left-3 -top-3 z-10 h-5 w-5 border-4 border-brand-color1 bg-white-light4"></div>
              <div className="absolute -bottom-3 -left-3 z-10 h-5 w-5 border-4 border-brand-color1 bg-white-light4"></div>
              <div className="absolute -bottom-3 -right-3 z-10 h-5 w-5 border-4 border-brand-color1 bg-white-light4"></div>
            </div>

            <p className="mt-4 w-auto text-start text-black-dark1 body-md">Sell as easily as you post. Seriously 🤌 </p>
            <p className="w-auto text-center text-black-dark1 body-md"> Not just a store</p>
            <p className="w-auto text-center text-black-dark1 body-md"> A social shopping experience</p>
            <FancyButton
              onClick={() => window.open("https://form.jotform.com/251038220051036", "_blank")}
              text="Become a Seller"
              icon={<Image src={Send} alt="Send" width={20} height={20} />}
              className="mt-4 px-4 py-5"
            />
          </div>
        </div>

        <AIFeature />
      </div>

      <div className="relative overflow-hidden">
        {steps.map((step, index) => (
          <StepCard key={index} step={index + 1} title={step.title} list={step.list} footer={step.footer} />
        ))}
      </div>
    </div>
  );
};
