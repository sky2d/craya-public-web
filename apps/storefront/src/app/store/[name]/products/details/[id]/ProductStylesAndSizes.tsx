import Share from "components/src/icons/iconFiles/Share.svg";
import { Product, ProductSKU, ProductStatusEnum } from "components/src/interfaces";
import Image from "next/image";
import React from "react";

interface ProductStylesAndSizesProps {
  product: Product;
  selectedColor: string | null;
  selectedSku: ProductSKU | null;
  onColorSelect: (color: string) => void;
  onSkuSelect: (sku: ProductSKU) => void;
  handleShare?: (product: Product) => void;
  primaryColor?: string;
}

const ProductStylesAndSizes: React.FC<ProductStylesAndSizesProps> = ({
  product,
  selectedColor,
  onColorSelect,
  selectedSku,
  onSkuSelect,
  handleShare,
  primaryColor,
}) => {
  const availableSKUs =
    !product.isOutOfStock &&
    product.status === ProductStatusEnum.ACTIVE &&
    Array.from(new Map(product.productSKUs.filter(sku => sku.quantity > 0 && sku.color).map(sku => [sku.color, sku])).values());

  const filteredSizes =
    !product.isOutOfStock &&
    product.status === ProductStatusEnum.ACTIVE &&
    Array.from(
      new Map(product.productSKUs.filter(sku => sku.color === selectedColor && sku.quantity > 0 && sku.size).map(sku => [sku.size, sku])).values(),
    );

  return (
    <div className="mt-4 sm:m-0">
      {availableSKUs && availableSKUs.length > 0 && <h4 className="text-gray-900 text-2xl font-semibold">Styles</h4>}

      <div className="mt-2 flex w-full items-start justify-start gap-2">
        <div className="flex w-full max-w-[80vw] flex-nowrap justify-start gap-2 overflow-x-auto">
          {availableSKUs &&
            availableSKUs.map((sku, index) => (
              <div key={index} className="gap-2 overflow-x-auto">
                <div
                  className={`aspect-square h-[4em] cursor-pointer rounded-full shadow-md lg:h-[72px]`}
                  style={{
                    backgroundColor: sku.color,
                    border: selectedColor === sku.color ? `2px solid ${primaryColor}` : "2px solid black",
                  }}
                  onClick={() => onColorSelect(sku.color)}
                ></div>
                <p className="text-center text-sm font-semibold">Style {index + 1}</p>
              </div>
            ))}
        </div>
        <div
          className="flex aspect-square h-full max-h-14 w-full max-w-14 cursor-pointer items-center justify-center rounded-full p-2 hover:shadow-lg"
          onClick={() => handleShare && handleShare(product)}
          style={{ backgroundColor: primaryColor }}
        >
          <Image src={Share} draggable={false} alt="Share" className="h-full w-full object-contain" />
        </div>
      </div>

      {filteredSizes && filteredSizes.length > 0 && <h4 className="text-gray-900 text-2xl font-semibold">Size (mm)</h4>}
      <div className="scrollbar-hide mt-2 flex max-w-[80vw] flex-nowrap justify-start gap-2 overflow-x-auto">
        {filteredSizes &&
          filteredSizes.map((sku, index) => (
            <div
              key={index}
              className={`border-gray-300 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-[1px] font-bold md:h-14 ${selectedSku === sku ? "text-white-light4" : ""}`}
              style={{
                backgroundColor: selectedSku === sku ? primaryColor : "transparent",
              }}
              onClick={() => onSkuSelect(sku)}
            >
              {sku.size}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductStylesAndSizes;
