import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CreateProductSku } from "../interfaces";
import ImageSkeletonLoader from "./ImageSkeletonLoader";

interface CarouselProps {
  productSku: CreateProductSku | null;
}

export const ProductCarousel: React.FC<CarouselProps> = ({ productSku }) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [loader, setLoader] = useState(true);

  const allImages = productSku?.images;

  if (!allImages || allImages.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center">
        <div className="bg-gray-100 relative max-h-[45em] w-full max-w-[633px] rounded-lg">
          <div className="flex h-full min-h-[400px] w-full items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-[600px] sm:w-1/2">
      <Carousel ref={carouselRef as React.Ref<CarouselRef>} dots={allImages.length > 1} className="rounded-lg">
        {allImages.map((img, index) => (
          <div key={index} className="grid h-full place-items-center">
            <div className="relative w-[80%] sm:w-[60%]" style={{ aspectRatio: "1/1.6", height: "auto" }}>
              {loader && <ImageSkeletonLoader aspectRatio="1/1.6" />}
              <Image
                src={img.fileUrl}
                onLoad={() => setLoader(false)}
                alt={`${productSku.images[index].fileName} - Image ${index + 1} Not Found`}
                fill
                placeholder="empty"
                unoptimized
                draggable={false}
                className={`rounded-lg object-cover shadow-lg ${loader ? "hidden" : ""}`}
                sizes="(max-width: 633px) 100vw, 633px"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                style={{ aspectRatio: "1/1.6" }}
              />
            </div>
          </div>
        ))}
      </Carousel>

      {allImages.length > 1 && (
        <div className="scrollbar-hide mt-4 flex w-full justify-start overflow-x-auto">
          <div className="mx-auto grid w-auto auto-cols-max grid-flow-col gap-2">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => carouselRef.current?.goTo(index)}
                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 border-transparent hover:border-blue-500 focus:border-blue-500"
              >
                <Image src={img.fileUrl} alt={`Thumbnail ${index + 1}`} draggable={false} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
