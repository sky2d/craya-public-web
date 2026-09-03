export const PRODUCT_SKU_SIZES = ["S", "M", "L", "XL", "XXL", "FS"];
export const SIZE_PROFILE_LABELS = {
  Topwear: "Topwear",
  Bottomwear: "Bottomwear",
  Loungewear_Leggings_Trackpants: "Loungers / Leggings / Trackpants",
  Dresses_Gowns_OnePiece: "Dresses / Gowns / Onepiece",
  Ethnic_Wear: "Ethnic Wear",
  Outerwear: "Outerwear",
  FreeSize_Accessories: "Free-size Accessories",
  Footwear: "Footwear",
  Activewear_Sportswear: "Activewear / Sportswear",
  GenderNeutral_Oversized: "Gender-neutral / Oversized",
  Gloves_Caps: "Gloves & Caps",
};

export type SizeProfileKey = keyof typeof SIZE_PROFILE_LABELS;

export const SIZE_PROFILES: Record<string, (string | number)[]> = {
  Topwear: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  Bottomwear: [24, 26, 28, 30, 32, 34, 36, 38, 40, 42],
  "Loungers / Leggings / Trackpants": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  "Dresses / Gowns / Onepiece": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  "Ethnic Wear": ["FS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  Outerwear: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  "Free-size Accessories": ["FS"],
  Footwear: ["UK3", "UK4", "UK5", "UK6", "UK7", "UK8", "UK9", "UK10", "UK11", "UK12"],
  "Activewear / Sportswear": ["XS", "S", "M", "L", "XL", "XXL"],
  "Gender-neutral / Oversized": ["S", "M", "L", "XL", "XXL", "3XL"],
  "Gloves & Caps": ["S", "M", "L"],
};
