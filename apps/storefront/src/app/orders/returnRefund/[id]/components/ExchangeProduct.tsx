import { CreateProductSku, Product, ProductSKU } from "components/src/interfaces";
import Image from "next/image";
import { useState } from "react";

interface ExchangeProductProps {
  product: Product;
  productSku: CreateProductSku[];
  selectedColor: number;
  selectedSku: ProductSKU | null;
  onSelectColor: (color: number) => void;
  onSkuSelect: (sku: ProductSKU | null) => void;
  error?: string | null;
  primaryColor?: string;
}
const ExchangeProduct: React.FC<ExchangeProductProps> = ({ product, selectedColor, productSku, onSelectColor, onSkuSelect, error, primaryColor }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const availableSizes = Array.from(
    new Set(productSku?.[selectedColor]?.productStock.filter(stock => stock.quantity > 0).map(stock => stock.size)),
  ).sort();

  const handleSelectColor = (key: string) => {
    const selectedIndex = productSku.findIndex(sku => sku.skuCombineKey === key);
    onSelectColor(selectedIndex);
  };

  const handleSizeSelect = (size: string) => {
    const skuId = productSku[selectedColor].productStock.find(stock => stock.size === size)?.id;

    const selected = product.productSKUs.find(sku => sku.id === skuId);

    if (selectedSize === size) {
      setSelectedSize(null);
      onSkuSelect(null);
    } else if (selected) {
      onSkuSelect(selected);
      setSelectedSize(size);
    }
  };

  return (
    <div className="bg-gray-100 mb-6 w-full rounded-3xl border-[0.5px] border-[#717171] p-4">
      {/* Order Summary */}
      <h1 className="text-lg font-semibold">What do you want in exchange?</h1>
      <hr className="my-1 border-t-[0.5px] border-[#717171]" />

      {/* Item Details */}
      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
        {/* Product Image */}
        <div className="relative aspect-[1/1.6] w-1/2 flex-shrink-0 overflow-hidden rounded-md sm:w-auto sm:min-w-[20%] lg:min-w-[15%]">
          <Image
            src={productSku[selectedColor]?.images[0]?.fileUrl || ""}
            placeholder="empty"
            unoptimized
            alt={product.description || ""}
            fill
            draggable={false}
            className="rounded-md object-cover"
            sizes="(max-width: 640px) 15vw, 64px"
            onError={e => {
              e.currentTarget.src = "";
            }} // Handle image load errors
          />
        </div>

        <div className="mt-4 sm:m-0">
          {product.productSKUs && <h4 className="text-gray-900 text-2xl font-semibold">Styles</h4>}

          <div className="flex w-full gap-2 overflow-x-auto py-2">
            {productSku &&
              productSku.map((sku, index) => (
                <div key={index} className="gap-2 overflow-x-auto">
                  <div
                    className={`relative aspect-square h-[4em] cursor-pointer rounded-full shadow-md lg:h-[72px]`}
                    onClick={() => handleSelectColor(sku.skuCombineKey || "")}
                  >
                    <Image src={sku.images[0].fileUrl || ""} alt={sku.images[0].fileName} layout="fill" className="rounded-full object-cover" />
                  </div>
                  <p className="text-center text-sm font-semibold">Style {index + 1}</p>
                </div>
              ))}
          </div>

          {availableSizes && availableSizes.length > 0 && <h4 className="text-gray-900 text-2xl font-semibold">Size (mm)</h4>}
          <div className="mt-2 w-full max-w-[80vw] overflow-x-auto">
            <div className="flex gap-2 py-2">
              {availableSizes &&
                availableSizes.map((size, index) => (
                  <div
                    key={index}
                    className={`border-gray-300 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-[1px] font-bold md:h-14 ${selectedSize === size ? "text-white-light4" : ""}`}
                    style={{
                      backgroundColor: selectedSize === size ? primaryColor : "transparent",
                    }}
                    onClick={() => handleSizeSelect(size || "")}
                  >
                    {size}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <span className="text-red-500">{error}</span>
    </div>
  );
};

export default ExchangeProduct;
