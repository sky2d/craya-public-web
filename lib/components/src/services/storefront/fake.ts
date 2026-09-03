import { rand, randBoolean, randHex, randNumber, randProduct } from "@ngneat/falso";
import { PRODUCT_SKU_SIZES } from "../../constant/product";
import {
  Loop,
  LoopStatus,
  Presence,
  Product,
  ProductDetail,
  ProductDetailType,
  ProductSKU,
  ProductStatusEnum,
  SimpleProduct,
} from "../../interfaces";
import { createUploadedFileData } from "./data";

export const generateFakeProduct = (): Product => {
  const fakeProduct = randProduct({});
  const price = Number.parseInt(fakeProduct.price);
  const maxDiscount = Math.max(10, Math.floor(price / 2));

  const productDetails: ProductDetail[] = Array(randNumber({ min: 1, max: 10 }))
    .fill(null)
    .map(() => ({
      type: rand(Object.values(ProductDetailType)),
      value: fakeProduct.category,
    }));

  const productSKUs: ProductSKU[] = Array(randNumber({ min: 1, max: 10 }))
    .fill(null)
    .map(() => ({
      imageIds: [],
      skuCombineKey: "",
      images: [],
      color: randHex(),
      quantity: 0,
      size: rand(PRODUCT_SKU_SIZES),
    }));

  return {
    price,
    sizeProfile: "ToppWear",
    selectedSizeChartImageId: "",
    storeId: "",
    description: fakeProduct.description,
    shortDescription: fakeProduct.description,
    name: fakeProduct.title,
    image: createUploadedFileData(fakeProduct.image),
    discountedPrice: randBoolean() ? undefined : randNumber({ min: 10, max: maxDiscount }),
    productDetails,
    productSKUs,
    status: rand(Object.values(ProductStatusEnum)),
    isOutOfStock: randBoolean(),
  };
};

export const generateFakeSimpleProduct = (): SimpleProduct => {
  const fakeProduct = randProduct({});
  const price = Number.parseInt(fakeProduct.price);
  const maxDiscount = Math.max(10, Math.floor(price / 2));

  return {
    price,
    sizeProfile: "ToppWear",
    selectedSizeChartImageId: "",
    storeId: "",
    shortDescription: fakeProduct.description,
    description: fakeProduct.description,
    name: fakeProduct.title,
    image: createUploadedFileData(fakeProduct.image),
    discountedPrice: randBoolean() ? undefined : randNumber({ min: 10, max: maxDiscount }),
    status: rand(Object.values(ProductStatusEnum)),
    isOutOfStock: randBoolean(),
  };
};

export const generateFakeSimpleProducts = (count: number): SimpleProduct[] => {
  return Array(count).fill(null).map(generateFakeSimpleProduct);
};

export const generateFakeLoop = (): Loop => {
  const products = Array(randNumber({ min: 1, max: 3 }))
    .fill(null)
    .map(generateFakeProduct);

  return {
    id: "",
    status: rand(Object.values(LoopStatus)),
    video: createUploadedFileData("https://videos.pexels.com/video-files/3756003/3756003-uhd_1440_2732_25fps.mp4"),
    products,
    presence: rand(Object.values(Presence)),
  };
};
