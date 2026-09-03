import { SIZE_PROFILES } from "components/src/constant/product";
import { CreateProductSku, ProductStock, UploadedFile } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { ImageUpload, InputField2, MultipleImageUpload, showPopup } from "components/src/minor";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SKUItemProps {
  profile: string;
  sku: CreateProductSku;
  index: number;
  onMainImageUpload: (image: UploadedFile, index: number) => void;
  onMultipleImagesUpload: (image: UploadedFile, index: number, remove?: boolean) => void;
  onQuantityChange: (productStock: ProductStock[], index: number) => void;
}

const SKUItemComponent: React.FC<SKUItemProps> = ({ profile, sku, index, onMainImageUpload, onMultipleImagesUpload, onQuantityChange }) => {
  const [isInputFieldOpen, setIsInputOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [multipleStocks, setMultipleStocks] = useState<ProductStock[]>(sku.productStock);
  // const sizesArray = multipleStocks.map(stock => stock.size);
  const [pendingSizes, setPendingSizes] = useState<string[]>([]);
  const quantityExist = sku.productStock.some(stock => stock.quantity > 0);

  const handleSizeClick = (size: string | number) => {
    const sizeStr = String(size);

    if (multipleStocks.length === 1 && multipleStocks[0].size !== null) {
      const updatedStocks = [{ size: null, quantity: 0 }];
      setMultipleStocks(updatedStocks);
      onQuantityChange(updatedStocks, index);
      setIsInputOpen(false);
    }
    if (multipleStocks.length === 1 && multipleStocks[0].size === null) {
      // Special case: replace the initial null size
      const updatedStocks = [{ size: sizeStr, quantity: 0 }];
      setPendingSizes(prev => [...prev, sizeStr]);
      setMultipleStocks(updatedStocks);
      setIsInputOpen(true);
      return;
    }

    const sizeExist = multipleStocks.some(stock => stock.size === sizeStr);

    if (!sizeExist) {
      let updatedStocks;

      if (quantity === 0) {
        updatedStocks = [...multipleStocks, { size: sizeStr, quantity: 0 }];
      } else {
        updatedStocks = [...multipleStocks, { size: sizeStr, quantity }];
      }

      setPendingSizes(prev => [...prev, sizeStr]);
      setMultipleStocks(updatedStocks);
      setIsInputOpen(true);
    } else {
      if (multipleStocks.length === 1 && multipleStocks[0].size !== null) return;
      const updatedStocks = multipleStocks.filter(stock => stock.size !== sizeStr);
      setMultipleStocks(updatedStocks);
      setPendingSizes(prev => prev.filter(s => s !== sizeStr));
      onQuantityChange(updatedStocks, index);
    }
  };

  const isImageEmpty = sku.images.length === 0;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-5">
      {isImageEmpty ? (
        <ImageUpload
          image={sku.images[0]}
          productAspectRatio={0.625}
          changeImage={image => onMainImageUpload(image, index)}
          className="h-44 w-full"
        />
      ) : (
        <div className="w-full rounded-md border border-brand-color1 p-2">
          <MultipleImageUpload images={sku.images} changeImage={(img, remove) => onMultipleImagesUpload(img, index, remove)} />
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-center space-y-2">
        <div className="w-full pb-0 pl-2 pt-2 text-start text-sm font-normal text-[#6e6c6c] hover:border-brand-color3 xl:text-[0.9vw]">
          {multipleStocks.length > 0 && multipleStocks.some(stock => stock.size !== null) ? "Sizes" : "Select Size"}
        </div>
        <div className="grid w-full grid-cols-5 gap-5">
          {SIZE_PROFILES[profile].map((size, sizeIndex) => {
            const sizeStr = String(size);

            const isSizeExist = multipleStocks.some(stock => stock.size === sizeStr) || sku.productStock.some(stock => stock.size === sizeStr);
            const matchedStock = multipleStocks.find(stock => stock.size === sizeStr);
            return (
              <div className="flex flex-col items-center justify-center gap-1" key={sizeIndex}>
                <button
                  onClick={() => handleSizeClick(size)}
                  className={`flex aspect-[2/1] w-full cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition ${
                    isSizeExist ? "bg-brand-color1 text-white-light4" : "hover:bg-gray-300 border border-black-dark4 text-black-dark3"
                  }`}
                >
                  {size}
                </button>
                {quantityExist && (
                  <button
                    onClick={() => handleSizeClick(size)}
                    className={`flex aspect-[2/1] w-full cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition ${
                      matchedStock ? "border-[1px] border-brand-color1 text-brand-color1" : "border border-black-dark4 text-black-dark3"
                    }`}
                  >
                    {matchedStock ? String(matchedStock.quantity) : "0"}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {isInputFieldOpen && (
          <div className="my-3 w-full">
            <p className="w-full py-2 pl-2 text-start text-sm font-normal text-[#6e6c6c] hover:border-brand-color3 xl:text-[0.9vw]">Add Quantity</p>
            <InputField2
              placeholder="Add quantity"
              className="h-10"
              value={quantity}
              type={InputFieldType.NUMBER}
              iconPosition="right"
              icon={<FaCheckCircle className="text-brand-color1" />}
              onChange={e => {
                const newQty = Number(e.target.value);
                setQuantity(newQty);
                setMultipleStocks(prevStocks =>
                  prevStocks.map(stock => (pendingSizes.includes(stock.size!) ? { ...stock, quantity: newQty } : stock)),
                );
              }}
              onIconClick={() => {
                if (quantity === 0) return showPopup("error", "Quantity cannot be ");
                onQuantityChange(multipleStocks, index);
                setIsInputOpen(false);
                setPendingSizes([]);
                setQuantity(0);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Custom memo comparison: only re-render if this SKU object actually changes
export const SKUItem = React.memo(SKUItemComponent, (prevProps, nextProps) => prevProps.sku === nextProps.sku);
