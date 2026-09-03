import Image from "next/image";
import { memo } from "react";
import { StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { BRAND_INFO_PREVIEW_DATA } from "../data";

const BrandInfoComponent: React.FC<StorefrontComponentProps> = ({ data, handlerFunction }) => {
  const brandData = data || BRAND_INFO_PREVIEW_DATA;
  const store = brandData.store;

  if (!store) return <div>No Data</div>;

  return (
    <div
      className="flex items-center justify-between p-2 hover:cursor-pointer"
      style={{ backgroundColor: store.primaryColor }}
      onClick={() =>
        handlerFunction && handlerFunction(StorefrontActions.BRAND_INFO_PRESS, createStorefrontData({}), StorefrontComponentType.BRAND_INFO)
      }
    >
      <div className="bg-gray-100 flex aspect-square w-[25%] min-w-28 items-center justify-center rounded-full p-4 md:p-10">
        {store.logo && (
          <div className="relative aspect-square h-full rounded-full bg-white-light4 shadow-xl">
            <Image
              className="aspect-square rounded-full object-contain"
              src={store.logo.fileUrl}
              draggable={false}
              alt="Brand Logo"
              fill
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
            />
          </div>
        )}
      </div>
      <div className="Brand_details m-2 w-4/5">
        <div className="Brand_name line-clamp-1 font-bold text-white-light4 sm:text-6xl">{store.name}</div>
        <span className="description line-clamp-4 font-medium text-white-light4 sm:text-2xl">{store.description}</span>
      </div>
    </div>
  );
};
export const BrandInfo = memo(BrandInfoComponent);
