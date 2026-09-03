import openDesktop from "components/src/icons/iconFiles/openDesktop.svg";
import Think from "components/src/icons/iconFiles/Think.svg";
import Image from "next/image";

export default function MobileBlock() {
  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden bg-brand-color3 px-6 py-8 text-center">
      {/* Top Icon with fill */}
      <div className="relative aspect-square w-[50%] sm:w-[20%]">
        <Image src={openDesktop} alt="Desktop Only Icon" fill className="object-contain" priority />
      </div>

      {/* Text */}
      <div>
        <h1 className="mb-2 font-bold text-white-light4 heading-2">Open on Desktop</h1>
        <p className="text-white-light4 paragraph">This site is not compatible on Mobile Devices</p>
      </div>

      {/* Bottom Illustration with fill */}
      <div className="relative aspect-square w-full sm:w-[20%]">
        <Image src={Think} alt="Not Supported on Mobile" fill className="object-contain" priority />
      </div>
    </div>
  );
}
