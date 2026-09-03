import { CreateProductSku, ProductSKU } from "components/src/interfaces";

export const convertToProductStockList = (productSkuList: ProductSKU[]): CreateProductSku[] => {
  const productStockMap: Record<string, CreateProductSku> = {};

  productSkuList.forEach(sku => {
    const key = sku.skuCombineKey;
    if (!productStockMap[key]) {
      productStockMap[key] = {
        skuCombineKey: sku.skuCombineKey,
        productId: sku.productId ?? "",
        images: sku.images,
        imageIds: sku.imageIds ?? [],
        productStock: [{ id: sku.id, quantity: sku.quantity, size: sku.size }],
      };
    } else {
      // Merge stock info if same uniqueId
      productStockMap[key].productStock.push({
        id: sku.id,
        quantity: sku.quantity,
        size: sku.size,
      });
    }
  });

  return Object.values(productStockMap);
};
