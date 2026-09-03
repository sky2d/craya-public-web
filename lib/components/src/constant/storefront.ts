import dynamic from "next/dynamic";
import { StorefrontComponentType } from "../interfaces";

import {
  BuilderBrandInfo,
  BuilderCategoryImages,
  BuilderImageButton,
  BuilderImageTextCarousel,
  BuilderImagesGrid,
  BuilderProductGrid,
  BuilderShoppableCarousel,
  BuilderShoppableVideoFeed,
  BuilderTextCarousel,
} from "../storefront/builderComponent";
import {
  BrandImageConfig,
  BrandInfoConfig,
  CategoryImagesConfig,
  HeadingTextConfig,
  ImageButtonConfig,
  ImageCarouselConfig,
  ImageTextCarouselConfig,
  ImagesGridConfig,
  ProductGridConfig,
  TextCarouselConfig,
} from "../storefront/config";
import {
  BRAND_IMAGE_INITIAL_DATA,
  CATEGORY_IMAGES_INITIAL_DATA,
  COUPONS_INITIAL_DATA,
  IMAGES_GRID_INITIAL_DATA,
  IMAGE_BUTTON_INITIAL_DATA,
  IMAGE_CAROUSEL_INITIAL_DATA,
  IMAGE_TEXT_CAROUSEL_INITIAL_DATA,
  SHOPPABLE_CAROUSEL_INITIAL_DATA,
  SHOPPABLE_VIDEO_FEED_INITIAL_DATA,
  TEXT_CAROUSEL_INITIAL_DATA,
} from "../storefront/data";
import { BrandImage, BuilderCouponsComponent, HeadingText, ImageCarousel, TextCarousel } from "../storefront/main";
import productGrid from "../StorefrontComponentImages//product grid/productGrid.png";
import brandImage from "../StorefrontComponentImages/brand image/brandImage.png";
import brandInfo from "../StorefrontComponentImages/brand info/brandInfo.png";
import categoryImages from "../StorefrontComponentImages/Category Image/categoryImages.png";
import coupons from "../StorefrontComponentImages/Coupon/coupons.png";
import headingText from "../StorefrontComponentImages/heading text/headingText.png";
import imageButton from "../StorefrontComponentImages/image Button/imageButton.png";
import imageCarousel from "../StorefrontComponentImages/image carousel/imageCarousel.png";
import imageGrid from "../StorefrontComponentImages/Image Grid/imageGrid.png";
import imageTextCarousel from "../StorefrontComponentImages/image text carousel/imageTextCarousel.png";
import shoppableCarousel from "../StorefrontComponentImages/Shoppable carousel/shoppableCarousel.png";
import shoppableVideoFeed from "../StorefrontComponentImages/shoppable feed/shoppableVideoFeed.png";
import textCarousel from "../StorefrontComponentImages/text carousel/textCarousel.png";

export const builderComponentMapping = new Map([
  [
    StorefrontComponentType.BRAND_IMAGE,
    {
      componentImage: brandImage,
      component: BrandImage,
      configComponent: BrandImageConfig,
      initialData: BRAND_IMAGE_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.BRAND_INFO,
    { componentImage: brandInfo, component: BuilderBrandInfo, configComponent: BrandInfoConfig, initialData: null },
  ],
  [
    StorefrontComponentType.CATEGORY_IMAGES,
    {
      componentImage: categoryImages,
      component: BuilderCategoryImages,
      configComponent: CategoryImagesConfig,
      initialData: CATEGORY_IMAGES_INITIAL_DATA,
    },
  ],

  [
    StorefrontComponentType.HEADING_TEXT,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.HeadingText)),
      configComponent: HeadingTextConfig,
      initialData: null,
      componentImage: headingText,
    },
  ],
  [
    StorefrontComponentType.IMAGE_BUTTON,
    { componentImage: imageButton, component: BuilderImageButton, configComponent: ImageButtonConfig, initialData: IMAGE_BUTTON_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.IMAGE_CAROUSEL,
    { componentImage: imageCarousel, component: ImageCarousel, configComponent: ImageCarouselConfig, initialData: IMAGE_CAROUSEL_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.IMAGE_TEXT_CAROUSEL,
    {
      componentImage: imageTextCarousel,
      component: BuilderImageTextCarousel,
      configComponent: ImageTextCarouselConfig,
      initialData: IMAGE_TEXT_CAROUSEL_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.IMAGES_GRID,
    { componentImage: imageGrid, component: BuilderImagesGrid, configComponent: ImagesGridConfig, initialData: IMAGES_GRID_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.PRODUCT_GRID,
    { componentImage: productGrid, component: BuilderProductGrid, configComponent: ProductGridConfig, initialData: null },
  ],
  [
    StorefrontComponentType.TEXT_CAROUSEL,
    { componentImage: textCarousel, component: BuilderTextCarousel, configComponent: TextCarouselConfig, initialData: TEXT_CAROUSEL_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.COUPONS,
    { componentImage: coupons, component: BuilderCouponsComponent, configComponent: null, initialData: COUPONS_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.SHOPPABLE_CAROUSEL,
    { componentImage: shoppableCarousel, component: BuilderShoppableCarousel, configComponent: null, initialData: SHOPPABLE_CAROUSEL_INITIAL_DATA },
  ],
  [
    StorefrontComponentType.SHOPPABLE_VIDEO_FEED,
    {
      componentImage: shoppableVideoFeed,
      component: BuilderShoppableVideoFeed,
      configComponent: null,
      initialData: SHOPPABLE_VIDEO_FEED_INITIAL_DATA,
    },
  ],
]);

export const storefrontComponentMapping = new Map([
  [
    StorefrontComponentType.BRAND_IMAGE,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.BrandImage)),
      configComponent: BrandImageConfig,
      initialData: BRAND_IMAGE_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.BRAND_INFO,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.BrandInfo)),
      configComponent: BrandInfoConfig,
      initialData: null,
    },
  ],
  [
    StorefrontComponentType.CATEGORY_IMAGES,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.CategoryImages)),
      configComponent: CategoryImagesConfig,
      initialData: CATEGORY_IMAGES_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.COUPONS,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.StorefrontCouponsComponent)),
      configComponent: null,
      initialData: COUPONS_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.HEADING_TEXT,
    {
      component: HeadingText,
      configComponent: HeadingTextConfig,
      initialData: null,
    },
  ],
  [
    StorefrontComponentType.IMAGE_BUTTON,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ImageButton)),
      configComponent: ImageButtonConfig,
      initialData: IMAGE_BUTTON_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.IMAGE_CAROUSEL,
    {
      component: ImageCarousel,
      configComponent: ImageCarouselConfig,
      initialData: IMAGE_CAROUSEL_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.IMAGE_TEXT_CAROUSEL,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ImageTextCarousel)),
      configComponent: ImageTextCarouselConfig,
      initialData: IMAGE_TEXT_CAROUSEL_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.IMAGES_GRID,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ImagesGrid)),
      configComponent: ImagesGridConfig,
      initialData: IMAGES_GRID_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.PRODUCT_GRID,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ProductGrid)),
      configComponent: ProductGridConfig,
      initialData: null,
    },
  ],
  [
    StorefrontComponentType.SHOPPABLE_CAROUSEL,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ShoppableCarousel), {
        ssr: false,
      }),
      configComponent: null,
      initialData: SHOPPABLE_CAROUSEL_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.SHOPPABLE_VIDEO_FEED,
    {
      component: dynamic(() => import("../storefront/main").then(mod => mod.ShoppableVideoFeed)),
      configComponent: null,
      initialData: SHOPPABLE_VIDEO_FEED_INITIAL_DATA,
    },
  ],
  [
    StorefrontComponentType.TEXT_CAROUSEL,
    {
      component: TextCarousel,
      configComponent: TextCarouselConfig,
      initialData: TEXT_CAROUSEL_INITIAL_DATA,
    },
  ],
]);
