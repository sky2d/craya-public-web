import { StaticImageData } from "next/image";
import { ImageSizeType, StorefrontComponentType } from "../interfaces";
import brandImageLarge from "../StorefrontComponentImages/brand image/config/brandImageLarge.png";
import brandImageMedium from "../StorefrontComponentImages/brand image/config/brandImageMedium.png";
import brandImageSmall from "../StorefrontComponentImages/brand image/config/brandImageSmall.png";
import brandInfoConfig from "../StorefrontComponentImages/brand info/config/brandInfoConfig.png";
import categoryImageConfig from "../StorefrontComponentImages/Category Image/config/categoryImageConfig.png";
import imageButtonLarge from "../StorefrontComponentImages/image Button/config/imageButtonLarge.png";
import imageButtonMedium from "../StorefrontComponentImages/image Button/config/imageButtonMedium.png";
import imageButtonSmall from "../StorefrontComponentImages/image Button/config/imageButtonSmall.png";
import androidImageCarouselConfig from "../StorefrontComponentImages/image carousel/config/Android/androidImageCarouselConfig.png";
import webImageCarouselConfig from "../StorefrontComponentImages/image carousel/config/Web/webIMageCarouselConfig.png";
import type1_ImageGridConfig from "../StorefrontComponentImages/Image Grid/Config/type1_ImageGridConfig.png";
import type2_ImageGridConfig from "../StorefrontComponentImages/Image Grid/Config/type2_ImageGridConfig.png";
import imageTextCarouselConfig from "../StorefrontComponentImages/image text carousel/config/imageTextCarouselConfig.png";

type ConfigImageType = string | StaticImageData;

type ComponentAspectRatio =
  | {
      [key in ImageSizeType]?: {
        aspectRatio: number;
        configImage: ConfigImageType;
      };
    }
  | {
      aspectRatio: number;
      configImage: ConfigImageType;
    };

const componentAspectRatios: Partial<Record<StorefrontComponentType, ComponentAspectRatio>> = {
  [StorefrontComponentType.BRAND_IMAGE]: {
    [ImageSizeType.SMALL]: { aspectRatio: 3.3, configImage: brandImageSmall },
    [ImageSizeType.MEDIUM]: { aspectRatio: 2.2, configImage: brandImageMedium },
    [ImageSizeType.LARGE]: { aspectRatio: 1.6, configImage: brandImageLarge },
  },
  [StorefrontComponentType.CATEGORY_IMAGES]: {
    aspectRatio: 1,
    configImage: categoryImageConfig,
  },
  [StorefrontComponentType.IMAGE_BUTTON]: {
    [ImageSizeType.SMALL]: { aspectRatio: 3.3, configImage: imageButtonSmall },
    [ImageSizeType.MEDIUM]: { aspectRatio: 2.2, configImage: imageButtonMedium },
    [ImageSizeType.LARGE]: { aspectRatio: 1.6, configImage: imageButtonLarge },
  },
  [StorefrontComponentType.IMAGE_TEXT_CAROUSEL]: {
    aspectRatio: 0.79,
    configImage: imageTextCarouselConfig,
  },
  [StorefrontComponentType.BRAND_INFO]: {
    aspectRatio: 1.9,
    configImage: brandInfoConfig,
  },
};

export const componentAspectRatio = (
  componentType: StorefrontComponentType,
  imageSize: ImageSizeType | null,
  Android?: boolean,
  imageIndex?: number,
  noOfImages?: number,
): { aspectRatio: number; configImage: ConfigImageType } => {
  // Special case for IMAGE_CAROUSEL
  if (componentType === StorefrontComponentType.IMAGE_CAROUSEL) {
    return Android ? { aspectRatio: 0.8, configImage: androidImageCarouselConfig } : { aspectRatio: 2.6, configImage: webImageCarouselConfig };
  }

  // Special case for IMAGES_GRID
  if (componentType === StorefrontComponentType.IMAGES_GRID) {
    return imageIndex === 0 && noOfImages === 3
      ? { aspectRatio: 2.09, configImage: type1_ImageGridConfig }
      : { aspectRatio: 1, configImage: type2_ImageGridConfig };
  }

  // Handle standard component aspect ratios
  const aspectRatio = componentAspectRatios[componentType];

  // Handle undefined aspect ratio for component type
  if (!aspectRatio) {
    throw new Error(`Aspect ratio not defined for component type: ${componentType}`);
  }

  // If aspectRatio is a single object or imageSize is null, return the single aspect ratio
  if ("aspectRatio" in aspectRatio || imageSize === null) {
    return "aspectRatio" in aspectRatio
      ? { aspectRatio: aspectRatio.aspectRatio, configImage: aspectRatio.configImage }
      : { aspectRatio: 1, configImage: "" };
  }

  // At this point, aspectRatio is a Record<ImageSizeType, number> and imageSize is not null
  const sizeSpecificRatio = aspectRatio[imageSize];
  if (sizeSpecificRatio === undefined) {
    throw new Error(`Aspect ratio not defined for component type: ${componentType} with image size: ${imageSize}`);
  }

  return sizeSpecificRatio;
};
