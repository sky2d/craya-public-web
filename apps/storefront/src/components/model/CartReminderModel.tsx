"use client";

import { CartItem, StorefrontActions, StorefrontHandlerFunction } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { BaseModal } from "components/src/major/BaseModal";
import { Button2 } from "components/src/minor";
import { createStorefrontData } from "components/src/services/storefront";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ModalProductCard } from "../product/ModalProductCard";

interface CartReminderModelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  handlerFunction?: StorefrontHandlerFunction;
}

export const CartReminderModel: FC<CartReminderModelProps> = ({ isOpen, onClose, cartItems, handlerFunction }) => {
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
        sm: "80%",
        md: "60%",
        lg: "60%",
        xl: "60%",
        xxl: "55%",
      }}
      className="overflow-y-auto rounded-xl"
      padding="0"
      borderRadius="12px"
    >
      <div className="flex max-h-screen flex-col items-stretch rounded-xl sm:flex-row">
        <div className="relative flex w-full flex-grow flex-col justify-center bg-brand-color2 px-8 py-4 sm:w-1/2">
          <p className="text-center text-3xl font-bold text-brand-color1">Shopping Cart</p>
          <div className="flex-grow">
            {cartItems.map((item, index) => (
              <div key={index} className="my-1 w-full items-center justify-center py-2">
                <ModalProductCard
                  cartItem={item}
                  onProductClick={() =>
                    handlerFunction?.(StorefrontActions.PRODUCT_PRESS, createStorefrontData({ products: [item.product], store: item.store }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="mx-auto mt-auto px-4 pt-6">
            <Button2 label="Checkout" type={ButtonType.PRIMARY} buttonSize="lg" handleClick={checkoutClick}></Button2>
          </div>
          {/* </div> */}
        </div>

        {/* Right: Reminder and CTA */}
        <div className="relative flex w-full flex-grow flex-col items-stretch justify-start p-2 sm:w-1/2">
          <h2 className="hidden font-bold leading-tight text-brand-color2 sm:block sm:text-[4vw]">Forgetting Something?</h2>
          <p className="text-center text-xl font-extrabold leading-snug text-brand-color1 sm:mt-8 sm:text-start sm:text-[3vw]">
            Your cart is waiting!
          </p>
          <p className="text-center text-sm font-normal text-brand-color1 sm:text-start sm:text-[2vw]">
            grab that {cartItems[0]?.product?.productDetails?.[0]?.value ?? ""} before it’s gone
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
