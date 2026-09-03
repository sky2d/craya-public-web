import Image from "next/image";
import Seller from "../assets/BecomeASeller.svg";
import flower from "../assets/flower.svg";

export const ShowStoreFronts = () => {
  return (
    <div className="relative flex h-screen w-full snap-start flex-col items-center justify-start bg-[linear-gradient(0deg,#FFFFFF_2%,#F9F7FE_4%,#7C54E9_22%,#7C54E9_50%)]">
      <p className="text-center text-[7vw] font-black text-white-light4 [text-shadow:_-4px_1px_0px_#f9ce31] sm:heading-1 md:mt-8">
        Wonder How The <br /> Store Front Looks
      </p>
      <div className="relative flex w-full flex-col items-center justify-center">
        {/* Flower Image (Fixed Position) */}
        <div className="absolute left-[20%] top-[20px] -translate-x-1/2 transform sm:left-[22%] sm:top-[30px] md:top-[40px] md:block lg:left-[18%]">
          <Image src={flower} alt="flower" className="aspect-square w-[10vw]" />
        </div>
        {/* <div className="absolute left-[20%] top-[20px] -translate-x-1/2 transform sm:left-[22%] sm:top-[30px] md:top-[40px] lg:left-[25%]">
          <Image src={flower} alt="flower" className="h-12 w-12 sm:h-16 sm:w-16 md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]" />
        </div> */}

        <div className="relative z-10 flex h-auto w-full flex-col items-center justify-center">
          {/* Laptop Image */}
          {/* <Image src={Laptop} alt="store-front" width={1000} height={900} className="h-auto w-[300px] sm:w-[450px] md:w-[600px] lg:w-[900px]" /> */}
          {/* <div className="hidden w-full items-center justify-center md:flex">
            <Image src={Laptop} alt="Laptop" className="w-full md:w-[50%]" />
          </div>
          <div className="flex w-full items-center justify-center md:hidden">
            <Image src={Mobile} alt="Laptop" className="w-full md:w-[60%]" />
          </div> */}
          {/* <div className="flex max-h-[70vh] w-full items-center justify-center">
            <Storefronts />
          </div> */}
          <div className="my-4 flex w-full cursor-pointer items-center justify-center">
            <Image src={Seller} alt="Seller" className="w-40 md:w-auto" />
          </div>
          {/* 
          <div className="absolute left-1/2 top-1/4 h-auto w-[150px] -translate-x-1/2 transform sm:w-[250px] md:w-[400px] lg:w-[600px]">
            <Image src={ArrowLine} alt="arrow-line" width={900} height={900} />
          </div> */}
        </div>
      </div>
    </div>
  );
};
