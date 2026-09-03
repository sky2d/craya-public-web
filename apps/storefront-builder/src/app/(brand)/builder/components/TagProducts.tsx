import DisabledOverlay from "components/src/icons/iconFiles/DisabledOverlay.png";
import OverLay from "components/src/icons/iconFiles/SoldOutOverlays.png";
import { ProductStatusEnum, SimpleProduct, StorefrontComponentData } from "components/src/interfaces";
import { IconButton } from "components/src/minor";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";

interface TagProductsProps {
  products: SimpleProduct[];
  index: number;
  data: StorefrontComponentData;
  setData: (data: Partial<StorefrontComponentData>) => void;
}

export const TagProducts: React.FC<TagProductsProps> = ({ data, setData, products, index }) => {
  // Ensure productsPerImage exists and has an array at the specified index
  const ensureProductsPerImageArray = () => {
    if (!data.productsPerImage) {
      data.productsPerImage = [];
    }
    if (!Array.isArray(data.productsPerImage[index])) {
      data.productsPerImage[index] = [];
    }
    return [...data.productsPerImage];
  };

  const handleProductSelection = (ID: string) => {
    // Ensure we have a valid array to work with
    const currentProductsPerImage = ensureProductsPerImageArray();
    const currentProducts = currentProductsPerImage[index] || [];

    const isSelected = currentProducts.includes(ID);

    if (isSelected) {
      // If selected, removing from the list
      const updatedProductIDs = currentProducts.filter(id => id !== ID);
      currentProductsPerImage[index] = updatedProductIDs;
    } else {
      // If not selected, adding to the list
      const updatedProductIDs = [...currentProducts, ID];
      currentProductsPerImage[index] = updatedProductIDs;
    }

    setData({
      ...data,
      productsPerImage: currentProductsPerImage,
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4">
      {products.map((product: SimpleProduct, ind: number) => {
        const isSelected = data.productsPerImage[index]?.includes(product.id!);

        return (
          <div
            key={ind}
            className={`transform rounded-2xl border-2 border-brand-color1 transition-transform focus:ring-4 active:scale-75 ${
              isSelected ? "" : "border-opacity-10"
            }`}
            onClick={() => handleProductSelection(product.id!)} // Handles selection/deselection
          >
            <label className="text-gray-900 dark:text-gray-300 ms-2 font-bold body-xs">{isSelected && "Selected Product"}</label>

            <div className="relative m-1 flex h-[267px] w-[150px] cursor-pointer flex-col items-center justify-end overflow-hidden rounded-2xl bg-brand-color3">
              <Image
                src={product.productSKUs![0].images[0].fileUrl || "/placeholder-image.jpg"}
                alt="Product Image"
                className="absolute left-0 top-0 z-0 h-full w-full object-cover"
                fill
                priority
              />
              <div className="relative bottom-0 z-10 w-full rounded-2xl bg-white-light4 p-2 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="font-black text-brand-color1 body-xs">{product.name}</span>
                  <IconButton icon={IoMdHeartEmpty} size={18} />
                </div>
                <div className="mt-1 flex">
                  <span className="m-1 text-xs font-extrabold text-brand-color1">
                    {product.discountedPrice ? "₹" + product.discountedPrice : "₹" + product.price}
                  </span>
                  <span className="text-gray-500 m-1 text-xs font-extrabold line-through">{product.discountedPrice ? "₹" + product.price : ""}</span>
                </div>
              </div>
              {product.isOutOfStock && product.status !== ProductStatusEnum.DISABLED && (
                <div className="absolute z-10 flex h-full w-full items-center justify-center">
                  <Image src={OverLay} alt="Product is Sold Out" className="h-full w-full object-cover" fill priority />
                </div>
              )}
              {product.status === ProductStatusEnum.DISABLED && (
                <div className="absolute z-10 flex h-full w-full items-center justify-center">
                  <Image src={DisabledOverlay} alt="Product is Sold Out" className="h-full w-full object-cover" fill priority />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
