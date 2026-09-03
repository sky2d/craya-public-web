import { StorefrontComponentData, UploadedFile, UploadedFileStatus } from "../../interfaces";

export const createUploadedFileData = (fileUrl: string): UploadedFile => ({
  contentType: "",
  userId: "",
  status: UploadedFileStatus.UPLOADED,
  fileUrl,
  fileName: "",
});

export const createStorefrontData = (data: Partial<StorefrontComponentData>): StorefrontComponentData => ({
  images: [],
  texts: [],
  extraTexts: [],
  imageSize: null,
  store: null,
  products: [],
  loops: [],
  _selectedProductsIds: [],
  _selectedVideoIds: [],
  productsPerImage: [],
  imageCarouselImages: {
    android: [],
    web: [],
  },
  coupons: [],
  ...data,
});
