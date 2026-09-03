import { ExchangeError, ExchangeItem, ExchangeItemError, ExchangeRequest } from "components/src/interfaces/orders";
import { validateString } from "./generic.validator";

// Utility: Check if an item has any validation errors
const hasItemError = (error: ExchangeItemError): boolean => Object.values(error).some(Boolean);

// Validate a single ExchangeItem
const validateExchangeItem = (item: ExchangeItem): ExchangeItemError => {
  return {
    productSkuId: validateString("Product SKU ID", item?.productSkuId),
    quantity: validateString("Quantity", item?.quantity?.toString() ?? ""),
    replacingSkuId: validateString("Replacing SKU ID", item?.replacingSkuId),
    replacingSkuName: validateString("Replacing SKU Name", item?.replacingSkuName),
    qcImageUrl: validateString("QC Image URL", item?.qcImageUrl),
    qcBrand: validateString("QC Brand", item?.qcBrand),
    qcColor: validateString("QC Color", item?.qcColor),
    qcSize: validateString("QC Size", item?.qcSize),
  };
};

// Validate the full ExchangeRequest
export const validateExchangeRequest = (exchange: ExchangeRequest): ExchangeError | null => {
  const errors: ExchangeError = {};

  // Validate return reason
  const returnReasonError = validateString("Return Reason", exchange?.returnReason);
  if (returnReasonError) {
    errors.returnReason = returnReasonError;
  }

  // Validate itemsToExchange
  if (!Array.isArray(exchange.itemsToExchange) || exchange.itemsToExchange.length === 0) {
    errors.itemsToExchange = { general: "At least one item must be provided for exchange." };
  } else {
    const itemErrors = exchange.itemsToExchange.map(validateExchangeItem);
    const hasAnyItemError = itemErrors.some(hasItemError);

    if (hasAnyItemError) {
      errors.itemsToExchange = {
        ...errors.itemsToExchange,
        itemErrors,
      };
    }
  }

  // If no errors found, return null
  return Object.keys(errors).length > 0 ? errors : null;
};
