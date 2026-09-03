"use client";

import { Cart, CartItem, ProductStatusEnum } from "components/src/interfaces";
import { getCart } from "components/src/services/api";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface CartContextType {
  cart: Cart | null;
  selectedCartItem: CartItem | null;
  cartLoading: boolean;
  totalMRP: number;
  setCartLoading: (loading: boolean) => void;
  setSelectedCartItem: (item: CartItem | null) => void;
  addToCart: (cart: Cart) => void;
  updateCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSessionContext();
  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCartProducts = async () => {
    setCartLoading(true);
    try {
      const { data } = await getCart();
      if (data) setCart(data);
      else
        setCart({
          id: "",
          cartItems: [],
          amount: 0,
          userId: "",
          originalAmount: 0,
          appliedCoupons: [],
        });
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (!session.loading && session.doesSessionExist) {
      fetchCartProducts();
    } else {
      setCart(null);
    }
  }, [session]);

  const totalMRP = useMemo(() => {
    if (!cart?.cartItems) return 0;

    return cart.cartItems.reduce((total, cartItem) => {
      const itemPrice =
        (!cartItem.product?.isOutOfStock && cartItem.product.status === ProductStatusEnum.ACTIVE && cartItem.product.discountedPrice) ??
        cartItem.product.price;

      return total + Number(itemPrice ?? 0) * Number(cartItem.quantity);
    }, 0);
  }, [cart]);

  const addToCart = (updatedCart: Cart) => setCart(updatedCart);

  const updateCartItem = (item: CartItem) => {
    setCart(prev =>
      prev
        ? {
            ...prev,
            cartItems: (prev.cartItems ?? []).map(ci => (ci.id === item.id ? item : ci)),
          }
        : prev,
    );
  };

  const removeCartItem = (id: string) => {
    setCart(prev =>
      prev
        ? {
            ...prev,
            cartItems: (prev.cartItems ?? []).filter(ci => ci.id !== id),
          }
        : prev,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        selectedCartItem,
        cartLoading,
        totalMRP,
        removeCartItem,
        updateCartItem,
        setCartLoading,
        setSelectedCartItem,
        addToCart,
        refreshCart: fetchCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
