import { Address, ApiReturn, CompletionResult, Loop, Store, StoreNameExistStatus, UpdateStore, UserExistStatus } from "../../interfaces";
import { getRequest, postRequest, putRequest } from "./apiRequests";

export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue;
}

export const createStorePayload = (store: Partial<Store>): JsonObject => {
  const payload: JsonObject = {};

  if (store.name) payload.name = store.name;
  if (store.address) payload.address = store.address;
  if (store.primaryColor) payload.primaryColor = store.primaryColor;
  if (store.description) payload.description = store.description;
  if (store.logoId) payload.logoId = store.logoId;
  if (store.isOnboarding !== undefined) payload.isOnboarding = store.isOnboarding;
  if (store.storeTags && store.storeTags.length > 0) payload.storeTags = store.storeTags;
  if (store.sizeChartImageIds && store.sizeChartImageIds.length > 0) payload.sizeChartImageIds = store.sizeChartImageIds;

  if (store.socials) {
    payload.socials = Object.fromEntries(Object.entries(store.socials).filter(([v]) => v != null)) as JsonObject;
  }

  return payload;
};

const createPickupAddressPayload = (address: Address) => ({
  flatNumber: address.flatNumber,
  area: address.area,
  landMark: address.landMark,
  town: address.town,
  state: address.state,
  pinCode: address.pinCode,
  phoneNumber: address.phoneNumber,
  customerName: address.customerName,
  isSelected: address.isSelected,
});

export const fetchStores = (accessToken?: string) => {
  return getRequest<Store[]>({
    endpoint: "/stores",
    token: accessToken,
  });
};
export const fetchAllStores = () => {
  return getRequest<Store[]>({
    endpoint: "/stores/all",
  });
};

export const fetchStore = (storeId: string) => {
  return getRequest<Store>({
    endpoint: `/stores/${storeId}`,
  });
};

export const updateStore = (updatedStore: UpdateStore) => {
  return putRequest<Store>({
    endpoint: `/stores/${updatedStore.id}`,
    body: createStorePayload(updatedStore),
  });
};

export const createStore = async (store: Store): Promise<ApiReturn<Store>> => {
  return postRequest<Store>({
    endpoint: "/stores",
    body: createStorePayload(store),
  });
};

export const StoreExist = (storeName: string) => {
  return getRequest<StoreNameExistStatus>({
    endpoint: `/stores/checkStoreNameExists?name=${storeName}`,
  });
};

export const checkUserExist = (email?: string, phoneNumber?: string) => {
  let query = "";

  if (email) {
    query = `?email=${encodeURIComponent(email)}`;
  } else if (phoneNumber) {
    const newPhoneNumber = "+91" + phoneNumber;
    query = `?phone=${encodeURIComponent(newPhoneNumber)}`;
  }

  return getRequest<UserExistStatus>({
    endpoint: `/stores/checkUserExists${query}`,
  });
};

export const getStoreStatus = (storeId: string) => {
  return getRequest<CompletionResult>({
    endpoint: `/stores/completion/${storeId}`,
  });
};

export const getLoops = (storeId: string) => {
  return getRequest<Loop[]>({
    endpoint: "/loops",
    params: { storeId },
  });
};

export const createPickupAddress = (storeId: string, address: Address) => {
  return postRequest<Address[]>({
    endpoint: `/stores/${storeId}/pickup-address`,
    body: createPickupAddressPayload(address),
  });
};

export const updatePickupAddress = (storeId: string, addressId: string, address: Address) => {
  return putRequest<Address[]>({
    endpoint: `/stores/${storeId}/pickup-address/${addressId}`,
    body: createPickupAddressPayload(address),
  });
};
