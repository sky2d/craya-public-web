import { StorefrontComponent, StorefrontComponentType, UploadedFile } from "components/src/interfaces";

export const validateStorefrontComponent = (storefrontComponent: StorefrontComponent): string | null => {
  const { type, data } = storefrontComponent;

  if (type === StorefrontComponentType.BRAND_IMAGE) {
    if (data.images.length === 0) return "Add an image";
    if (data.texts[0] === "") return "Add a button text";
  }
  if (type === StorefrontComponentType.BRAND_INFO) {
    if (data.images.length === 0) return "Add an image";
    if (data.texts[0] === "") return "Add a button text";
  }

  if (type === StorefrontComponentType.CATEGORY_IMAGES) {
    if (data.images.length < 3) return "Add at least 3 categories";
    if (data.images.length > data.texts.length) return "Category name missing";
    if (data.images.length < data.texts.length) return "Category image missing";
  }

  if (type === StorefrontComponentType.COUPONS && data.texts.length < 3) {
    return "Add at least 3 coupons";
  }

  if (type === StorefrontComponentType.HEADING_TEXT && data.texts[0] === "") {
    return "Add a heading text";
  }

  if (type === StorefrontComponentType.IMAGE_BUTTON) {
    if (data.images.length === 0) return "Add an image";
    if (data.texts[0] === "") return "Add a button text";
  }

  if (type === StorefrontComponentType.IMAGE_CAROUSEL) {
    if (data.imageCarouselImages.android.length === 0) {
      return "Add at least one image";
    }
    if (data.imageCarouselImages.android.length !== data.imageCarouselImages.web.length) {
      return "Add images for both android and web";
    }
    for (const image of data.images) {
      if (!image.fileUrl || image.fileUrl.trim() === "") {
        return "Please add all the images.";
      }
    }
  }

  if (type === StorefrontComponentType.IMAGES_GRID) {
    const emptyImages = data.images.some((image: UploadedFile) => {
      return image.fileUrl === "";
    });

    if (emptyImages) {
      return "Add valid images.";
    }

    if (data.images.length > data.texts.length) {
      return "Add title for each uploaded image.";
    }
    if (data.images.length < data.texts.length) {
      return "Upload an image for each title.";
    }

    for (const text of data.texts) {
      if (!text || text.trim() === "") {
        return "Ensure all text fields are filled.";
      }
    }
  }

  if (type === StorefrontComponentType.IMAGE_TEXT_CAROUSEL) {
    if (data.images.length < 3) return "Add at least 3 images";
    if (data.images.length > data.texts.length) {
      return "Add text for each uploaded image.";
    }
    if (data.images.length < data.texts.length) {
      return "Upload an image for each text field.";
    }
  }

  if (type === StorefrontComponentType.TEXT_CAROUSEL) {
    if (data.texts.length < 3 || data.texts.some(text => text.trim() === "")) {
      return "Add a text field for each item";
    }
  }

  return null;
};
