export interface Address {
  id?: string;
  flatNumber: string;
  area: string;
  landMark: string;
  town: string;
  state: string;
  pinCode: string;
  phoneNumber: string;
  isSelected: boolean;
  customerName: string;
}

export interface AddressError extends Partial<Address> {
  customerName?: string;
  area?: string;
  flatNumber?: string;
  landMark?: string;
  town?: string;
  state?: string;
  pinCode?: string;
  phoneNumber?: string;
}

export interface AddressError extends Partial<Address> {}
