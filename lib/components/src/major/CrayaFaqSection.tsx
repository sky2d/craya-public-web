"use client";
import { Collapse } from "antd";
import Image from "next/image";
import Faq from "../icons/iconFiles/FAQimage.png";
import { openWhatsAppChat } from "../utils/openWhatsAppChat";
import { ContactFounder } from "./ContactFounder";

const { Panel } = Collapse;

const FAQsArray = [
  {
    title: "What is craya?",
    description: "Craya is an all-in-one solution to building a brand. Sell products, reach customers, and everything in between.",
  },
  {
    title: "Why should I trust craya?",
    description: "Because we don't tie you into subscriptions, and you can revert back anytime.",
  },
  {
    title: "Is there a setup fee or a domain fee?",
    description: "Nope! Setting up your store is free.",
  },
  {
    title: "Do I need technical skills to build my store?",
    description: "Not at all! If you can scroll Pinterest, you can make a beautiful storefront.",
  },
  {
    title: "How can I connect to Instagram?",
    description: "You can link your storefront on any social media bio, and your viewers will be able to reach you.",
  },
  {
    title: "How are the product prices decided?",
    description: "You do! You decide everything about your store, from product pricing to store policies.",
  },
  {
    title: "Who handles shipping?",
    description: "We provide you with our trusted courier partners. We offer a seamless shipping integration with ShipRocket.",
  },
  {
    title: "What if I need help?",
    description:
      "Scroll down a little further and get directly in touch with the CEO and voice your concern. Feel free to contact us about any query or any feature that you would like to see in Craya.",
  },
];

const CrayaFAQSection = () => {
  return (
    <div className="flex flex-col items-center justify-start p-2">
      <div className="flex h-full w-full flex-col items-center justify-start p-4">
        <h1 className="my-4 text-brand-color1 heading-2">FAQ</h1>

        <div className="flex w-full flex-col items-start justify-center gap-4 sm:flex-row">
          <div className="hidden h-auto justify-center sm:flex">
            <Image width={200} height={200} draggable={false} src={Faq} alt="FAQ illustration" className="max-w-full" />
          </div>

          {/* Accordion with semantic description list */}
          <div className="w-full sm:w-3/5">
            <dl>
              <Collapse
                bordered={false}
                accordion
                className="rounded-lg [&_.ant-collapse-content-box]:!p-0"
                expandIconPosition="end"
                style={{ backgroundColor: "white" }}
              >
                {FAQsArray.map((item, index) => (
                  <Panel
                    header={<div className="flex w-full items-center justify-between text-brand-color1 body-lg-semibold">{item.title}</div>}
                    key={index}
                    className="border-b-2"
                  >
                    <dd className="px-4 text-black-dark3 body-normal">{item.description}</dd>
                  </Panel>
                ))}
              </Collapse>
            </dl>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="w-full sm:w-3/4">
        <ContactFounder openWhatsAppChat={openWhatsAppChat} />
      </div>
    </div>
  );
};

export default CrayaFAQSection;
