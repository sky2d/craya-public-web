import { Address, AddressError } from "components/src/interfaces";

export const validateAddressString = (address: Address, fieldName: keyof Address, extraMessage: string) => {
  const value = address[fieldName];
  if (typeof value === "string" && !value.trim()) {
    return `${extraMessage} is required`;
  }
};

export const validateCustomerName = (address: Address) => {
  if (!address.customerName.trim()) return "Customer Name is required";
};

export const validatePinCode = (address: Address) => {
  if (!/^\d{6}$/.test(address.pinCode)) return "Pin Code must be exactly 6 digits";
};

export const validatePhoneNumber = (address: Address) => {
  if (!/^\d{10}$/.test(address.phoneNumber)) return "Phone Number must be exactly 10 digits";
};

const hasStoreError = (addressError: AddressError) => {
  return Object.values(addressError)
    .map(value => !!value)
    .includes(true);
};

export const validateAddressFields = (address: Address) => {
  const addressError: AddressError = {
    customerName: validateCustomerName(address),
    flatNumber: validateAddressString(address, "flatNumber", "Flat, House no., Building"),
    area: validateAddressString(address, "area", "Area, Street, Sector, Village"),
    landMark: validateAddressString(address, "landMark", "Landmark"),
    state: validateAddressString(address, "state", "State"),
    town: validateAddressString(address, "town", "Town/City"),
    pinCode: validatePinCode(address),
    phoneNumber: validatePhoneNumber(address),
  };
  if (hasStoreError(addressError)) return addressError;
  return null;
};
