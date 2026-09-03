import { User } from "@ngneat/falso";
import { CartItem } from "./cart";
import { Store } from "./store";

export enum CouponStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum CouponType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
  FREE_DELIVERY = "FREE_DELIVERY",
}
export enum CouponVisibility {
  VISIBLE = "VISIBLE",
  HIDDEN = "HIDDEN",
}
export enum CouponAccessibility {
  ALL_CUSTOMERS = "ALL_CUSTOMERS",
  REPEATED_CUSTOMERS = "REPEATED_CUSTOMERS",
  NEW_CUSTOMERS = "NEW_CUSTOMERS",
  ABANDONMENT_CART = "ABANDONMENT_CART",
  CUSTOMER_FOLLOWING_STORE = "CUSTOMER_FOLLOWING_STORE",
}

export interface Coupon {
  byCraya?: boolean;
  id?: string;
  title: string;
  status: CouponStatus;
  type: CouponType;
  visibility: CouponVisibility;
  accessibleFor: CouponAccessibility;
  description: string;
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  storeId: string;
  store?: Store;
  isFake: boolean;
  expiryDate: string;
  freeDeliveryMinimumValue?: number;
  storefrontComponentDataId?: string;
}

export interface CouponError {
  title?: string;
  description?: string;
  type?: string;
  visibility?: string;
  accessibleFor?: string;
  discountValue?: string;
  minPurchase?: string;
  maxDiscount?: string;
}

export interface UpdateCoupon extends Partial<Coupon> {}

export interface CouponResponse {
  id: string;
  amount: number;
  originalAmount: number;
  appliedCoupons: Coupon[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
  user: User;
  couponDiscount: number;
  appliedCoupon: Coupon;
  storefrontComponentDataId: string;
}

export interface CartCouponResponse {
  storeId: string;
  couponId: string;
  couponCode: string;
  discountAmount: number;
}

export type CouponsData = Record<string, Coupon[]>;
