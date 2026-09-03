import { Cart } from "components/src/interfaces";
import { DeliveryStatusEnum, Order, PaymentStatusEnum } from "components/src/interfaces/orders";
import { showPopup } from "components/src/minor";
import { checkEstimatedDelivery } from "components/src/services/api/orders";

export const calculateTotalDeliveryCharges = async (cart: Cart, pinCode: string): Promise<number> => {
  if (!cart?.cartItems || cart.cartItems.length === 0) return 0;

  const uniqueStoreIds = Array.from(new Set(cart.cartItems.map(item => item.store.id)));

  let totalDeliveryCharge = 0;
  const errorMessages: string[] = [];

  for (const storeId of uniqueStoreIds) {
    if (!storeId || !pinCode) {
      errorMessages.push(`Invalid storeId or pinCode (storeId=${storeId})`);
      continue;
    }

    try {
      const { data } = await checkEstimatedDelivery(storeId, pinCode);

      const found = data?.find(item => item.estimated_delivery_days);

      totalDeliveryCharge += found?.rate ?? 0;
    } catch (error) {
      errorMessages.push(`Failed to get delivery for store ${storeId}`);
    }
  }

  if (errorMessages.length > 0) {
    showPopup("error", errorMessages.join("\n"));
  }

  return totalDeliveryCharge;
};

export async function getRecentAndTrackableOrders(
  orders: Order[],
  userId?: string,
  checkIfUserReviewedProduct?: (productIds: string[], userId: string) => Promise<Record<string, boolean>>,
) {
  if (!orders.length || !userId || !checkIfUserReviewedProduct) {
    return { recentOrders: [], trackableOrders: [] };
  }

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentOrders: Order[] = [];

  for (const order of orders) {
    if (order.deliveryStatus !== DeliveryStatusEnum.DELIVERED || !order.createdAt || new Date(order.createdAt) > twentyFourHoursAgo) {
      continue;
    }

    const cartItems = order.cart?.cartItems || [];
    const productIds = cartItems.map(item => item.product?.id).filter(Boolean) as string[];

    if (!productIds.length) continue;

    const reviewMap = await checkIfUserReviewedProduct(productIds, userId);

    const hasUnreviewed = productIds.some(productId => !reviewMap[productId]);

    if (hasUnreviewed) {
      recentOrders.push(order);
    }
  }

  const trackableOrders = orders.filter(
    order =>
      (order?.cart?.cartItems?.length ?? 0) > 0 &&
      order.paymentStatus !== PaymentStatusEnum.Failed &&
      order.deliveryStatus !== DeliveryStatusEnum.DELIVERED &&
      order.createdAt &&
      new Date(order.createdAt) <= twentyFourHoursAgo,
  );

  return { recentOrders, trackableOrders };
}
