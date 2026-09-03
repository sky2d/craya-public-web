import { CreateProductSku } from "components/src/interfaces";
import { v4 as uuidv4 } from "uuid";

// Generate a unique ID not colliding with existing SKUs
export const generateUniqueSkuId = (existingSkus: CreateProductSku[]): string => {
  const existingIds = new Set(existingSkus.map(sku => sku.skuCombineKey));

  let newId: string;
  do {
    newId = uuidv4();
  } while (existingIds.has(newId));

  return newId;
};
