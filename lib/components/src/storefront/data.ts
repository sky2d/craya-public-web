import { ImageSizeType } from "../interfaces";
import { createStorefrontData, createUploadedFileData, generateFakeLoop, generateFakeProduct } from "../services/storefront";

// TextCarousel
export const TEXT_CAROUSEL_INITIAL_DATA = createStorefrontData({ texts: [""] });
export const TEXT_CAROUSEL_PREVIEW_DATA = createStorefrontData({
  texts: Array(10)
    .fill(null)
    .map((_, index) => `Example ${index + 1}`),
});

// BrandImage
export const BRAND_IMAGE_INITIAL_DATA = createStorefrontData({
  imageSize: ImageSizeType.SMALL,
});
export const BRAND_IMAGE_PREVIEW_DATA = createStorefrontData({
  images: [createUploadedFileData("https://placehold.jp/360x40.png")],
  imageSize: ImageSizeType.SMALL,
});

// BrandInfo (only for storybook)
export const BRAND_INFO_PREVIEW_DATA = createStorefrontData({
  store: {
    sizeChartImageIds: [""],
    logo: createUploadedFileData("https://placehold.jp/140x140.png"),
    name: "Brand name",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, voluptatem.",
    address: "Delhi, India",
    primaryColor: "#ff55aa",
    isOnboarding: false,
    storeTags: [],
  },
});

// CategoryImages
export const CATEGORY_IMAGES_INITIAL_DATA = createStorefrontData({});
export const CATEGORY_IMAGES_PREVIEW_DATA = createStorefrontData({
  images: Array(5).fill(createUploadedFileData("https://placehold.jp/50x50.png")),
  texts: Array(5)
    .fill(null)
    .map((_, index) => `Example Text ${index + 1}`),
});

// Coupons
export const COUPONS_INITIAL_DATA = createStorefrontData({ texts: [""] });
export const COUPONS_PREVIEW_DATA = createStorefrontData({ coupons: Array(10).fill({ title: "Coupon" }) });

// ImagesGrid
export const IMAGES_GRID_INITIAL_DATA = createStorefrontData({});
export const IMAGES_GRID_PREVIEW_DATA = createStorefrontData({ images: Array(3).fill(createUploadedFileData("https://placehold.jp/1400x1400.png")) });

// ImageCarousel
export const IMAGE_CAROUSEL_INITIAL_DATA = createStorefrontData({});
export const IMAGE_CAROUSEL_PREVIEW_DATA = createStorefrontData({
  imageCarouselImages: {
    android: Array(3).fill(createUploadedFileData("https://placehold.jp/360x400.png")),
    web: Array(3).fill(createUploadedFileData("https://placehold.jp/360x400.png")),
  },
});

// HeadingText
export const HEADING_TEXT_PREVIEW_DATA = createStorefrontData({
  texts: ["Lorem Ipsum"],
  imageSize: ImageSizeType.SMALL,
});

// ImageButton
export const IMAGE_BUTTON_INITIAL_DATA = createStorefrontData({ texts: [""], imageSize: ImageSizeType.SMALL });
export const IMAGE_BUTTON_PREVIEW_DATA = createStorefrontData({ texts: [""], images: [createUploadedFileData("https://placehold.jp/384x360.png")] });

// ImageTextCarousel
export const IMAGE_TEXT_CAROUSEL_INITIAL_DATA = createStorefrontData({ texts: [""], extraTexts: [""] });
export const IMAGE_TEXT_CAROUSEL_PREVIEW_DATA = createStorefrontData({
  texts: Array(3)
    .fill(null)
    .map((_, index) => `Heading Text ${index + 1}`),
  extraTexts: Array(3)
    .fill(null)
    .map((_, index) => `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ${index + 1}`),
  images: Array(3).fill(createUploadedFileData("https://placehold.jp/116x146.png")),
});

// ProductGrid
export const PRODUCT_GRID_INITIAL_DATA = createStorefrontData({});
export const PRODUCT_GRID_PREVIEW_DATA = createStorefrontData({ products: Array(6).fill(null).map(generateFakeProduct) });

// ShoppableCarousel
export const SHOPPABLE_CAROUSEL_INITIAL_DATA = createStorefrontData({ loops: Array(5).fill(null).map(generateFakeLoop) });
export const SHOPPABLE_CAROUSEL_PREVIEW_DATA = createStorefrontData({ loops: Array(6).fill(null).map(generateFakeLoop) });

// ShoppableVideoFeed
export const SHOPPABLE_VIDEO_FEED_INITIAL_DATA = createStorefrontData({ loops: Array(5).fill(null).map(generateFakeLoop) });
export const SHOPPABLE_VIDEO_FEED_PREVIEW_DATA = createStorefrontData({ loops: Array(5).fill(null).map(generateFakeLoop) });
