import Image from "next/image";
import { memo } from "react";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { IMAGES_GRID_PREVIEW_DATA } from "../data";

const ImagesGridComponent: React.FC<StorefrontComponentProps> = ({ data = IMAGES_GRID_PREVIEW_DATA, handlerFunction, products }) => {
  const handleClick = (index: number) => {
    if (handlerFunction) {
      const filteredProducts = products?.filter(product => product.id && data.productsPerImage[index]?.includes(product.id));
      handlerFunction(StorefrontActions.PRODUCTS_PRESS, createStorefrontData({ products: filteredProducts }), StorefrontComponentType.IMAGES_GRID);
    }
  };

  const gridClass = data.images.length === 2 ? "" : "aspect-square";
  const colSpanClass = (index: number) => (data.images.length === 3 && index === 0 ? "col-span-2" : "");

  return (
    <div className="flex h-full items-center justify-center overflow-x-auto p-2">
      <div className={`grid ${gridClass} grid-cols-2 place-items-start gap-3 lg:w-[30%] xl:w-[25%]`}>
        {data.images.map((image, index) => (
          <div
            key={index}
            className={`relative flex aspect-square h-full max-h-[350px] min-h-[156px] w-full min-w-[148px] flex-col justify-end rounded-lg hover:cursor-pointer ${colSpanClass(index)}`}
            onClick={() => handleClick(index)}
          >
            <Image
              src={image.fileUrl}
              alt={data.texts[index]}
              draggable={false}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="rounded-lg object-cover transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:shadow-md"
            />

            <div className="relative z-10 w-1/2 px-2 text-3xl font-semibold text-white-light4">{data.texts[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImagesGrid = memo(ImagesGridComponent);
