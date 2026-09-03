import { PRODUCT_SKU_SIZES } from "components/src/constant/product";
import { CreateProductSku } from "components/src/interfaces";

export const isSizesMissing = (productStockList: CreateProductSku[]): boolean => {
  for (const product of productStockList) {
    const availableSizes = product.productStock.map(stock => stock.size);
    for (const requiredSize of PRODUCT_SKU_SIZES) {
      if (!availableSizes.includes(requiredSize)) {
        return true; // Missing at least one required size
      }
    }
  }
  return false; // All sizes are present in all products
};
