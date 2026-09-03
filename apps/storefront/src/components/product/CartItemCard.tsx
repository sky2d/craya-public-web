import { useCartContext } from "@/provider/CartProvider";
import { createDebouncedUpdateCart } from "@/utils/cart";
import OverLay from "components/src/icons/iconFiles/SoldOutOverlays.png";
import { CartItem, ProductStatusEnum } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { deleteCart } from "components/src/services/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartItemCardProps {
  cartItem: CartItem;
}

const QuantityPicker = dynamic(() => import("./QuantityPicker").then(mod => mod.QuantityPicker), { ssr: false });

const CartItemCard: React.FC<CartItemCardProps> = React.memo(({ cartItem }) => {
  const { updateCartItem, removeCartItem } = useCartContext();
  const [localQuantity, setLocalQuantity] = useState(cartItem.quantity);
  const [loading, setLoading] = useState(false);
  const originalQuantity = useRef(cartItem.quantity);
  const router = useRouter();

  useEffect(() => {
    setLocalQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const debouncedUpdateCart = useMemo(() => {
    if (cartItem.cartId!) {
      return createDebouncedUpdateCart(cartItem.cartId!, updateCartItem, setLocalQuantity, originalQuantity);
    }
  }, [cartItem.cartId, updateCartItem]);

  useEffect(() => {
    return () => debouncedUpdateCart?.cancel();
  }, [debouncedUpdateCart]);

  const handleDeleteClick = useCallback(async () => {
    try {
      if (!cartItem?.id) return showPopup("error", "Cart item ID is missing.");
      setLoading(true);
      const { data, error } = await deleteCart(cartItem.id!);
      if (error || !data) {
        showPopup("error", `Unable to delete Product: ${error}`);
        return;
      }
      removeCartItem(cartItem.id!);
    } finally {
      setLoading(false);
    }
  }, [cartItem?.id, removeCartItem]);

  const handleQuantityChange = useCallback(
    (change: number) => {
      if (!debouncedUpdateCart) return;

      const newQuantity = localQuantity + change;

      if (newQuantity <= 0) {
        handleDeleteClick();
        return;
      }

      setLocalQuantity(newQuantity);
      const updatedItem = { ...cartItem, quantity: newQuantity };
      debouncedUpdateCart.cancel();
      debouncedUpdateCart(updatedItem);
    },
    [cartItem, handleDeleteClick, localQuantity, debouncedUpdateCart],
  );

  const handleProductClick = useCallback(() => {
    if (cartItem.product.id && cartItem.store?.url) {
      router.push(`${cartItem.store.url}/products/details/${cartItem.product.id}`);
    }
  }, [cartItem.product.id, cartItem.store?.url, router]);

  const { product } = cartItem;
  const itemPrice = product.discountedPrice ?? product.price;

  const selectedSku = product.productSKUs?.find(sku => sku.id === cartItem.productSKU?.id);
  const isMaxQuantityReached = selectedSku ? cartItem.quantity >= selectedSku.quantity : false;
  const image = cartItem.productSKU.images[0];

  return (
    <div className="relative my-1 flex w-full rounded-lg bg-white-light4 p-2 py-4 shadow-md hover:shadow-xl">
      {loading && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-white-light4 opacity-75">
          <div className="skeleton h-full w-full rounded-md"></div>
        </div>
      )}
      <div className="absolute right-2 top-2 cursor-pointer text-red-600">
        <AiOutlineDelete className="text-[#6F6F6F] body-md" onClick={handleDeleteClick} />
      </div>
      <div
        className="bg-gray-400 relative h-full w-1/5 min-w-24 rounded-md p-2 sm:w-[35%] md:w-1/4"
        style={{ aspectRatio: "1 / 1.6" }}
        onClick={handleProductClick}
      >
        <Image
          src={image?.fileUrl || ""}
          alt={product.name || "Product Image"}
          fill
          draggable={false}
          className="h-auto w-full cursor-pointer rounded-md object-cover"
        />
        {(product.isOutOfStock || product.status === ProductStatusEnum.DISABLED) && (
          <Image draggable={false} src={OverLay} alt="Product is Sold Out" className="rounded-md object-cover" fill priority />
        )}
      </div>

      <div className="flex w-[65%] flex-col justify-between px-2 sm:w-full md:w-3/4">
        <div className="flex flex-col">
          <h2 className="max-w-full cursor-pointer truncate text-lg font-semibold text-black-dark3" onClick={handleProductClick}>
            {product.name}
          </h2>

          <p
            className="text-gray-500 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap break-words text-base font-normal md:whitespace-normal"
            onClick={handleProductClick}
          >
            {product.description.length > 50 ? `${product.description.slice(0, 40)}...` : product.description}
          </p>

          <p className="body-sm">
            Size: <span className="text-sm font-normal"> {cartItem.productSKU?.size ?? "N/A"}</span>
          </p>
        </div>

        <div className="my-4 flex w-full items-center justify-between">
          <p className="text-lg font-medium text-black-dark3">₹{itemPrice}</p>
          <QuantityPicker
            label={localQuantity.toString()}
            leftIcon={<FaMinus className="m-[1px] text-white-light4 body-sm" />}
            rightIcon={<FaPlus className="m-[1px] text-white-light4" />}
            handleLeftIconClick={() => handleQuantityChange(-1)}
            handleRightIconClick={isMaxQuantityReached ? undefined : () => handleQuantityChange(1)}
            disabled={loading || product.isOutOfStock || product.status === ProductStatusEnum.DISABLED}
          />
        </div>
      </div>
    </div>
  );
});
CartItemCard.displayName = "CartItemCard";

export default CartItemCard;
