import { randHex } from "@ngneat/falso";

export const validateHexCode = (hexCode: string, productSKUs: { color: string }[]) => {
  const skuColorHexCodes = productSKUs.map(sku => sku.color);

  if (skuColorHexCodes.includes(hexCode)) {
    let randomHexCode;

    do {
      randomHexCode = randHex();
    } while (skuColorHexCodes.includes(randomHexCode));

    return randomHexCode;
  }

  return hexCode;
};
