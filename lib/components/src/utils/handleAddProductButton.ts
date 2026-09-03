import { StorefrontComponentConfigProps } from "../interfaces";

interface AddProductButtonProps extends StorefrontComponentConfigProps {
  index?: number;
  count?: number;
}

export const handleAddProductButton = ({ data, setData, onclick, setIndex, index = 0, count = 1 }: AddProductButtonProps): void => {
  localStorage.setItem("count", JSON.stringify(count));

  const updatedData = {
    ...data,
    productsPerImage: data.productsPerImage.length === 0 ? Array.from({ length: count }, () => []) : [...data.productsPerImage],
  };

  setData(updatedData);
  setIndex(index);
  onclick();
};
