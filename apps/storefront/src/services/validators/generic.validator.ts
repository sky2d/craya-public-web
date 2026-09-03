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

export const validateString = (name: string, string?: string) => {
  if (typeof string === "string" && !string.trim()) {
    return `${name} is required`;
  }
};

export const validateNumber = (name: string, number?: number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return `${name} is required`;
  }
  if (number <= 0) {
    return `${name} must be greater than zero`;
  }
};
