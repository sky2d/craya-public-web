import { useEffect, useState } from "react";
import { StorefrontComponentData } from "../interfaces";

export const useCount = (minValue: number, data: StorefrontComponentData) => {
  const [count, setCount] = useState(() => {
    if (data.images?.length >= minValue) {
      return data.images?.length;
    } else return minValue;
  });
  useEffect(() => {
    const imagesLength = data.images?.length;
    if (!imagesLength || imagesLength < minValue) return;
    if (imagesLength > minValue) setCount(imagesLength);
  }, [data.images?.length]);

  return [count, setCount] as const;
};
