import { Product, Wishlist } from "components/src/interfaces";

export const convertDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export function getFutureDate(daysToAdd: number, baseDate: Date = new Date()): string {
  const resultDate = new Date(baseDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  return resultDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isProductInWishlist(product: Product, wishlist: Wishlist): boolean {
  if (!product.id) return false;
  return wishlist.wishlistItems.some(item => item.product?.id === product.id);
}
