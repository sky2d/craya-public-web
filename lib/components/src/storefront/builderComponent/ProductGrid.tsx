import { useEffect, useState } from "react";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { StorefrontComponentData, StorefrontHandlerFunction, WishlistItems } from "../../interfaces";
import { PRODUCT_GRID_PREVIEW_DATA } from "../data";
import { ProductCard } from "../main/ProductGrid";

type ProductGridProps = {
  data?: StorefrontComponentData;
  handlerFunction?: StorefrontHandlerFunction;
  wishlistItems?: WishlistItems[];
};

export const BuilderProductGrid: React.FC<ProductGridProps> = ({ data }) => {
  data = data?.products?.length ? data : PRODUCT_GRID_PREVIEW_DATA;
  const product = data?.products;

  const [showMoreCard, setShowMoreCard] = useState<boolean>(false);

  useEffect(() => {
    if (product.length > 3) {
      setShowMoreCard(true);
    }
  }, [product]);

  return (
    <div className="flex items-start justify-center">
      <div
        className={`grid h-full w-full auto-rows-auto ${product.length > 2 ? "grid-cols-[repeat(auto-fit,minmax(120px,1fr))]" : "grid-cols-[repeat(auto-fit,minmax(120px,150px))]"} place-content-center gap-2 p-2`}
      >
        {product.slice(0, 3).map((product, index) => {
          const backgroundColor = data?.store?.primaryColor;

          return <ProductCard key={product.id || index} product={product} backgroundColor={backgroundColor} />;
        })}

        {showMoreCard && (
          <div
            className="relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[10px]"
            style={{
              aspectRatio: "1/1.6",
              backgroundColor: "#B2B7F1",
            }}
          >
            <span className="animate-bounce">
              <FaRegArrowAltCircleDown className="text-6xl text-white-light4" />
            </span>
            <span className="text-xl text-white-light4">Show More</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const BuilderFeedVideoCard: React.FC<ProductGridProps> = ({ data }) => {
  const products = data?.products?.length ? data : PRODUCT_GRID_PREVIEW_DATA;

  return (
    <div
      className={` ${products.products.length <= 1 ? "grid w-[10vw] grid-cols-1" : "grid w-full max-w-[400px] grid-cols-[repeat(auto-fill,_minmax(6vw,_1fr))] place-items-center gap-2 p-1"}`}
    >
      {products.products.map((product, index) => {
        const backgroundColor = data?.store?.primaryColor;

        return (
          <div key={product.id || index} className="z-10 h-full w-full">
            <ProductCard product={product} backgroundColor={backgroundColor} />
          </div>
        );
      })}
    </div>
  );
};
