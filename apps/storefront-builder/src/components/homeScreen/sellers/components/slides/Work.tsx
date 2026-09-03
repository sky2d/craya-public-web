"use client";

import Image from "next/image";
import Computer from "../../assets/Computer.png"; // Update with actual Computer asset if needed
import ConfusedMan from "../../assets/Confused.svg"; // Update with actual Confused man asset if needed
import Background from "../../assets/slides/WorkBackground.png"; // Update path as per your project

const ConfusedVisual = () => {
  return (
    <div
      className="relative flex h-screen w-screen items-center justify-between px-10"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="max-w-1/2 absolute left-0 top-0 w-full p-2 text-start text-[10vw] font-black text-brand-color2 sm:text-[7vw]">
        <span>How it</span> <br />
        <span> Works ?</span> <br />
      </p>
      {/* Left side: Computer */}
      <div className="absolute right-0 top-0 aspect-square h-[35%] max-w-[500px] sm:bottom-[-10px] sm:left-0 sm:top-auto sm:h-[50%]">
        <Image src={Computer} alt="Old Computer" fill className="object-contain" />
      </div>

      {/* Right side: Confused Man + Text */}
      <div className="absolute bottom-0 left-0 flex h-full w-1/2 max-w-[600px] flex-col justify-center sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:items-center">
        <Image src={ConfusedMan} alt="Confused Person" fill className="object-contain" />
      </div>
    </div>
  );
};

export default ConfusedVisual;
