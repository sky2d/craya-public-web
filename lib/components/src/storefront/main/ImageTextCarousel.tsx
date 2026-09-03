import Image from "next/image";
import { useState } from "react";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import ImageSkeletonLoader from "../../major/ImageSkeletonLoader";
import { createStorefrontData } from "../../services/storefront";
import { IMAGE_TEXT_CAROUSEL_PREVIEW_DATA } from "../data";

export const ImageTextCarousel: React.FC<StorefrontComponentProps> = ({ data, handlerFunction, products }) => {
  data = data || IMAGE_TEXT_CAROUSEL_PREVIEW_DATA;
  const [loader, setLoader] = useState(true);

  useScrollFadeIn({
    selector: ".image-text-carousel",
    scale: 1,
    stagger: 0.07,
    duration: 0.6,
    delay: 0,
  });

  return (
    <div className="mx-auto flex w-full items-center justify-start gap-2 overflow-x-auto whitespace-nowrap py-2 sm:justify-center">
      <div
        className="grid-cols-* mx-auto grid h-full auto-cols-[minmax(150px,215px)] grid-flow-col place-content-start gap-4 overflow-x-auto overflow-y-hidden p-2 md:gap-6 lg:auto-cols-[minmax(214px,270px)]"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxWidth: "100%",
        }}
      >
        {data.images.map((image, index) => (
          <div key={index} className="image-text-carousel flex flex-col items-center justify-start">
            <div className="relative w-full" style={{ aspectRatio: "1/1.26" }}>
              {loader && <ImageSkeletonLoader aspectRatio="1/1.26" />}
              {/* {loader} */}
              <Image
                src={image.fileUrl}
                alt={data.texts[index] || "Image"}
                fill
                onLoad={() => setLoader(false)}
                draggable={false}
                sizes="(max-width: 640px) 150px, (max-width: 1024px) 270px, 100vw"
                className="h-full w-full cursor-pointer rounded-[8px] object-cover transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:shadow-md sm:rounded-[25px] xl:rounded-[40px]"
                onClick={() => {
                  if (handlerFunction) {
                    const filteredProducts = products?.filter(product => product.id && data?.productsPerImage[index]?.includes(product.id));
                    handlerFunction(
                      StorefrontActions.PRODUCTS_PRESS,
                      createStorefrontData({ products: filteredProducts }),
                      StorefrontComponentType.IMAGE_TEXT_CAROUSEL,
                    );
                  }
                }}
              />
            </div>
            <div className="mt-2 w-full text-center">
              <p className="truncate text-xs font-light md:text-lg" title={data.texts[index]}>
                {data.texts[index]}
              </p>
              <p className="mt-1 truncate text-sm font-bold md:text-lg" title={data.extraTexts[index]}>
                {data.extraTexts[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
