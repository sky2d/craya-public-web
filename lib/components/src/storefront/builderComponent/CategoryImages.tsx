import { memo } from "react";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { CATEGORY_IMAGES_PREVIEW_DATA } from "../data";

const BuilderCategoryImagesComponent: React.FC<StorefrontComponentProps> = ({ data = CATEGORY_IMAGES_PREVIEW_DATA, handlerFunction }) => {
  const images = data.images;
  const texts = data.texts;

  return (
    <div className="flex w-full items-center justify-center overflow-x-auto py-2">
      <div
        className="grid-cols-* grid h-full auto-cols-[minmax(60px,120px)] grid-flow-col place-content-start justify-start gap-1 overflow-x-auto p-2 md:gap-2 lg:auto-cols-[minmax(110px,140px)] lg:gap-6"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxWidth: "100%",
        }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="flex h-full flex-col items-center"
            onClick={() => {
              handlerFunction &&
                handlerFunction(
                  StorefrontActions.PRODUCT_PRESS,
                  createStorefrontData({ products: [data.products[index]] }),
                  StorefrontComponentType.CATEGORY_IMAGES,
                );
            }}
          >
            <div className="relative w-full">
              <img
                src={item.fileUrl}
                alt={texts[index]}
                className="aspect-square h-full w-full cursor-pointer rounded-lg object-cover transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md"
              />
            </div>
            <p className="p-2 text-center body-xs sm:body-normal">{texts[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BuilderCategoryImages = memo(BuilderCategoryImagesComponent);
