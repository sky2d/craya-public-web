"use client";

import Marquee from "react-fast-marquee";

const ProductSoldOut = () => {
  return (
    <div
      className="my-2 w-full"
      style={{
        background: `linear-gradient(
            90deg,
            #fff6b0 0%,
            #f9c113 20%,
            #f3cd6c 35%,
            #e6a100 50%,
            #f9c113 65%,
            #fff6b0 80%,
            #f3cd6c 100%
          )`,
      }}
    >
      <Marquee autoFill className="p-2">
        <span className="px-4 text-lg font-bold tracking-wide text-black-dark1 md:text-4xl">SOLD OUT</span>
      </Marquee>
    </div>
  );
};

export default ProductSoldOut;
