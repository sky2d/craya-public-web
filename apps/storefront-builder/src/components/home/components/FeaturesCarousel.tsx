import feature1 from "@/components/home/assets/Feature1.png";
import feature2 from "@/components/home/assets/Feature2.png";
import feature3 from "@/components/home/assets/Feature3.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import Image from "next/image";
import { useRef, useState } from "react";

export const FeaturesCarousel = () => {
  const featureList = [
    {
      featureImage: feature1,
      heading: "More pre-built components",
      description: "Add more spice to your flavorful storefront with these new components.",
    },
    {
      featureImage: feature2,
      heading: "Bulk product addition",
      description: "Add multiple products to your catalog at once.",
    },
    {
      featureImage: feature3,
      heading: "Your store your domain",
      description: "Deploy your storefront to your own custom domain.",
    },
  ];

  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex w-4/5 flex-col items-center rounded-2xl shadow-xl">
        <div className="w-full rounded-t-2xl bg-brand-color1 py-4 pl-3 text-white-light4 heading-4">
          <p>{featureList[currentSlide].heading}</p>
        </div>
        <div className="bg-white relative w-3/4 rounded-2xl">
          {/* Left Arrow */}
          <button
            className="absolute left-[-60px] top-1/2 z-10 flex h-10 w-10 -translate-y-10 transform items-center justify-center rounded-full bg-brand-color3 text-white-light4 shadow-md hover:bg-zinc-400"
            onClick={() => carouselRef.current?.prev()}
          >
            <LeftOutlined />
          </button>
          <Carousel afterChange={current => setCurrentSlide(current)} ref={carouselRef} autoplay className="py-4">
            {featureList.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image src={feature.featureImage} alt={`Feature ${index + 1}`} className="rounded-lg" />
                <p className="text-gray-700 mt-4 text-center body-normal">{feature.description}</p>
              </div>
            ))}
          </Carousel>

          {/* Right Arrow */}
          <button
            className="absolute right-[-60px] top-1/2 z-10 flex h-10 w-10 -translate-y-10 transform items-center justify-center rounded-full bg-brand-color3 text-white-light4 shadow-md hover:bg-zinc-400"
            onClick={() => carouselRef.current?.next()}
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
