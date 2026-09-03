"use client";

import { useCartContext } from "@/provider/CartProvider";
import PaymentFailureIcon from "components/src/icons/iconFiles/PaymentFailureIcon.svg";
import PaymentSuccessIcon from "components/src/icons/iconFiles/PaymentSuccessIcon.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { PaymentStatusEnum } from "components/src/interfaces/orders";
import { PageHeader } from "components/src/major/PageHeader";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import React, { useEffect } from "react";

interface PaymentStatusProps {
  status: PaymentStatusEnum;
  paymentMethod?: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, paymentMethod }) => {
  const { cart, addToCart } = useCartContext();
  const isSuccess = status === PaymentStatusEnum.Paid || status === PaymentStatusEnum.Cod;

  useEffect(() => {
    if (isSuccess && cart) {
      addToCart({
        ...cart,
        cartItems: undefined,
        id: cart.id,
        amount: cart.amount ?? null,
        originalAmount: cart.originalAmount ?? null,
        appliedCoupons: cart.appliedCoupons ?? null,
        userId: cart.userId,
      });
    }
  }, [isSuccess, cart]);

  return (
    <>
      <PageHeader title="Payment" backgroundColor="#B2B7F1" />
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="my-2 w-full p-4">
          <div className="mx-16 flex flex-col items-center justify-center">
            <Image
              src={isSuccess ? PaymentSuccessIcon : PaymentFailureIcon}
              alt={isSuccess ? "Payment Success" : "Payment Failed"}
              width={100}
              draggable={false}
              priority
              height={100}
            />
            <p className="my-4 text-center heading-2">{isSuccess ? "Thank You for shopping with Us!" : "Payment Failed"}</p>
            {isSuccess ? (
              <>
                <span className="block text-center body-normal-semibold">Estimated Delivery Date</span>
                <span className="block text-center body-sm">
                  {/* {productDeliveryInfo ? getFutureDate(parseInt(productDeliveryInfo.estimated_delivery_days)) : "N/A"} */}
                  N/A
                </span>
                <span className="block text-center body-normal-semibold">Payment Method</span>
                <span className="block text-center body-sm">{paymentMethod}</span>
              </>
            ) : (
              <span className="block text-center body-sm">Sorry! The transaction failed. Please check and try it again.</span>
            )}
          </div>
        </div>

        <div className="my-4 flex w-full justify-center p-2">
          {isSuccess ? (
            <span className="mx-4 text-center body-sm">All the order details and tracking ID have been sent to your Mail/SMS.</span>
          ) : (
            <Button2 type={ButtonType.PRIMARY} label="Retry" />
          )}
        </div>
      </div>
    </>
  );
};
