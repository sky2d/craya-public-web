import Image from "next/image";
import { memo, useState } from "react";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import ImageSkeletonLoader from "../../major/ImageSkeletonLoader";
import { createStorefrontData } from "../../services/storefront";
import { CATEGORY_IMAGES_PREVIEW_DATA } from "../data";

const CategoryImagesComponent: React.FC<StorefrontComponentProps> = ({ data = CATEGORY_IMAGES_PREVIEW_DATA, handlerFunction, products }) => {
  const images = data.images;
  const texts = data.texts;
  const [loader, setLoader] = useState(true);

  useScrollFadeIn({
    selector: ".categoryImages",
    scale: 1,
    stagger: 0.05,
    duration: 0.5,
    delay: 0,
  });

  return (
    <div className="scrollbar-hide flex h-full w-full gap-4 overflow-x-auto overflow-y-hidden p-2 md:gap-6 lg:gap-8">
      <div className="grid-cols-* mx-auto grid w-max auto-cols-[minmax(90px,120px)] grid-flow-col place-content-center gap-4 p-2 md:gap-6 lg:auto-cols-[minmax(110px,140px)] lg:gap-8">
        {images.map((item, index) => (
          <div
            key={index}
            className="categoryImages flex flex-col items-center"
            onClick={() => {
              if (handlerFunction) {
                const filteredProducts = products?.filter(product => product.id && data?.productsPerImage[index]?.includes(product.id));
                handlerFunction(
                  StorefrontActions.PRODUCTS_PRESS,
                  createStorefrontData({ products: filteredProducts }),
                  StorefrontComponentType.CATEGORY_IMAGES,
                );
              }
            }}
          >
            <div className="relative aspect-square w-full">
              {loader && <ImageSkeletonLoader aspectRatio="1/1" />}
              <Image
                src={item.fileUrl}
                onLoad={() => setLoader(false)}
                draggable={false}
                alt={texts[index]}
                fill
                className="cursor-pointer rounded-lg object-cover transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 hover:shadow-md"
                sizes="(max-width: 768px) 100px, 140px"
              />
            </div>
            <p className="p-2 text-center body-xs sm:body-normal">{texts[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategoryImages = memo(CategoryImagesComponent);
