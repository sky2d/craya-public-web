import { generateUniqueSkuId } from "@/utils/genrateUniqueSkuId";
import { CreateProductSku, ProductStock, UploadedFile } from "components/src/interfaces";
import { useEffect } from "react";
import { SKUItem } from "./SKUItem";

interface ProductImagesSectionProps {
  profile: string | null;
  productStockList: CreateProductSku[];
  setSkus: (productSkus: CreateProductSku[]) => void;
  productId?: string;
}

export const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({ profile, productStockList, productId, setSkus }) => {
  useEffect(() => {
    const lastStock = productStockList.at(-1);
    const newProductSkus = [...productStockList];
    if (lastStock!.imageIds.length > 0) {
      newProductSkus.push({
        skuCombineKey: generateUniqueSkuId(productStockList),
        productId: productId ? productId : "",
        imageIds: [],
        images: [],
        productStock: [
          {
            size: null,
            quantity: 0,
          },
        ],
      });
      setSkus(newProductSkus);
    }
  });

  const onMainImageUpload = (image: UploadedFile, index: number) => {
    const newProductSkus = [...productStockList]; // cloning array

    // cloning the specific SKU object and its images array
    newProductSkus[index] = {
      ...newProductSkus[index],
      images: [...newProductSkus[index].images, image],
      imageIds: [...newProductSkus[index].imageIds, image.id!],
    };

    // adding a new empty SKU
    newProductSkus.push({
      skuCombineKey: generateUniqueSkuId(productStockList),
      productId: productId ? productId : "",
      imageIds: [],
      images: [],
      productStock: [
        {
          size: null,
          quantity: 0,
        },
      ],
    });

    setSkus(newProductSkus);
  };

  const onMultipleImagesUpload = (image: UploadedFile, index: number, remove?: boolean) => {
    const updatedSKUs = [...productStockList];

    updatedSKUs[index] = {
      ...updatedSKUs[index],
      images: remove ? updatedSKUs[index].images.filter(img => img.id !== image.id) : [...updatedSKUs[index].images, image],
      imageIds: remove ? updatedSKUs[index].imageIds.filter(imgId => imgId !== image.id) : [...updatedSKUs[index].imageIds, image.id!],
    };

    setSkus(updatedSKUs);
  };

  const onQuantityChange = (updatedStocks: ProductStock[], index: number) => {
    const updatedSKUs = [...productStockList];
    updatedSKUs[index].productStock = updatedStocks;

    setSkus(updatedSKUs);
  };
  if (!profile) return null;

  return (
    <>
      {productStockList.map((stock, index) => (
        <div key={index}>
          <p className="w-full text-start text-base font-medium">Sku {index + 1} :</p>
          <SKUItem
            profile={profile}
            sku={stock}
            index={index}
            onMainImageUpload={onMainImageUpload}
            onMultipleImagesUpload={onMultipleImagesUpload}
            onQuantityChange={onQuantityChange}
          />
        </div>
      ))}
    </>
  );
};
