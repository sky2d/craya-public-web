import { StorefrontComponentType } from "components/src/interfaces";

export const componentTypeCheck = (componentType: StorefrontComponentType) => {
  const isRequiredType = [
    StorefrontComponentType.SHOPPABLE_VIDEO_FEED,
    StorefrontComponentType.SHOPPABLE_CAROUSEL,
    StorefrontComponentType.COUPONS,
  ].includes(componentType);
  if (isRequiredType) {
    return true;
  }
  return false;
};
