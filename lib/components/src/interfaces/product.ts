import { UploadedFile } from "./files";
import { Store } from "./store";
import { User } from "./user";

export enum ProductDetailType {
  CATEGORY = "CATEGORY",
  SUB_CATEGORY = "SUB_CATEGORY",
  PRODUCT_TYPE = "PRODUCT_TYPE",
}
export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export interface SimpleProduct {
  id?: string;
  storeId: string;
  imageId?: string;
  status?: ProductStatusEnum;
  selectedSizeChartImageId: string | null;
  name: string;
  discountedPrice?: number | null;
  price: number;
  description: string;
  shortDescription?: string;
  sizeProfile: string | null;
  image?: UploadedFile;
  additionalImageIds?: string[];
  additionalImages?: UploadedFile[];
  productSKUs?: ProductSKU[];
  isOutOfStock?: boolean;
  weightInGrams?: number;
  selectedSizeChartImage?: UploadedFile;
}

export interface Product extends SimpleProduct {
  productDetails: ProductDetail[];
  productSKUs: ProductSKU[];
}

export interface ProductDetail {
  id?: string;
  productId?: string;
  type: ProductDetailType;
  value: string;
}

export interface ProductSKU {
  id?: string;
  skuCombineKey: string;
  productId?: string;
  color: string;
  images: UploadedFile[];
  imageIds: string[];
  size: string | null;
  quantity: number;
}

export interface CreateProductSku {
  skuCombineKey: string;
  productId?: string;
  images: UploadedFile[];
  imageIds: string[];
  productStock: ProductStock[];
}

export interface ProductStock {
  id?: string;
  size: string | null;
  quantity: number;
}

export interface ProductError {
  name?: string;
  sizeProfile?: string;
  price?: string;
  description?: string;
  shortDescription?: string;
  productDetails?: string;
  productSKUs?: string;
  image?: string;
  selectedSizeChartId?: string;
}

export interface RecentSearched {
  id: string;
  userId?: string;
  query: string;
  isFake?: boolean;
}

export interface ProductReview {
  productId: string;
  comment: string;
  rating: number;
  imageId?: string[];
}
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  status: string;
  isFake: boolean;
  user: User;
  images: UploadedFile[];
  product: {
    id: string;
    name: string;
    store: {
      id: string;
      name: string;
    };
  };
}

export interface ProductReviewResult {
  reviews: Review[];
}

export interface WishlistItems {
  id?: string;
  isFake: boolean;
  product: Product;
  wishlistId: string;
  productSKU: ProductSKU;
  store: Store;
  productId?: string;
  storeId?: string;
}

export interface Wishlist {
  id?: string;
  user: User;
  isFake: boolean;
  wishlistItems: WishlistItems[];
}
