"use client";

import TrackOrder from "@/assets/icons/TrackOrder.svg";
import { StorefrontActions, StorefrontHandlerFunction } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Order } from "components/src/interfaces/orders";
import { BaseModal } from "components/src/major/BaseModal";
import { Button2 } from "components/src/minor";
import { createStorefrontData } from "components/src/services/storefront";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ModalProductCard } from "../product/ModalProductCard";

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlerFunction?: StorefrontHandlerFunction;
  orders: Order[];
}

export const TrackOrderModal: FC<TrackOrderModalProps> = ({ isOpen, onClose, orders, handlerFunction }) => {
  const route = useRouter();

  const handleTrackClick = () => {
    route.push(`/orders`);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "60%",
        xxl: "50%",
      }}
      className="overflow-y-auto rounded-xl"
      padding="0"
      borderRadius="12px"
    >
      <div className="flex h-full flex-col items-stretch justify-center rounded-xl sm:flex-row">
        {/* Left: Reminder and CTA */}
        <div className="relative flex w-full flex-grow flex-col items-stretch justify-center p-2 sm:w-1/2 sm:bg-white-light4">
          <h2 className="my-1 px-8 py-4 text-4xl font-extrabold text-brand-color1 sm:text-[3vw]">Keep Tracking your Superfast Delivery !!!!!!</h2>

          <div className="flex h-full w-full items-start justify-end">
            <Image src={TrackOrder} alt="Track Product" priority draggable={false} width={150} height={150} className="h-full w-full" />
          </div>
        </div>
        {/* Right: Order Add to Cart */}
        <div className="relative flex w-full flex-grow flex-col items-stretch justify-start bg-brand-color1 p-4 sm:w-1/2">
          <p className="my-4 text-center text-lg font-bold text-white-light4 sm:text-[2vw]">Your Order</p>

          <div className="flex-grow">
            {orders.slice(0, 3).map((order, orderIndex) => {
              const matchingItems = order.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
              return matchingItems.map((item, itemIndex) => (
                <div key={`${orderIndex}-${itemIndex}`} className="my-2 flex items-center justify-center">
                  <ModalProductCard
                    cartItem={item}
                    onProductClick={() =>
                      handlerFunction?.(StorefrontActions.PRODUCT_PRESS, createStorefrontData({ products: [item.product], store: item.store }))
                    }
                  />
                </div>
              ));
            })}
            {/* {orders.map(order => {
              const matchingItems = order.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
              return matchingItems.map((item, index) => {
                const adjustedPrice = getAdjustedPrice(order, item, matchingItems, index);
                return (
                  <div key={`index}`} className="my-2 flex items-center justify-center">
                    <ModalProductCard key={`${order.id}-${index}`} item={item} adjustedPrice={adjustedPrice} order={order} />
                  </div>
                );
              });
            })} */}
          </div>

          <div className="mx-auto mt-auto px-4 pt-6">
            <Button2
              label="Track Now"
              buttonSize="lg"
              handleClick={handleTrackClick}
              type={ButtonType.PRIMARY}
              className="bg-white-light4 !text-brand-color1 hover:!bg-white-light4"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
