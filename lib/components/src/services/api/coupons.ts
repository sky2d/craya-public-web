import { Coupon, CouponsData, UpdateCoupon } from "../../interfaces/Coupon";
import { getRequest, postRequest, putRequest } from "./apiRequests";

const CreateCouponPayload = (coupon: Partial<Coupon>) => ({
  id: coupon.id,
  title: coupon.title,
  description: coupon.description,
  discountValue: coupon.discountValue,
  minPurchase: coupon.minPurchase,
  maxDiscount: coupon.maxDiscount,
  type: coupon.type,
  status: coupon.status,
  visibility: coupon.visibility,
  accessibleFor: coupon.accessibleFor,
  storeId: coupon.storeId,
});

export const getCoupons = (storeId: string, token?: string) => {
  return getRequest<Coupon[]>({
    endpoint: `/coupons?storeId=${storeId}`,
    token: token,
  });
};

export const getCouponsForCart = (cartId: string) => {
  return getRequest<CouponsData>({
    endpoint: `/coupons/cart/${cartId}`,
  });
};

export const validateCoupon = (storeIds: string[], couponName: string) => {
  return postRequest<Coupon>({
    endpoint: "/coupons/validate-for-stores",
    body: {
      storeIds,
      couponName,
    },
  });
};

export const createCoupon = (coupon: Coupon) => {
  return postRequest<Coupon>({
    endpoint: "/coupons",
    body: CreateCouponPayload(coupon),
  });
};

export const getCoupon = (couponId: string, token?: string) => {
  return getRequest<Coupon>({
    endpoint: `/coupons/${couponId}`,
    token: token,
  });
};

export const updateCoupon = (coupon: UpdateCoupon, couponId: string) => {
  return putRequest<Coupon>({
    endpoint: `/coupons/${couponId}`,
    body: CreateCouponPayload(coupon),
  });
};
