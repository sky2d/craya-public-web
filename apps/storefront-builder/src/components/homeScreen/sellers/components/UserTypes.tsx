import Image from "next/image";
import dollar from "../assets/Dollar.png";
import Car from "../assets/FlyingCarSmallScreen.png";
import Mobile from "../assets/SmallSize.png";
import { UserTypeCards } from "./UserTypeCards";

export const UserTypes = () => {
  return (
    <>
      <div className="relative mt-8 flex snap-start flex-col items-center">
        <div className="my-4 w-full flex-col items-center justify-center">
          <h1 className="text-center text-[5vw] font-black text-brand-color1 lg:text-[3vw]">All Exits Covered</h1>
          <div className="flex h-full w-full items-center justify-center md:min-h-screen">
            <UserTypeCards />
          </div>
          <div className="mt-[-25vw] flex w-full items-center justify-center md:hidden">
            <Image src={Car} alt="mobile" className="w-full" />
          </div>
          <div className="mt-[-50vw] flex flex-col items-start justify-center p-2 md:mt-0 md:items-center">
            <div className="flex w-3/4 flex-col items-start justify-center p-2">
              <div className="w-full lg:w-1/2">
                <p className="text-start text-[6vw] font-black text-brand-color1 sm:text-[3vw]">
                  Order Delivery so <br /> easy feels like <br />
                  <span className="text-brand-color2"> The Weasly’s CAR</span>
                </p>
                <p className="w-full text-[3vw] sm:text-[1.5vw]">
                  The only thing you do to manager orders on craya is stick a label on the package. That’s it! You hand it over to us and we take care
                  of everything else.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-10 mt-28 flex w-full items-center justify-between p-1 sm:w-3/4">
          <div className="relative flex aspect-[9/16] h-auto w-[30%] justify-center">
            <Image
              src={Mobile}
              alt="Background SVG"
              fill
              className="h-full w-full"
              style={{
                objectFit: "contain",
                zIndex: 1,
                pointerEvents: "none",
              }}
              priority
            />

            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: "2%",
                height: "96%",
                width: "78%",
                objectFit: "cover",
                borderRadius: "12px",
                zIndex: 0,
              }}
            >
              <source src="https://craya-public-prod.s3.ap-south-1.amazonaws.com/explore+feed+and+carousel.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex w-full flex-col items-end justify-center sm:max-w-[40vw]">
            <p className="text-end text-[6vw] font-black text-brand-color1 sm:text-[3vw]">
              Make people fall
              <br /> in love with your
              <br /> <span className="text-brand-color2"> Products</span>
            </p>
            <p className="text-end text-[3vw] sm:text-[1.5vw]">
              Turn browsers interactive product showcases. Shoppable videos and dynamic feeds make your products impossible to resist. When shopping
              feels like entertainment, sales happen naturally.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-end pl-2">
          <div className="flex w-full items-center justify-between sm:w-[87%]">
            <div className="flex w-full flex-col items-start justify-center">
              <p className="text-start text-[6vw] font-black text-brand-color1 sm:text-[3vw]">
                Payment made <br /> <span className="text-brand-color2">SIMPLE</span>
              </p>
              <p className="text-start text-[3vw] sm:text-[1.5vw]">
                Just add your bank details and get verified, from there money flows as smoothly as your products. Direct bank transfers, instant
                settlements, and no financial jargon. Just pure, simple payments
              </p>
            </div>
            <div className="flex w-full items-center justify-center">
              <Image src={dollar} alt=" Payment made" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
