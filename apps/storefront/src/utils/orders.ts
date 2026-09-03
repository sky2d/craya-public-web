import { DeliveryStatusEnum, Order, PaymentStatusEnum } from "components/src/interfaces/orders";

import { Cart, CartItem } from "components/src/interfaces";
import { Coupon } from "components/src/interfaces/Coupon";

export const getAdjustedPrice = (order: Order, item: CartItem, allItemsFromSameStore: CartItem[], index: number): number => {
  const totalAmountAfterDiscount = Math.round(order.amount ?? 0);

  const itemTotalPrices = allItemsFromSameStore.map(i => Math.round((i.product.discountedPrice ?? i.product.price) * 100) * i.quantity);

  const originalPricePaise = itemTotalPrices[index];
  const totalItemPrices = itemTotalPrices.reduce((acc, price) => acc + price, 0);

  let discountForThisItem: number;

  if (index === allItemsFromSameStore.length - 1) {
    const distributedSoFar = itemTotalPrices
      .slice(0, -1)
      .reduce((acc, price) => acc + Math.floor((price / totalItemPrices) * totalAmountAfterDiscount), 0);

    discountForThisItem = totalAmountAfterDiscount - distributedSoFar;
  } else {
    discountForThisItem = Math.floor((originalPricePaise / totalItemPrices) * totalAmountAfterDiscount);
  }

  const adjustedPricePaise = discountForThisItem;

  return adjustedPricePaise / 100; // convert paise to rupees
};

// Helper: Get products applicable for current coupon
export const getRelevantProducts = (cart: Cart, appliedCoupon: Coupon) => {
  return appliedCoupon?.byCraya ? (cart.cartItems ?? []) : (cart.cartItems ?? []).filter(item => item.store.id === appliedCoupon?.storeId);
};

// Helper: Calculate total of coupon-relevant products
export const getCalculatedTotal = (cart: Cart, appliedCoupon: Coupon) => {
  const products = getRelevantProducts(cart, appliedCoupon);
  return products.reduce((acc, curr) => acc + (curr.product.discountedPrice ?? curr.product.price) * curr.quantity, 0);
};

export const validateTrackAccess = (order: Order): boolean => {
  return order.paymentStatus !== PaymentStatusEnum.Failed && order.deliveryStatus !== DeliveryStatusEnum.DELIVERED;
};

export const validateReviewAccess = (order: Order): boolean => {
  return order.deliveryStatus === DeliveryStatusEnum.DELIVERED;
};

export const validateReturnRefundAccess = (order: Order): boolean => {
  return order.paymentStatus === PaymentStatusEnum.Paid && order.deliveryStatus === DeliveryStatusEnum.DELIVERED;
};

export const calculateProgress = (shipmentTrackActivities: Array<{ status: string }>): number => {
  // Total number of activities
  const totalActivities = shipmentTrackActivities.length;

  const completedActivities = shipmentTrackActivities.filter(item => item.status === "DELIVERED").length;

  const progressPercentage = totalActivities === 0 ? 0 : (completedActivities / totalActivities) * 100;

  return progressPercentage;
};
