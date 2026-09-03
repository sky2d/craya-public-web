import Image from "next/image";
import RotatingBanner from "./RotatingBanner";

const AIFeature = () => {
  return (
    <div className="relative order-1 my-8 flex h-full w-full flex-col items-center justify-center py-4 md:order-2 md:w-1/2">
      {/* Wrapper for both videos */}
      <div className="relative flex w-full items-center justify-center">
        {/* Top video (smaller height) */}
        <div className="absolute left-0 top-[40%] aspect-[187/331] w-[22%] overflow-hidden rounded-[5px] bg-white-light2 shadow-md">
          <video
            className="h-full w-full object-fill"
            src="https://craya-public-prod.s3.ap-south-1.amazonaws.com/1so+what+are+loops+-+loops2.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Abstract background video of dark, flowing lines."
          />
        </div>
        <div className="absolute -top-[10%] right-[4%] aspect-square h-[50px] md:h-[70px] md:w-[70px]">
          <Image src="/icons/sparkle.svg" alt="sparkle" fill />
        </div>

        <div className="aspect-[1.9] w-[80%] overflow-hidden rounded-[5px] bg-white-light1 shadow-lg">
          <video
            className="h-full w-full object-fill"
            src="https://craya-public-prod.s3.ap-south-1.amazonaws.com/Drag+reorder_1.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Abstract background video of dark, flowing lines."
          />
        </div>
      </div>

      {/* Rotating banner stays at bottom */}
      <RotatingBanner />
    </div>
  );
};

export default AIFeature;
