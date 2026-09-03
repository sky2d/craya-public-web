"use client";

import { useEffect, useState } from "react";

const CATCHY_PHRASES = [
  "AI did the heavy lifting ",
  "Stores that scroll like feeds",
  "Your store is live in a blink",
  "Drag, drop, done. Easy",
  "Selling? Feels like posting",
];

export default function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex(prev => (prev === CATCHY_PHRASES.length - 1 ? 0 : prev + 1));
        setAnimate(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4 flex w-[50%] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(90deg,rgba(178,183,241,0.8)_0%,rgba(124,84,234,0.85)_49.04%,rgba(178,183,241,0.8)_100%)] px-2 py-2 font-medium text-white-light4 shadow-lg">
      <div className="flex items-center justify-center">
        <span
          className={`inline-block text-[3vw] font-bold transition-all duration-500 ease-in-out sm:text-[1.5vw] ${
            animate ? "translate-y-[-20px] opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {CATCHY_PHRASES[index]}
        </span>
      </div>
    </div>
  );
}
