// src/components/Testimonial.tsx

import Image from "next/image";
import type { FC } from "react";

interface TestimonialProps {
  topImage: string;
  bottomImage: string;
  name: string;
  quote: string;
}

const TestimonialLayout: FC<TestimonialProps> = ({ topImage, bottomImage, name, quote }) => {
  return (
    <div className="relative mx-auto flex w-[70%] max-w-lg justify-center md:max-w-2xl">
      <div className="absolute -left-[15px] top-[-15px] z-20 flex aspect-square h-10 items-center justify-center rounded-full border-2 border-brand-color2 bg-white-light4">
        <Image src="/images/dot.png" alt={name} height={30} width={30} className="object-contain" />
      </div>

      {/* Top rotated image */}
      <div className="absolute right-[-2rem] top-[-5rem] z-20 aspect-[1/1.4] w-[90px] rotate-[22deg] transform border border-[#353535] bg-white-light4 p-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] md:w-[100px]">
        <div className="relative h-[80%] w-full border-[0.25px] border-[#353535]">
          <Image src={topImage} alt={name} fill className="object-cover" />
        </div>
        <p className="mt-2 text-center text-xs">{name}</p>
      </div>

      {/* Bottom rotated image */}
      <div className="absolute bottom-[-3rem] left-[-2rem] z-20 aspect-[1/1.4] w-[90px] -rotate-[22deg] transform border border-[#353535] bg-white-light4 p-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] sm:left-[-2rem] md:w-[100px]">
        <div className="relative h-[80%] w-full border-[0.25px] border-[#353535]">
          <Image src={bottomImage} alt={name} fill className="object-cover" />
        </div>
        <p className="mt-2 text-center text-xs">{name}</p>
      </div>

      {/* Quote box */}
      <div className="relative z-10 flex justify-center rounded-[21px] border-b-8 border-r-8 border-[#a8a8a8] bg-brand-color1 p-8 text-white-light4">
        <blockquote className="relative z-10 w-[80%] text-center leading-relaxed heading-6 md:heading-5">&quot;{quote}&quot;</blockquote>
      </div>
    </div>
  );
};

export default TestimonialLayout;
