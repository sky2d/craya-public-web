import Image from "next/image";
import OneArrow from "../../assets/first.png";
import BuildStore from "../../assets/slides/BuildYourStore.png";
const BuildYourStore = () => (
  <div className="flex h-full w-full flex-col items-center justify-center p-3">
    <div className="relative flex h-[20vh] w-full items-start justify-start">
      <Image src={OneArrow} alt="Future Scope" className="object-contain" fill />
    </div>
    <div className="flex h-full w-full flex-col items-center justify-center sm:flex-row">
      <div className="flex h-full w-full flex-col items-start justify-start sm:w-3/4 sm:justify-center">
        <p className="text-start text-6xl font-bold text-white-light4 sm:my-8 sm:text-[5vw]">Build your store</p>
        <p className="text-start text-xl font-normal text-white-light4 sm:my-8 sm:text-[2vw]">
          Drag, drop and design your storefront without coding. Best part? It goes live instantly.
        </p>
      </div>
      <div className="relative flex h-full w-full items-start justify-center">
        <Image src={BuildStore} alt="Future Scope" className="object-contain" fill />
      </div>
    </div>
  </div>
);

export default BuildYourStore;
