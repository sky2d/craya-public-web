import { Cart, CartItem } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { createCart, updateCart } from "components/src/services/api";
import { debounce } from "./generic";

export const addOrUpdateCartItem = async (cart: Cart | null, selectedCartItem: CartItem): Promise<Cart> => {
  if (!selectedCartItem) throw new Error("No item selected");

  // check if item exists in cart
  const itemExistsIndex = (cart?.cartItems ?? []).findIndex(
    item =>
      item.product.id === selectedCartItem.product.id &&
      item.productSKU.color === selectedCartItem.productSKU.color &&
      item.productSKU.size === selectedCartItem.productSKU.size,
  );

  if (itemExistsIndex !== -1 && cart?.cartItems) {
    const existingItem = cart.cartItems[itemExistsIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };

    const { error } = await updateCart(updatedItem, updatedItem.id);
    if (error) throw new Error(error);

    const updatedCartItems = [...cart.cartItems];
    updatedCartItems[itemExistsIndex] = updatedItem;

    return {
      ...cart,
      cartItems: updatedCartItems,
    };
  } else if (cart?.id) {
    const { data, error } = await createCart(selectedCartItem, cart.id);
    if (error || !data) throw new Error(error);

    return data;
  } else {
    throw new Error("Cart ID not found");
  }
};

export const createDebouncedUpdateCart = (
  cartId: string,
  updateCartItem: (item: CartItem) => void,
  setLocalQuantity: (qty: number) => void,
  originalQuantityRef: { current: number },
  delay = 1500,
) => {
  return debounce(async (updatedItem: CartItem) => {
    try {
      const { data, error } = await updateCart(updatedItem, cartId);
      if (error || !data) {
        showPopup("error", `${error}`);
        setLocalQuantity(originalQuantityRef.current);
        return;
      }

      if (data.cartItems) {
        originalQuantityRef.current = updatedItem.quantity;
        const updated = data.cartItems.find(ci => ci.id === updatedItem.id);
        if (updated) updateCartItem(updated);
      }
    } catch (err) {
      showPopup("error", `API call failed: ${err}`);
      setLocalQuantity(originalQuantityRef.current);
    }
  }, delay);
};
