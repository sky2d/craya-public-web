import { Product, Store } from "components/src/interfaces";
import dynamic from "next/dynamic";

interface ProductDetailsProps {
  product: Product;
  store?: Store;
}

const ShowMoreText = dynamic(() => import("@/components/product/ShowMoreText").then(mod => mod.ShowMoreText), { ssr: false });

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, store }) => {
  return (
    <div className="text-gray-500 flex flex-col text-sm">
      <p className="text-3xl font-semibold">{product.name}</p>
      <ShowMoreText
        more="Show more"
        brandColor={store?.primaryColor}
        less="Show less"
        className="cursor-pointer px-2 text-sm font-normal lg:text-xl"
        anchorClass="text-blue-500"
        truncatedEndingComponent={"... "}
      >
        {product.shortDescription || ""}
      </ShowMoreText>
      {product.discountedPrice ? (
        <div className="flex flex-col py-1">
          <p className="mr-2 text-5xl font-medium">₹{product.discountedPrice}</p>
          <p className="flex">
            <span className="mr-2 line-through">₹{product.price}</span>
            <span className="ml-2">Save ₹{product.price - product.discountedPrice}</span>
          </p>
        </div>
      ) : (
        <span className="text-gray-900 py-1 text-5xl font-bold">₹ {product.price}</span>
      )}
    </div>
  );
};

export default ProductDetails;
