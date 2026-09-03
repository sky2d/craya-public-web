import { Store, StoreError } from "components/src/interfaces";
import { isValidHexColor } from "../generic.validator";

const validateName = (store: Store) => {
  if (!store?.name) {
    return "Store name is required";
  }
};
const validateLogo = (store: Store) => {
  if (!store?.logo) {
    return "Store logo is required";
  }
};

const validateAddress = (store: Store) => {
  if (!store?.address) return "Both state and city are required";

  const parts = store.address.split(",").map(p => p.trim());

  if (parts.length < 2 || !parts[0] || !parts[1]) {
    return "Both state and city are required";
  }
};

const validatePrimaryColor = (store: Store) => {
  if (!store.primaryColor) return "Primary color is required";
  else if (!isValidHexColor(store.primaryColor)) return "Primary color must be a valid hex code";
};

const validateSeoTags = (store: Store) => {
  if (!store.storeTags) return "Tags are required";
  if (store.storeTags.length < 3) {
    return "Add at least 3 tags";
  } else if (store.storeTags.length > 8) {
    return "You can add a maximum of 8 tags";
  }
};

const validateDescription = (store: Store) => {
  if (!store.description) return "Description is required";
  if (store.description.length >= 160) return "Description is to large";
};

const hasStoreError = (storeError: StoreError) => {
  return Object.values(storeError)
    .map(value => !!value)
    .includes(true);
};

export const validateStoreFields = (store: Store) => {
  const storeError: StoreError = {
    name: validateName(store),
    address: validateAddress(store),
    primaryColor: validatePrimaryColor(store),
    description: validateDescription(store),
    logo: validateLogo(store),
    storeTags: validateSeoTags(store),
  };
  if (hasStoreError(storeError)) return storeError;
  return null;
};
