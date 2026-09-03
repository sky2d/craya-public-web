export const validateImage = (image: File) => {
  if (!image) {
    return "Image is required";
  }

  const validMimeTypes = ["image/jpeg", "image/png"];
  if (!validMimeTypes.includes(image.type)) {
    return "Invalid image type. Only JPEG, PNG, and GIF are allowed.";
  }

  const maxSizeMB = 5;
  if (image.size > maxSizeMB * 1024 * 1024) {
    return `Image size exceeds ${maxSizeMB} MB.`;
  }
};

export const isValidHexColor = (color: string) => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const trimmedColor = color.trim();
  return hexColorRegex.test(trimmedColor);
};
