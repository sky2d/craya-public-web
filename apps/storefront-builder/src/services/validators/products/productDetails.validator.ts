import { Product, ProductDetailType, ProductError, ProductSKU } from "components/src/interfaces";

interface productSkuError {
  message: string;
  skuId: string;
}

const validateName = (product: Product) => {
  if (!product?.name) return "Product name is required";
  if (product?.name.length > 30) return "Product name should not exceed 30 characters.";
};

const validatePrice = (product: Product) => {
  if (!product?.price) return "Price is required";
  if (product.price < 50) return "Price cannot less than 50";
};

const validateSizeProfile = (product: Product) => {
  if (product.sizeProfile === "") return "Add size profile";
};

const validateDescription = (product: Product) => {
  if (!product?.description) return "Description is required";
};
const validateShortDescription = (product: Product) => {
  if (!product?.shortDescription) return "Short Description is required";
};

const validateProductDetails = (product: Product) => {
  const categoryList = product.productDetails.filter(item => item.type === ProductDetailType.CATEGORY && item.value);
  const subCategoryList = product.productDetails.filter(item => item.type === ProductDetailType.SUB_CATEGORY && item.value);
  const productTypeList = product.productDetails.filter(item => item.type === ProductDetailType.PRODUCT_TYPE && item.value);

  if (!categoryList.length) return "You need to fill at least one category for the product";
  if (!subCategoryList.length) return "You need to fill at least one sub category for the product";
  if (!productTypeList.length) return "You need to fill at least one type for the product";
};

export const validateProductSKUs = (productSKUs: ProductSKU[]): productSkuError | null => {
  for (let i = 0; i < productSKUs.length; i++) {
    const sku = productSKUs[i];
    const isSizeNullSku = sku.size === null;

    if (isSizeNullSku && sku.imageIds.length) {
      return {
        message: "Please select size for all the SKUs",
        skuId: sku.skuCombineKey,
      };
    }

    if (sku.imageIds.length && sku.quantity === 0) {
      return {
        message: "Quantity should not be 0",
        skuId: sku.skuCombineKey,
      };
    }

    if (!isSizeNullSku && !sku.imageIds.length) {
      return {
        message: "Please add image for all the SKUs",
        skuId: sku.skuCombineKey,
      };
    }
  }

  return null; // ✅ all SKUs valid
};

// export const validateProductSKUs = (product: Product) => {
//   if (!product.productSKUs.length) return "You need to add at least one Product SKU";
//   const productSKUErrors = product.productSKUs.map(validateProductSKU);
//   return productSKUErrors;
// };

const hasProductError = (productError: ProductError) => {
  return Object.values(productError)
    .map(value => !!value)
    .includes(true);
};

const validateSizeChartId = (product: Product) => {
  if (!product.selectedSizeChartImageId) return "Please select size chart";
};

export const validateProductFields = (product: Product): ProductError | null => {
  const productError: ProductError = {
    // image: validateProductImages(product),
    name: validateName(product),
    sizeProfile: validateSizeProfile(product),
    price: validatePrice(product),
    description: validateDescription(product),
    shortDescription: validateShortDescription(product),
    productDetails: validateProductDetails(product),
    // productSKUs: validateProductSKUs(product),
    selectedSizeChartId: validateSizeChartId(product),
  };
  if (hasProductError(productError)) return productError;
  return null;
};
