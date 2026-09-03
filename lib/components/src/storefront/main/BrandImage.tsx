import Image from "next/image";
import { memo, useState } from "react";
import { ImageSizeType, SimpleProduct, StorefrontActions, StorefrontComponentProps, StorefrontComponentType } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { BRAND_IMAGE_PREVIEW_DATA } from "../data";

const ImageButtonBaseMemo: React.FC<{
  data: StorefrontComponentProps["data"];
  handlerFunction?: StorefrontComponentProps["handlerFunction"];
  maxHeight: string;
  minHeight: string;
  aspectRatio?: string;
  borderRadius: string;
  products?: SimpleProduct[];
}> = memo(
  ({ data, handlerFunction, maxHeight, minHeight, products, aspectRatio, borderRadius }) => {
    const image = data?.images?.length ? data.images[0] : null;
    const [loader, setLoader] = useState(true);

    if (!image) return <div>No Image</div>;
    const handleClick = () => {
      if (handlerFunction) {
        const filteredProducts = products?.filter(product => product.id && data?.productsPerImage[0]?.includes(product.id));
        handlerFunction(StorefrontActions.PRODUCTS_PRESS, createStorefrontData({ products: filteredProducts }), StorefrontComponentType.BRAND_IMAGE);
      }
    };

    return (
      <Image
        className={`h-full w-full cursor-pointer shadow-md hover:shadow-md ${loader ? "hidden" : ""}`}
        src={image.fileUrl}
        alt="Brand Image"
        draggable={false}
        onLoad={() => setLoader(false)}
        priority
        style={{ maxHeight, minHeight, aspectRatio, borderRadius }}
        width={500}
        height={500}
        onClick={handleClick}
      />
    );
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data && prevProps.products === nextProps.products,
);

const BrandImageComponent: React.FC<StorefrontComponentProps> = ({ data, handlerFunction, products }) => {
  const fallbackData = BRAND_IMAGE_PREVIEW_DATA;
  data = data ?? fallbackData;

  const imageSize = data.imageSize ?? ImageSizeType.SMALL;

  const imageProps = {
    data,
    handlerFunction,
    products,
  };

  return (
    <div>
      {imageSize === ImageSizeType.SMALL && (
        <ImageButtonBaseMemo {...imageProps} maxHeight="350px" minHeight="109px" aspectRatio="1/0.3" borderRadius="20px" />
      )}
      {imageSize === ImageSizeType.MEDIUM && (
        <ImageButtonBaseMemo {...imageProps} maxHeight="500px" aspectRatio="1/0.4" minHeight="150px" borderRadius="20px" />
      )}
      {imageSize === ImageSizeType.LARGE && (
        <ImageButtonBaseMemo {...imageProps} maxHeight="700px" minHeight="215px" aspectRatio="1/0.60" borderRadius="20px" />
      )}
      {imageSize !== ImageSizeType.SMALL && imageSize !== ImageSizeType.MEDIUM && imageSize !== ImageSizeType.LARGE && <div>No Image</div>}
    </div>
  );
};

export const BrandImage = memo(BrandImageComponent);
