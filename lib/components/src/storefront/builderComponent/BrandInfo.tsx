import Image from "next/image";
import { StorefrontComponentProps } from "../../interfaces";
import { BRAND_INFO_PREVIEW_DATA } from "../data";

export const BuilderBrandInfo: React.FC<StorefrontComponentProps> = ({ data }) => {
  const brandData = data ? data : BRAND_INFO_PREVIEW_DATA;
  const store = brandData.store;

  if (!store) return <div>No Data</div>;

  return (
    <div className="flex items-center justify-between p-2" style={{ backgroundColor: store.primaryColor }}>
      <div className="flex aspect-square max-h-[13em] w-full max-w-[30%] items-center justify-center">
        {store.logo && (
          <div className="relative h-full w-full overflow-hidden rounded-full bg-white-light4">
            <Image className="h-full w-full object-contain" draggable={false} src={store.logo.fileUrl} alt="Brand Logo" fill />
          </div>
        )}
      </div>
      <div className="Brand_details m-2 w-full">
        <div className="Brand_name line-clamp-1 text-white-light4 heading-4">{store.name}</div>
        <span className="description l line-clamp-4 text-white-light4 body-normal">{store.description}</span>
      </div>
    </div>
  );
};
