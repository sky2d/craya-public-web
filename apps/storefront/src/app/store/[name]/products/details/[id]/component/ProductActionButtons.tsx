"use client";

import { AddedToCartModal } from "@/components/model/AddedToCartModel";
import { useCartContext } from "@/provider/CartProvider";
import { useModalContext } from "@/provider/ModalProvider";
import { addOrUpdateCartItem } from "@/utils/cart";
import { debounce } from "@/utils/generic";
import { ButtonType, IconPosition } from "components/src/interfaces/Buttons";
import { Button, Button2, showPopup } from "components/src/minor";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface ProductActionButtonsProps {
  primaryColor: string;
  disabled: boolean;
  isOutOfStock?: boolean;
  isLiked?: boolean;
  onLike?: () => void;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({ onLike, primaryColor, disabled, isOutOfStock, isLiked }) => {
  const router = useRouter();
  const { cart, addToCart, selectedCartItem, setCartLoading } = useCartContext();
  const { openModal } = useModalContext();
  const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState<boolean>(false);
  const session = useSessionContext();
  const isLoggedIn = !session.loading && session.doesSessionExist;

  const handleCartAction = useCallback(
    async (redirectToCart: boolean = false) => {
      if (!selectedCartItem) return;

      setCartLoading(true);
      try {
        const updatedCart = await addOrUpdateCartItem(cart, selectedCartItem);
        addToCart(updatedCart);

        if (redirectToCart) {
          router.push("/cart");
        } else {
          setIsAddedToCartModalOpen(true);
        }
      } catch (err: unknown) {
        showPopup("error", err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setCartLoading(false);
      }
    },
    [cart, selectedCartItem, addToCart, setCartLoading, router],
  );

  const debouncedAddToCart = useMemo(() => debounce(() => handleCartAction(false), 500), [handleCartAction]);

  const debouncedBuyNow = useMemo(() => debounce(() => handleCartAction(true), 500), [handleCartAction]);

  return (
    <>
      <div className="mt-6 space-y-2">
        {isLoggedIn ? (
          <>
            <div className="grid w-full grid-cols-1 gap-2 sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
              <Button2
                label="Add to Cart"
                background={primaryColor}
                handleClick={debouncedAddToCart}
                disabled={disabled || isOutOfStock}
                type={ButtonType.PRIMARY}
                iconsPosition={IconPosition.LEFT}
                icon={<BsCart2 className="h-5 w-5" />}
                buttonSize="lg"
              />
              <Button2
                label="Wishlist"
                background={primaryColor}
                handleClick={onLike}
                type={ButtonType.PRIMARY}
                iconsPosition={IconPosition.LEFT}
                icon={isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                buttonSize="lg"
              />
            </div>
            <Button2
              label={isOutOfStock ? "😔 Sorry You Are a Little Late" : "Buy Now"}
              buttonSize="lg"
              background={primaryColor}
              handleClick={debouncedBuyNow}
              disabled={disabled || isOutOfStock}
              type={ButtonType.PRIMARY}
            />
          </>
        ) : (
          <Button
            label="Login to Continue"
            className="w-full rounded-lg text-white-light4 body-md hover:bg-black-dark4 hover:shadow-lg"
            custom={true}
            handelClick={() => {
              openModal("login");
            }}
            secondary={true}
            backgroundColor={primaryColor}
          />
        )}
      </div>
      <AddedToCartModal
        isOpen={isAddedToCartModalOpen}
        onClose={() => {
          setIsAddedToCartModalOpen(false);
        }}
      />
    </>
  );
};

export default ProductActionButtons;
