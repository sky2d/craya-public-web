// // src/components/Testimonial.tsx

// import { Perspective } from "@egjs/flicking-plugins";
// import Flicking from "@egjs/react-flicking";
// import { useRef, useState, type FC } from "react";
"use client";

export const testimonials = [
  {
    topImage: "/images/nivah.png",
    topImageAlt: "Anant Patel",
    bottomImage: "/images/anant.png",
    bottomImageAlt: "Nivah",
    name: "Anant Patel",
    quote:
      "“I always thought launching a brand meant months of work and crazy costs. With Craya, I set up my store in minutes — it literally felt like posting on my socials. The best part? My followers didn’t just like my products, they became my first community of buyers. Craya made me feel like a real brand from day one.” ",
  },
  {
    topImage: "/images/nivah.png",
    topImageAlt: "Anant Patel",
    bottomImage: "/images/anant.png",
    bottomImageAlt: "Nivah",
    name: "Anant Patel",
    quote:
      "“I always thought launching a brand meant months of work and crazy costs. With Craya, I set up my store in minutes — it literally felt like posting on my socials. The best part? My followers didn’t just like my products, they became my first community of buyers. Craya made me feel like a real brand from day one.”",
  },
  {
    topImage: "/images/nivah.png",
    topImageAlt: "Anant Patel",
    bottomImage: "/images/anant.png",
    bottomImageAlt: "Nivah",
    name: "Anant Patel",
    quote:
      "“I always thought launching a brand meant months of work and crazy costs. With Craya, I set up my store in minutes — it literally felt like posting on my socials. The best part? My followers didn’t just like my products, they became my first community of buyers. Craya made me feel like a real brand from day one.”",
  },
  {
    topImage: "/images/nivah.png",
    topImageAlt: "Anant Patel",
    bottomImage: "/images/anant.png",
    bottomImageAlt: "Nivah",
    name: "Anant Patel",
    quote:
      "“I always thought launching a brand meant months of work and crazy costs. With Craya, I set up my store in minutes — it literally felt like posting on my socials. The best part? My followers didn’t just like my products, they became my first community of buyers. Craya made me feel like a real brand from day one.”",
  },
  {
    topImage: "/images/nivah.png",
    topImageAlt: "Anant Patel",
    bottomImage: "/images/anant.png",
    bottomImageAlt: "Nivah",
    name: "Anant Patel",
    quote:
      "“I always thought launching a brand meant months of work and crazy costs. With Craya, I set up my store in minutes — it literally felt like posting on my socials. The best part? My followers didn’t just like my products, they became my first community of buyers. Craya made me feel like a real brand from day one.”",
  },
];

import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/react-flicking/dist/flicking.css";
import { FC } from "react";
import TestimonialLayout from "./testimonalSlides/testimonialLayout";

const DemoComponent: FC = () => {
  const plugins = [new Perspective({ rotate: 0.5 })];

  return (
    <>
      <p className="flex flex-col py-8 text-center text-5xl font-bold md:text-6xl">
        <span>See what our users </span>
        <span>have to say</span>
      </p>
      <Flicking circular={true} plugins={plugins} className="flex w-full justify-center overflow-hidden" moveType="strict" bound={true}>
        {testimonials.map((loop, index) => {
          return (
            <div key={index} className={`h-full w-full overflow-hidden rounded-md py-24 lg:w-1/2`}>
              <TestimonialLayout topImage={loop.topImage} bottomImage={loop.bottomImage} name={loop.name} quote={loop.quote} />
            </div>
          );
        })}
      </Flicking>
    </>
  );
};

export default DemoComponent;
