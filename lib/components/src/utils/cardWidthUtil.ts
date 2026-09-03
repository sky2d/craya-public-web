export const getCardWidthClass = (windowWidth: number, length: number): string => {
  if (windowWidth > 1200 && length > 1) {
    if (length > 5) return "w-1/5";
    if (length === 5) return "w-1/3";
    if (length >= 2) return "w-1/2";
    return "w-3/4";
  } else if (windowWidth > 768 && length > 1) {
    if (length >= 5) return "w-1/3";
    if (length >= 2) return "w-1/2";
    return "w-full";
  } else if (windowWidth > 430 && length > 2) {
    if (length > 4) return "w-1/3";
    if (length >= 2) return "w-1/2";
    return "w-3/4";
  } else if (windowWidth <= 430) {
    return "w-1/2";
  } else if (length === 1) {
    return "w-full";
  } else {
    return "w-1/2";
  }
};

export const getCardWidthModalClass = (windowWidth: number, length: number): string => {
  if (windowWidth > 768 && length > 1) {
    return "w-1/2";
  } else if (windowWidth > 430 && length > 1) {
    return "w-3/4";
  } else {
    return "w-full";
  }
};
