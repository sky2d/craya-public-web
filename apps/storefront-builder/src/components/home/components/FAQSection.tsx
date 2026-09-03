import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQs = [
  {
    title: "What is craya?",
    description: "Craya is an all-in-one solution to building a brand. Sell products, reach customers and everything in between.",
  },
  { title: "Why should I trust craya?", description: "Because we don't tie you into subscriptions and you can revert back anytime." },
  { title: " Is there a setup fee or a domain fee?", description: "Nope! Setting up your store is free. " },
  {
    title: "Do I need technical skills to build my store?",
    description: "Not at all! If you can scroll pinterest, you can make a beautiful storefront.",
  },
  {
    title: "How can I connect to Instagram?",
    description: "You can link your storefront on any social-media bio and your viewers will be able to reach you.",
  },
  {
    title: "How are the product prices decided?",
    description: " You do! You decide everything about your store from product pricing to store policies.",
  },
  {
    title: "Who handles shipping?",
    description: "We provide you with our trusted courier partners. We offer a seamless shipping integration with ShipRocket.",
  },
  {
    title: " What if I need help?",
    description:
      " Scroll down a little further and get directly in touch with the CEO and voice your concern. Feel free to contact us about any query or any feature that you would like to see in craya.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {FAQs.map(({ title, description }, index) => (
        <div key={index} className="bg-white w-full border-b p-3">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="bg-gray-100 hover:bg-gray-200 flex w-full items-center justify-between rounded-lg p-2 text-left text-brand-color1 body-lg-semibold"
          >
            {title}
            <span>{openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 text-black-dark3 body-normal">{description}</div>
          </div>
        </div>
      ))}
    </>
  );
};
