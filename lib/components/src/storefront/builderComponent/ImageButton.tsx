import Image from "next/image";
import { memo } from "react";
import { ImageSizeType, SimpleProduct, StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { BRAND_IMAGE_PREVIEW_DATA } from "../data";

const ImageButtonBase: React.FC<{
  data: StorefrontComponentProps["data"];
  handlerFunction?: StorefrontComponentProps["handlerFunction"];
  maxHeight: string;
  products?: SimpleProduct[];
  borderRadius: string;
  text: string;
  color: string;
  minHeight?: string;
  aspectRatio?: string;
}> = memo(({ data, handlerFunction, products, maxHeight, borderRadius, minHeight, aspectRatio, text, color }) => {
  const image = data?.images?.length ? data.images[0] : null;

  if (!image) return <div>No Image</div>;

  const handleClick = () => {
    if (handlerFunction) {
      const filteredProducts = products?.filter(product => product.id && data?.productsPerImage[0]?.includes(product.id));
      handlerFunction(StorefrontActions.PRODUCTS_PRESS, createStorefrontData({ products: filteredProducts }), StorefrontComponentType.IMAGE_BUTTON);
    }
  };

  return (
    <div
      className="relative w-full cursor-pointer hover:shadow-md"
      style={{ maxHeight, minHeight, aspectRatio, borderRadius, overflow: "hidden" }}
      onClick={handleClick}
    >
      <Image src={image.fileUrl} alt="Brand Image" draggable={false} width={500} height={500} className="h-full w-full object-cover" />
      <button
        className="group absolute bottom-4 left-1/2 -translate-x-1/2 overflow-hidden rounded-md border-2 px-6 py-1 font-semibold transition-colors duration-300 sm:py-2"
        style={{
          borderColor: color || "transparent",
          color: color || "inherit",
          backgroundColor: "#ffffff",
        }}
        onClick={e => {
          e.stopPropagation();
          handleClick();
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = color || "";
          e.currentTarget.style.color = "#FAFAFC";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.color = color || "inherit";
        }}
      >
        <span
          className="absolute inset-0 z-0 origin-left scale-x-0 transform bg-current transition-transform duration-300 ease-in-out group-hover:scale-x-100"
          style={{ backgroundColor: color }}
        />

        <span className="group-hover:text-white relative z-10 transition-colors duration-300">{text}</span>
      </button>
    </div>
  );
});

export const BuilderImageButton: React.FC<StorefrontComponentProps> = ({ data = BRAND_IMAGE_PREVIEW_DATA, handlerFunction, products }) => {
  const imageSize = data.imageSize ?? ImageSizeType.SMALL;
  const text = data.texts[0];
  const color = data.store?.primaryColor ?? "#CCCCCC";

  const imageProps = {
    data,
    handlerFunction,
    products,
  };

  return (
    <div>
      {imageSize === ImageSizeType.SMALL && (
        <>
          <ImageButtonBase
            {...imageProps}
            maxHeight="350px"
            color={color}
            text={text}
            minHeight="109px"
            aspectRatio="1/0.3"
            borderRadius="10px 10px 0 0"
          />
        </>
      )}
      {imageSize === ImageSizeType.MEDIUM && (
        <>
          <ImageButtonBase {...imageProps} color={color} text={text} maxHeight="500px" aspectRatio="1/0.4" borderRadius="20px 20px 0 0" />
        </>
      )}
      {imageSize === ImageSizeType.LARGE && (
        <>
          <ImageButtonBase
            {...imageProps}
            color={color}
            text={text}
            maxHeight="700px"
            minHeight="215px"
            aspectRatio="1/0.6"
            borderRadius="30px 30px 0 0"
          />
        </>
      )}
      {imageSize !== ImageSizeType.SMALL && imageSize !== ImageSizeType.MEDIUM && imageSize !== ImageSizeType.LARGE && <div>No Image</div>}
    </div>
  );
};
