import { Address, Cart } from "../../interfaces";
import {
  CourierDeliveryInfo,
  DeliveryStatusEnum,
  ExchangeRequest,
  MonthlyPayoutData,
  Order,
  OrdersResponse,
  PaymentStatusEnum,
  PaymentSuccessConfirmation,
} from "../../interfaces/orders";
import { getRequest, postRequest, putRequest } from "./apiRequests";

const createPaymentSuccessPayload = (payment: PaymentSuccessConfirmation) => ({
  paymentStatus: PaymentStatusEnum.Paid,
  pgOrderId: payment.razorpay_order_id,
  pgPaymentId: payment.razorpay_payment_id,
  pgSignature: payment.razorpay_signature,
});

const createPaymentFailedPayload = (orderId: string) => ({
  paymentStatus: PaymentStatusEnum.Failed,
  pgOrderId: orderId,
});

const createExchangePayload = (exchange: ExchangeRequest) => ({
  reason: exchange.returnReason,
  itemsToExchange: exchange.itemsToExchange.map(item => ({
    productSkuId: item.productSkuId,
    qcColor: item.qcColor,
    qcSize: item.qcSize,
    quantity: item.quantity,
    replacingSkuId: item.replacingSkuId,
    replacingSkuName: item.replacingSkuName,
    qcImageUrl: item.qcImageUrl,
    qcBrand: item.qcBrand,
  })),
});

export const getOrders = ({
  token,
  page,
  limit,
  deliveryStatus,
  seller = false,
}: {
  token?: string;
  page?: number;
  limit?: number;
  deliveryStatus?: DeliveryStatusEnum;
  seller?: boolean;
}) => {
  const params: Record<string, string> = {
    page: page?.toString() || "1",
    limit: limit?.toString() || "10",
    seller: seller.toString(),
  };

  if (deliveryStatus) {
    params.deliveryStatus = deliveryStatus;
  }

  return getRequest<OrdersResponse>({
    endpoint: "/orders",
    token,
    params,
  });
};

export const getOrderById = (orderId: string, token?: string, isSeller?: boolean, storeIds?: string) => {
  const params: Record<string, string> = {};

  if (isSeller) {
    params.isSeller = "true";
    if (storeIds) params.storeIds = storeIds;
  }

  return getRequest<Order>({
    endpoint: `/orders/${orderId}`,
    token,
    params,
  });
};

export const createOrder = (cart: Cart, address: Address, paymentMethod: string, totalDeliveryCharge: number) => {
  return postRequest<Order[]>({
    endpoint: "/orders",
    body: { cartId: cart.id, addressId: address.id, paymentMethod, totalDeliveryCharge },
  });
};
export const updatePaymentSuccessOrder = (payment: PaymentSuccessConfirmation) => {
  return putRequest<Order>({
    endpoint: "/orders",
    body: createPaymentSuccessPayload(payment),
  });
};

export const updatePaymentFailedOrder = (orderId: string) => {
  return putRequest<Order>({
    endpoint: "/orders",
    body: createPaymentFailedPayload(orderId),
  });
};

export const checkEstimatedDelivery = (storeId: string, deliveryPostCode: string, weight?: number, cod?: boolean) => {
  return getRequest<CourierDeliveryInfo[]>({
    endpoint: `/orders/serviceability?storeId=${storeId}&delivery_postcode=${deliveryPostCode}&cod=${cod ?? false}&weight=${weight ?? "0.5"}`,
  });
};

export const returnOrder = (orderId: string, reason: string) => {
  return postRequest<ExchangeRequest>({
    endpoint: `/orders/${orderId}/return`,
    body: { reason },
  });
};

export const exchangeOrder = (orderId: string, exchange: ExchangeRequest) => {
  return postRequest<ExchangeRequest>({
    endpoint: `/orders/${orderId}/request-exchange`,
    body: createExchangePayload(exchange),
  });
};

export const printLabel = (orderId: string) => {
  return getRequest<{ labelUrl: string }>({
    endpoint: `/orders/${orderId}/label`,
  });
};

export const printInvoice = (orderId: string) => {
  return getRequest<{ invoiceUrl: string }>({
    endpoint: `/orders/${orderId}/invoice`,
  });
};

export const monthlyPayouts = (token?: string) => {
  return getRequest<MonthlyPayoutData>({
    endpoint: `/orders/payouts`,
    token,
  });
};
