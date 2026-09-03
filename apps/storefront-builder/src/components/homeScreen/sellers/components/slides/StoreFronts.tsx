import Image from "next/image";
import { BuiltInButton } from "../BuiltInButton";

const StoreFronts = () => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-black-dark1">
      <div className="flex items-center justify-center pt-4">
        <BuiltInButton text="Craya Built It" icon={<Image src="/icons/crayaLogo.svg" alt="crayaLogo" width={20} height={20} />} />
      </div>
      <div className="flex w-full flex-col gap-2 py-3 sm:w-3/4 md:gap-5 md:py-12 lg:gap-10 xl:py-20">
        <div className="flex gap-2 md:gap-5 lg:gap-10">
          <div className="aspect-[1.778] w-1/2 bg-black-dark3"></div>
          <div className="aspect-[1.778] w-1/2 bg-black-dark3"></div>
        </div>
        <div className="flex gap-2 md:gap-5 lg:gap-10">
          <div className="aspect-[0.586] w-1/3 bg-black-dark3"></div>
          <div className="aspect-[0.586] w-1/3 bg-black-dark3"></div>
          <div className="aspect-[0.586] w-1/3 bg-black-dark3"></div>
        </div>
        <div className="flex gap-2 md:gap-5 lg:gap-10">
          <div className="aspect-[1.778] w-1/2 bg-black-dark3"></div>
          <div className="aspect-[1.778] w-1/2 bg-black-dark3"></div>
        </div>
      </div>
    </div>
  );
};

export default StoreFronts;
