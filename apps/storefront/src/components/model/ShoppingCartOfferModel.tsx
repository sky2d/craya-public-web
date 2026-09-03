"use client";

import OfferImage from "@/assets/image/Offer.png";
import { CartItem, StorefrontActions, StorefrontHandlerFunction } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Coupon } from "components/src/interfaces/Coupon";
import { BaseModal } from "components/src/major/BaseModal";
import { Button2 } from "components/src/minor";
import { createStorefrontData } from "components/src/services/storefront";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ModalProductCard } from "../product/ModalProductCard";

interface ShoppingCartOfferModelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  handlerFunction?: StorefrontHandlerFunction;
  coupon: Coupon;
}

export const ShoppingCartOfferModel: FC<ShoppingCartOfferModelProps> = ({ isOpen, coupon, onClose, cartItems, handlerFunction }) => {
  const route = useRouter();
  const checkoutClick = () => {
    route.push(`${cartItems[0].store.url}/products/checkout`);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={{
        xs: "90%",
        sm: "100%",
        md: "90%",
        lg: "60%",
        xl: "60%",
        xxl: "50%",
      }}
      className="overflow-y-auto rounded-xl"
      padding="0"
      borderRadius="12px"
    >
      <div className="flex h-full max-h-screen flex-col items-start items-stretch justify-center rounded-xl sm:flex-row">
        <div className="relative flex w-full flex-grow flex-col items-stretch justify-center bg-brand-color2 p-2 sm:w-1/2 sm:bg-white-light4">
          <p className="text-center text-3xl font-bold text-brand-color1 sm:my-4">Shopping Cart</p>
          {cartItems.map((item, index) => (
            <div key={index} className="w-full items-center justify-center py-2">
              <ModalProductCard
                cartItem={item}
                onProductClick={() =>
                  handlerFunction?.(StorefrontActions.PRODUCT_PRESS, createStorefrontData({ products: [item.product], store: item.store }))
                }
              />
            </div>
          ))}
          <div className="mx-auto flex h-full w-1/2 items-end justify-center py-2 md:my-4">
            <Button2 label="Checkout" type={ButtonType.PRIMARY} buttonSize="lg" handleClick={checkoutClick}></Button2>
          </div>
        </div>

        {/* Right: Reminder and CTA */}
        <div className="relative flex h-full w-full flex-grow flex-col items-stretch justify-center bg-brand-color1 sm:w-1/2">
          <div className="hidden h-full w-full p-2 sm:block">
            <h2 className="my-1 hidden text-xl font-semibold text-white-light4 sm:block sm:text-[2vw]">Take Great Offers Home</h2>
            <p className="text-4xl font-bold leading-tight text-yellow-300 sm:text-[4vw]">{coupon.description}</p>
            <p className="my-2 text-2xl font-bold text-yellow-400 sm:text-[2.5vw]">Use Code :{coupon.title}</p>
          </div>
          <div className="flex h-full w-full items-start justify-end pt-2">
            {/* Bottom Image */}
            <Image
              draggable={false}
              src={OfferImage}
              alt="Model with glasses"
              width={150}
              height={150}
              className="left-0 h-full w-[80px] sm:w-full"
            />
            <div className="h-full w-full sm:hidden">
              <p className="w-full text-center text-lg font-bold leading-tight text-yellow-300">{coupon.description}</p>
              <p className="w-full text-center text-3xl font-bold text-yellow-400">Use Code : {coupon.title}</p>
            </div>
            <div className="hidden w-full pr-1 sm:block">
              <Button2 label="Redeem Now" buttonSize="sm" handleClick={checkoutClick} type={ButtonType.PRIMARY} background="#FACF2F" />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
