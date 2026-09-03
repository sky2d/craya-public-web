import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface StepCardProps {
  step: number;
  title: string;
  list: string[];
  footer: string;
}

export const StepCard: React.FC<StepCardProps> = ({ step, title, list, footer }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Guard clause to ensure refs are set
    if (!panelRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the line FROM scaleY: 0
      gsap.from(lineRef.current, {
        scaleY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current, // Trigger is the card itself
          scrub: 1,
          pin: true, // Pin the entire card
          start: "top top", // Start when the top of the card hits the top of the viewport
          end: "+=150%", // End after scrolling 150% of the card's height
        },
      });
    }, panelRef); // Scope the context to the card

    return () => ctx.revert();
  }, []);

  return (
    <div ref={panelRef} className="flex h-screen flex-col items-center p-4 sm:p-0">
      {/* Step Heading */}
      <h2 className="mb-2 text-start text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{"Step " + step}</h2>
      {/* Timeline */}
      <div className="flex h-full gap-8">
        <div className="flex h-full flex-col items-start sm:w-56">
          <div className="relative flex h-full flex-col items-center border">
            <div
              ref={lineRef}
              className="line line-2"
              style={{
                display: "block",
                width: "2px",
                height: "100%",
                backgroundColor: "black",
                transformOrigin: "top center",
                boxShadow: "0 0 5px #000, 0 0 10px #000, 0 0 20px #000, 0 0 40px #000",
              }}
            ></div>
            <div className="absolute -top-2 h-8 w-8 rounded-full bg-black-dark1"></div>
          </div>
        </div>

        <div className="flex h-full w-full flex-col break-words sm:w-[500px]">
          {/* Gray placeholder */}
          <div className="mb-4 h-1/2 rounded-md bg-gray"></div>

          {/* Title */}
          <h3 className="mb-6 text-purple-600 heading-3">{title}</h3>

          {/* Steps list */}
          <ul className="text-gray-800 mb-6 space-y-1 heading-5-semibold">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Footer text */}
          <p className="text-gray-700 heading-5-semibold">{footer}</p>
        </div>
      </div>
    </div>
  );
};
