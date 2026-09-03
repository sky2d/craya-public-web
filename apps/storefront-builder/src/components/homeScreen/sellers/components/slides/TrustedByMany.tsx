import Marquee from "react-fast-marquee";
import { BrandInfo } from "../BrandInfo";

export const brands = [
  {
    name: "Nykaa Fashion",
    image: "https://i.pinimg.com/736x/3b/83/b5/3b83b5704f64e82b4b6531d05c4994d5.jpg",
    link: "https://www.nykaafashion.com",
  },
  {
    name: "Myntra",
    image: "https://d.ibtimes.com/en/full/2561437/katherine-langford.webp?w=395&f=c4205d1ad95554d089efc75d1381c036",
    link: "https://www.myntra.com",
  },
  {
    name: "Ajio",
    image: "https://media.assettype.com/outlookbusiness/2025-08-08/ke568kdl/gdfrfc.jpg",
    link: "https://www.ajio.com",
  },
];

export const TrustedByMany = () => {
  return (
    <>
      <p className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Trusted by Many</p>
      <div className="w-full py-6">
        <Marquee autoFill pauseOnHover>
          {brands.map((brand, index) => (
            <div key={index} className="ml-6 w-full">
              <BrandInfo {...brand} />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="w-full py-6">
        <Marquee autoFill pauseOnHover direction="right">
          {brands.map((brand, index) => (
            <div key={index} className="ml-6 w-full">
              <BrandInfo {...brand} />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};
