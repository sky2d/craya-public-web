import { CreateProductSku, ProductSKU } from "components/src/interfaces";

export const convertToProductSkus = (stockList: CreateProductSku[]): ProductSKU[] => {
  return stockList.flatMap(item =>
    item.productStock.map(stock => ({
      id: stock.id,
      skuCombineKey: item.skuCombineKey,
      productId: item.productId,
      color: "#FF0000",
      images: item.images,
      imageIds: item.imageIds,
      size: stock.size,
      quantity: stock.quantity,
    })),
  );
};
