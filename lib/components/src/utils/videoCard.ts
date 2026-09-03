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

export function getAvailableIndices(total: number, observed: number[]): number[] {
  if (observed.length === 0) return [];

  const available = new Set<number>(observed);

  let leftMost = observed[0];
  let rightMost = observed[total - 1];
  let i;

  for (i = 1; i < observed.length; i++) {
    if (observed[i] === observed[i - 1] + 1) {
      rightMost = observed[i];
    } else {
      break;
    }
  }

  if (i != observed.length) {
    leftMost = observed[i];
    rightMost = observed[i - 1];
  }

  available.add((leftMost - 1 + total) % total);
  available.add((rightMost + 1) % total);

  return Array.from(available);
}

export const getCardWidthModalClass = (windowWidth: number, length: number): string => {
  if (windowWidth > 768 && length > 1) {
    return "w-1/2";
  } else if (windowWidth > 430 && length > 1) {
    return "w-3/4";
  } else {
    return "w-full";
  }
};
