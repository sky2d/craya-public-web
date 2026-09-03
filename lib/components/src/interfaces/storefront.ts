import { Coupon } from "../interfaces/Coupon";
import { UploadedFile } from "../interfaces/files";
import { Loop } from "../interfaces/loop";
import { SimpleProduct, WishlistItems } from "../interfaces/product";
import { Store } from "../interfaces/store";

export enum StorefrontComponentType {
  BRAND_IMAGE = "BRAND_IMAGE",
  BRAND_INFO = "BRAND_INFO",
  CATEGORY_IMAGES = "CATEGORY_IMAGES",
  COUPONS = "COUPONS",
  HEADING_TEXT = "HEADING_TEXT",
  IMAGE_BUTTON = "IMAGE_BUTTON",
  IMAGE_CAROUSEL = "IMAGE_CAROUSEL",
  IMAGES_GRID = "IMAGES_GRID",
  IMAGE_TEXT_CAROUSEL = "IMAGE_TEXT_CAROUSEL",
  PRODUCT_GRID = "PRODUCT_GRID",
  TEXT_CAROUSEL = "TEXT_CAROUSEL",
  VIDEO_CAROUSEL = "VIDEO_CAROUSEL",
  SHOPPABLE_CAROUSEL = "SHOPPABLE_CAROUSEL",
  SHOPPABLE_VIDEO_FEED = "SHOPPABLE_VIDEO_FEED",
}

export enum ImageSizeType {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export interface StorefrontComponentData {
  id?: string;
  texts: string[];
  extraTexts: string[];
  coupons: Coupon[];
  images: UploadedFile[];
  imageSize: ImageSizeType | null;
  store: Store | null;
  products: SimpleProduct[];
  loops: Loop[];
  _selectedProductsIds: string[];
  imageCarouselImages: {
    android: UploadedFile[];
    web: UploadedFile[];
  };
  _selectedVideoIds: string[];
  productsPerImage: string[][];
}

export interface StorefrontComponent {
  id?: string;
  storeId?: string;
  dataId?: string;
  store: Store;
  position: number;
  type: StorefrontComponentType;
  data: StorefrontComponentData;
}

export interface StorefrontComponentConfigProps {
  data: StorefrontComponentData;
  setData: (data: Partial<StorefrontComponentData>) => void;
  onclick: () => void;
  setIndex: (index: number) => void;
  isOpenImageGridPreview?: boolean;
  setIsOpenImageGridPreview?: (isOpen: boolean) => void;
  storefrontComponentType: StorefrontComponentType;
}

export enum StorefrontActions {
  PRODUCTS_PRESS = "PRODUCTS_PRESS",
  PRODUCT_PRESS = "PRODUCT_PRESS",
  LOOP_PRESS = "LOOP_PRESS",
  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  SHARE_PRESS = "SHARE_PRESS",
  CART_PRESS = "CART_PRESS",
  // CATEGORY_IMAGE_PRESS = "CATEGORY_IMAGE_PRESS",
  // COUPON_PRESS = "COUPON_PRESS",
  // IMAGE_BUTTON_PRESS = "IMAGE_BUTTON_PRESS",
  // IMAGE_CAROUSEL_PRESS = "IMAGE_CAROUSEL_PRESS",
  BRAND_INFO_PRESS = "BRAND_INFO_PRESS",

  // other components action as well
}

export interface Policies {
  id?: string;
  title: string;
  type: string;
  description: string;
  storeId: string;
  isFake: boolean;
  store?: Store;
}

export interface StorefrontComponentProps {
  data?: StorefrontComponentData;
  handlerFunction?: StorefrontHandlerFunction;
  wishlistItems?: WishlistItems[];
  products?: SimpleProduct[];
}

export type StorefrontHandlerFunction = (action: StorefrontActions, data: StorefrontComponentData, type?: StorefrontComponentType) => void;
