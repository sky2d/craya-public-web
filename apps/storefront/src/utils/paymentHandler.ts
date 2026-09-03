"use client";

import { getRazorpayOptions } from "@/services/razorpayOptions";
import { Address, Cart, User } from "components/src/interfaces";
import { PaymentMethod, PaymentStatusEnum, PaymentSuccessConfirmation } from "components/src/interfaces/orders";
import { showPopup } from "components/src/minor";
import { createOrder, updatePaymentFailedOrder, updatePaymentSuccessOrder } from "components/src/services/api/orders";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PaymentParams {
  cart: Cart;
  user: User;
  selectedAddress: Address;
  checkoutDeliveryCharge: number;
  couponDiscount: number;
  setCartLoading: (loading: boolean) => void;
  router: AppRouterInstance;
}

export async function handlePayment(paymentMethod: PaymentMethod, params: PaymentParams) {
  const { cart, user, selectedAddress, checkoutDeliveryCharge, couponDiscount, setCartLoading, router } = params;

  if (!window.Razorpay) {
    showPopup("error", "Razorpay SDK failed to load.");
    return;
  }

  if (!cart || !user || !selectedAddress || checkoutDeliveryCharge === undefined) {
    const missingFields = [];
    if (!cart) missingFields.push("Cart");
    if (!user) missingFields.push("User");
    if (!selectedAddress) missingFields.push("Address");
    showPopup("warning", `Missing: ${missingFields.join(", ")}`);
    return;
  }

  setCartLoading(true);

  try {
    const { data, error } = await createOrder(cart, selectedAddress, paymentMethod, checkoutDeliveryCharge * 100);

    if (!data) {
      showPopup("error", `Unable to create Order: ${error}`);
      return;
    }

    const newOrder = data;
    const amount = newOrder.reduce((sum, order) => sum + (order.amount ?? 0), 0) + checkoutDeliveryCharge * 100 - couponDiscount * 100;

    const pgOrderId = newOrder[0].pgOrderId;

    if (paymentMethod === PaymentMethod.COD) {
      router.push(`/cart/payment?status=${encodeURIComponent(PaymentStatusEnum.Cod)}&orderId=${encodeURIComponent(pgOrderId)}`);
      return;
    }

    const handlePaymentFailed = async () => {
      try {
        await updatePaymentFailedOrder(pgOrderId);
      } catch {
        showPopup("error", "Error handling failed payment");
      }
    };

    const handlePaymentSuccess = async (response: PaymentSuccessConfirmation) => {
      setCartLoading(true);
      const { data, error } = await updatePaymentSuccessOrder(response);
      setCartLoading(false);
      if (!data) {
        showPopup("error", `Unable to update Order: ${error}`);
        return;
      }
      router.push(`/cart/payment?status=${encodeURIComponent(PaymentStatusEnum.Paid)}&orderId=${encodeURIComponent(pgOrderId)}`);
    };

    const options = getRazorpayOptions({
      user,
      selectedAddress,
      pgOrderId,
      amount,
      handlePaymentSuccess,
      handlePaymentFailed,
    });

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", handlePaymentFailed);
  } catch (err) {
    showPopup("error", "Unexpected error during payment");
  } finally {
    setCartLoading(false);
  }
}
