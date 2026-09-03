import Image from "next/image";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { IMAGE_TEXT_CAROUSEL_PREVIEW_DATA } from "../data";

export const BuilderImageTextCarousel: React.FC<StorefrontComponentProps> = ({ data, handlerFunction }) => {
  data = data ? data : IMAGE_TEXT_CAROUSEL_PREVIEW_DATA;

  return (
    <div className="scrollbar-none flex w-full justify-center overflow-x-auto px-2">
      <div className="grid-cols-* grid h-full auto-cols-[minmax(116px,200px)] grid-flow-col place-content-start gap-1 overflow-x-auto">
        {data.images.map((image, index) => (
          <div key={index} className="flex h-full flex-1 flex-col">
            <div className="relative h-full w-full overflow-hidden" style={{ aspectRatio: "1 / 1.26", maxHeight: "18em", maxWidth: "15em" }}>
              <Image
                draggable={false}
                src={image.fileUrl}
                alt={data.texts[index] || "Image"}
                fill
                className="cursor-pointer rounded-[8px] object-cover hover:shadow-md"
                onClick={() =>
                  handlerFunction &&
                  handlerFunction(
                    StorefrontActions.PRODUCT_PRESS,
                    createStorefrontData({ products: [data.products[index]] }),
                    StorefrontComponentType.IMAGE_TEXT_CAROUSEL,
                  )
                }
              />
            </div>
            <div className="flex-grow-0">
              <p className="mt-2 w-full truncate text-center text-xs font-light" title={data.texts[index]}>
                {data.texts[index]}
              </p>
              <p className="mt-1 w-full truncate text-center text-sm font-bold" title={data.extraTexts[index]}>
                {data.extraTexts[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
