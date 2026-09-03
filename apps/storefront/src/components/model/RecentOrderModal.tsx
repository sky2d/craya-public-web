"use client";

import ReviewRating from "@/assets/icons/ReviewRating.svg";
import YourReview from "@/assets/icons/YourReviews.svg";
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
import { WhiteBackgroundWrapper } from "../wrapper/WhiteBackgroundWrapper";

interface RecentOrderProps {
  isOpen: boolean;
  onClose: () => void;
  handlerFunction?: StorefrontHandlerFunction;
  orders: Order[];
}

export const RecentOrderModal: FC<RecentOrderProps> = ({ isOpen, onClose, orders, handlerFunction }) => {
  const route = useRouter();

  const handleReviewClick = () => {
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
      className="max-h-dvh overflow-y-auto rounded-xl"
      padding="0"
      borderRadius="12px"
    >
      <div className="flex max-h-dvh flex-col items-stretch rounded-xl sm:flex-row">
        <div className="relative order-2 flex w-full flex-grow flex-col items-stretch justify-center bg-brand-color2 p-2 sm:order-1 sm:w-1/2 sm:bg-white-light4">
          <p className="text-center text-3xl font-bold text-brand-color1 sm:my-4">Your Recent Order</p>
          <div className="flex-grow">
            {orders.slice(0, 3).map((order, orderIndex) => {
              const matchingItems = order.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
              return matchingItems.map((item, itemIndex) => (
                <div key={`${orderIndex}-${itemIndex}`} className="flex w-full items-center justify-center p-1">
                  <ModalProductCard
                    cartItem={item}
                    onProductClick={() =>
                      handlerFunction?.(StorefrontActions.PRODUCT_PRESS, createStorefrontData({ products: [item.product], store: item.store }))
                    }
                  />
                </div>
              ));
            })}
          </div>

          <WhiteBackgroundWrapper className="relative my-4 hidden rounded-[13px] bg-white-light4 p-6 text-center sm:block">
            <p className="absolute left-[46%] top-[-20px] text-4xl">😆</p>
            <p className="font-normal text-brand-color1">“Your feedback helps small brands grow while helping other customers choose/decide.”</p>
          </WhiteBackgroundWrapper>
          <div className="mx-auto my-2 w-full min-w-[220px] max-w-[50%] px-4">
            <Button2
              label="Add Review Now"
              buttonSize="lg"
              handleClick={handleReviewClick}
              type={ButtonType.PRIMARY}
              // background="#7C54EA"
              className="bg-brand-color1"
            />
          </div>
        </div>

        {/* Right: Reminder and CTA */}
        <div className="relative order-1 flex w-full flex-grow flex-col items-stretch justify-center bg-brand-color1 sm:order-2 sm:w-1/2">
          <div className="flex flex-row items-center justify-center py-4 pl-2 sm:flex-col sm:py-2">
            <div className="h-full w-full sm:px-8 sm:py-2">
              <h2 className="my-1 text-2xl font-bold text-brand-color2 sm:text-[4vw]">Loved your Purchase?</h2>
              <p className="text-xxl font-bold leading-tight text-white-light4 sm:text-[2vw]">let us know.....</p>
            </div>

            <Image
              src={ReviewRating}
              draggable={false}
              alt="Model with glasses"
              width={150}
              height={150}
              className="left-0 h-full w-1/2 pl-8 sm:w-full"
            />
          </div>

          <Image
            src={YourReview}
            alt="Model with glasses"
            draggable={false}
            width={150}
            height={150}
            className="left-0 hidden aspect-[1/0.3] h-full w-[80px] sm:block sm:w-full"
          />
        </div>
      </div>
    </BaseModal>
  );
};
