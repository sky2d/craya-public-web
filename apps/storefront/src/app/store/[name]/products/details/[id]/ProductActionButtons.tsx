import { ButtonType, IconPosition } from "components/src/interfaces/Buttons";
import { ModalKey } from "components/src/interfaces/modal";
import { Button, Button2 } from "components/src/minor";
import React from "react";
import { BsCart2 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface ProductActionButtonsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onLike?: () => void;
  openModal: (modal: ModalKey) => void;
  primaryColor: string;
  disabled: boolean;
  isLoggedIn: boolean;
  isOutOfStock?: boolean;
  isLiked?: boolean;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({
  isLoggedIn,
  onAddToCart,
  onBuyNow,
  onLike,
  openModal,
  primaryColor,
  disabled,
  isOutOfStock,
  isLiked,
}) => {
  return (
    <div className="mt-6 space-y-2">
      {isLoggedIn ? (
        <>
          <div className="grid w-full grid-cols-1 gap-2 sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            <Button2
              label="Add to Cart"
              background={primaryColor}
              handleClick={onAddToCart}
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
            handleClick={onBuyNow}
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
  );
};

export default ProductActionButtons;
