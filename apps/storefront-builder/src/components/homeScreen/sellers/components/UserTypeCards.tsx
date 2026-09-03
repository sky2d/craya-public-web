"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import flyingCars from "../assets/flyingCars.svg";

const cards = [
  {
    id: 0,
    title: "Brands",
    description: "Free website, mobile management, zero upfront costs",
    bgColor: "bg-brand-color1",
    buttonColor: "bg-brand-color2",
    buttonText: "Become a Seller",
    path: "https://form.jotform.com/251038220051036",
  },
  {
    id: 1,
    title: "Buyers",
    description: "Discovery platform connecting unique sellers",
    bgColor: "bg-brand-color2",
    buttonColor: "bg-white-light2",
    buttonText: "Start Buying",
    path: process.env.NEXT_PUBLIC_WEB_DOMAIN || "https://craya.shop/",
  },
  {
    id: 2,
    title: "Influencers",
    description: "Get discovered and partner with brands.",
    bgColor: "bg-brand-color1",
    buttonColor: "bg-brand-color2",
    buttonText: "Know More",
    path: "/influencer",
  },
];

interface UserTypeCardProps {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  isOpen?: boolean;
  onClick?: () => void;
  path: string;
  buttonText: string;
}

const LargeUserTypeCard: React.FC<UserTypeCardProps> = ({ id, title, description, bgColor, buttonColor, onClick, buttonText, path }) => {
  const router = useRouter();
  const handleClick = (path: string) => {
    if (path) {
      router.push(path);
    }
  };
  // attach a form for become a seller
  return (
    <div
      className={`bg-white aspect-square ${id == 0 ? "rounded-bl-2xl rounded-tl-2xl" : id == 2 ? "rounded-br-2xl rounded-tr-2xl" : ""} flex min-h-[310px] w-full flex-col items-center justify-between border-2 border-black-dark1 p-3 ${bgColor} flex-1`}
    >
      <p onClick={onClick} className="body-md-bold mt-4 cursor-pointer text-center text-white-light4 sm:heading-4 md:heading-2 lg:text-[3vw]">
        {title}
      </p>
      <p className="p-2 text-center text-2xl font-semibold text-white-light4 lg:text-[2vw]">{description}</p>
      <button
        onClick={() => handleClick(path)}
        className={`mb-4 border-2 border-black-dark1 p-2 px-3 text-xl font-normal lg:text-[1vw] ${buttonColor} rounded-full`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export const UserTypeCards = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCard, setActiveCard] = useState<number>(0);
  const router = useRouter();

  const getCardStyle = (index: number) => {
    const offsets = [100, 50, 0];
    const zIndices = ["z-30", "z-20", "z-10"];

    const total = cards.length;
    const position = (index - activeCard + total) % total;

    return {
      zIndex: zIndices[position],
      top: `${offsets[position]}px`,
    };
  };

  return (
    <div className="flex w-full flex-col items-center justify-center md:flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl p-2 md:flex-row lg:w-[75%]">
        {cards.map(({ id, title, description, bgColor, buttonColor, buttonText, path }, index) => (
          <div className="hidden w-1/3 md:block" key={index}>
            <LargeUserTypeCard
              title={title}
              path={path}
              id={id}
              description={description}
              bgColor={bgColor}
              buttonColor={buttonColor}
              isOpen={openIndex === index}
              buttonText={buttonText}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          </div>
        ))}
        <div className="absolute right-0 -z-10 hidden w-full justify-end md:-top-[1%] md:flex lg:-top-[4%] 2xl:-top-[8%]">
          <Image src={flyingCars} alt="flying cars" className="w-[70%]" width={100} height={100} />
        </div>
      </div>
      <div className="relative mx-auto aspect-[1/0.8] w-full max-w-[300px] md:hidden">
        {cards.map((card, index) => {
          const { zIndex, top } = getCardStyle(index);

          return (
            <div
              key={card.id}
              className={`border-black absolute h-full w-full cursor-pointer rounded-xl border-2 text-white-light4 ${card.bgColor} transition-all ${zIndex} `}
              style={{ top }}
              onClick={() => setActiveCard(index)}
            >
              <div className={`flex h-12 items-center justify-center rounded-t-xl`}>
                <h2 className="text-lg font-bold text-white-light4">{card.title}</h2>
              </div>
              <div className="flex h-[calc(100%-5rem)] flex-col items-center justify-center p-4">
                <p className="mb-4 text-center text-white-light4">{card.description}</p>
                <button onClick={() => router.push(card.path)} className={`text-black rounded-full ${card.buttonColor} px-4 py-2 font-semibold`}>
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
