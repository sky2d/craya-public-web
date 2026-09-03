import { Label } from "@/components/homeScreen/sellers/components/Label";
import { ProductDetail, ProductDetailType } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2, showPopup } from "components/src/minor";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
interface ProductDetails {
  name: string;
  originalIndex: number;
}

interface AddCategorySectionProps {
  productDetails: ProductDetails[];
  productTypeValue: ProductDetailType;
  setDetails: (details: ProductDetail) => void;
  removeTag: (index: number) => void;
  placeHolder: string;
  label: string;
}

export const AddCategorySection: React.FC<AddCategorySectionProps> = ({
  productDetails,
  productTypeValue,
  placeHolder,
  label,
  setDetails,
  removeTag,
}) => {
  const [value, setValue] = useState<string>("");

  const addProductDetail = (type: ProductDetailType, value: string) => {
    const MAX_PRODUCT_DETAILS = 5;

    const tagLength = productDetails.length;

    if (tagLength >= MAX_PRODUCT_DETAILS) return showPopup("error", ` Add max ${MAX_PRODUCT_DETAILS} tags`);

    if (value.trim().length === 0) {
      return showPopup("error", "Please enter a value");
    }

    setDetails({ type, value });
    setValue("");
  };

  const handleCrossClick = (index: number) => {
    removeTag(index);
  };

  return (
    <>
      <div className="w-full">
        <Label>{label}</Label>
        <div className="flex w-full items-center justify-center">
          <InputField2
            type={InputFieldType.TEXT}
            dataIndex={3}
            placeholder={placeHolder}
            value={value}
            onChange={e => setValue(e.target.value)}
            onSubmit={() => addProductDetail(productTypeValue, value)}
          />

          <button className="ml-2" onClick={() => addProductDetail(productTypeValue, value)}>
            <BsPlusCircleFill className="text-3xl text-brand-color1" />
          </button>
        </div>
      </div>

      {productDetails.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {productDetails.map(detail => {
            return (
              <div
                key={detail.originalIndex}
                className="relative inline-flex items-center gap-2 rounded-xl bg-brand-color1 py-1 pl-4 pr-1 text-white-light4 body-xs"
              >
                {detail.name}
                <button
                  onClick={() => handleCrossClick(detail.originalIndex)}
                  className="ml-1 flex aspect-square w-4 items-center justify-center rounded-full bg-white-light4"
                >
                  <span className="cursor-pointer text-xs leading-none text-black-dark1">×</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
