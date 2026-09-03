import { Address } from "./address";
import { UploadedFile } from "./files";
import { SocialContacts } from "./store";

export enum osType {
  ANDROID = "android",
  IOS = "ios",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

export enum loginMethod {
  GOOGLE = "GOOGLE",
  PHONE = "PHONE",
}

export enum PaymentType {
  BANK = "BANK",
  UPI = "UPI",
}

export interface BankPayment {
  paymentType: PaymentType;
  bankName?: string;
  bankAccountHolder?: string;
  bankAccountNumber?: number;
  bankIfsc?: string;
  upi?: string;
}

export interface BankError {
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  upi?: string;
}

export enum PopoverPlacement {
  TopLeft = "topLeft",
  Top = "top",
  TopRight = "topRight",
  BottomLeft = "bottomLeft",
  Bottom = "bottom",
  BottomRight = "bottomRight",
  LeftTop = "leftTop",
  Left = "left",
  LeftBottom = "leftBottom",
  RightTop = "rightTop",
  Right = "right",
  RightBottom = "rightBottom",
}

export interface Device {
  id: string;
  userId: string;
  token: string;
  os: osType; // You can restrict this further if needed
  lastUsed: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface UserProfile {
  id: string;
  email: string | null;
  isLoggedIn: boolean;
  loginMethod: loginMethod | null;
  name: string | null;
  sellerName: string | null;
  phone: string | null;
  dob: string | null;
  gender: string | null;
  image: UploadedFile | null;
  devices?: Device[];
  payment?: BankPayment;
}

export interface User {
  id?: string;
  email: string;
  phone: string;
  name: string;
  sellerName: string;
  gender: Gender;
  dob: string;
  image?: UploadedFile;
  loginMethod: string;
  socials?: SocialContacts;
  devices?: Device[];
  addresses?: Address[];
}

export interface UserError {
  email?: string;
  phone?: string;
  name?: string;
  sellerName?: string;
  gender?: string;
  dob?: string;
  image?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormError {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}
