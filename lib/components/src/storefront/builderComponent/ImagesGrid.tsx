import Image from "next/image";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { IMAGES_GRID_PREVIEW_DATA } from "../data";

export const BuilderImagesGrid: React.FC<StorefrontComponentProps> = ({ data, handlerFunction }) => {
  data = data ? data : IMAGES_GRID_PREVIEW_DATA;

  return (
    <div className="flex w-full items-center justify-center overflow-x-auto px-2">
      <div className="grid aspect-square h-full min-w-72 grid-cols-2 place-content-center gap-2">
        {data.images.map((image, index) => (
          <div
            key={index}
            className={`relative flex h-32 w-full min-w-28 flex-col items-start justify-end rounded-lg p-1 shadow-xl hover:shadow-2xl ${
              data.images.length === 3 && index === 0 ? "col-span-2" : "aspect-square"
            }`}
            onClick={() =>
              handlerFunction &&
              handlerFunction(
                StorefrontActions.PRODUCT_PRESS,
                createStorefrontData({ products: [data.products[index]] }),
                StorefrontComponentType.IMAGES_GRID,
              )
            }
          >
            <Image src={image.fileUrl} alt={data.texts[index]} draggable={false} fill className="rounded-lg object-cover" />
            <div className="relative z-10 text-white-light4 mix-blend-difference">{data.texts[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
