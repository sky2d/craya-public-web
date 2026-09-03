"use client";

import { calculateTotalDeliveryCharges } from "@/utils/delivery";
import { getCalculatedTotal } from "@/utils/orders";
import { Coupon, CouponsData, CouponType } from "components/src/interfaces/Coupon";
import { getCouponsForCart } from "components/src/services/api/coupons";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useCartContext } from "./CartProvider";
import { useUserContext } from "./UserProvider";

interface CouponContextType {
  coupons: CouponsData | undefined;
  couponLoading: boolean;
  couponDiscount: number;
  appliedCoupon: Coupon | null;
  checkoutDeliveryCharge: number;
  setCoupons: (coupons: CouponsData) => void;
  setCouponDiscount: (discount: number | ((prev: number) => number)) => void;
  setCouponLoading: (loading: boolean) => void;
  setAppliedCoupon: (coupon: Coupon | null) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { totalMRP, cart, addToCart } = useCartContext();
  const { selectedAddress } = useUserContext();
  const [coupons, setCoupons] = useState<CouponsData | undefined>(undefined);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [checkoutDeliveryCharge, setCheckoutDeliveryCharge] = useState<number>(50);
  const pathname = usePathname();
  const path = useMemo(() => pathname, [pathname]);

  const calculatedTotalDiscount = useMemo(() => {
    if (!cart) return;
    if (!appliedCoupon) {
      return { totalDiscount: 0, hasFreeDelivery: false };
    }

    let totalDiscount = 0;
    let hasFreeDelivery = false;

    switch (appliedCoupon.type?.toUpperCase()) {
      case CouponType.FIXED:
        totalDiscount = appliedCoupon.discountValue;
        break;

      case CouponType.PERCENTAGE: {
        const calculatedTotal = getCalculatedTotal(cart, appliedCoupon);
        const percentageDiscount = parseFloat(((calculatedTotal * appliedCoupon.discountValue) / 100).toFixed(2));
        totalDiscount = appliedCoupon.maxDiscount ? Math.min(percentageDiscount, appliedCoupon.maxDiscount) : percentageDiscount;
        break;
      }

      case CouponType.FREE_DELIVERY:
        hasFreeDelivery = true;
        break;

      default:
        break;
    }

    return { totalDiscount, hasFreeDelivery };
  }, [appliedCoupon, cart]);

  useEffect(() => {
    const { totalDiscount, hasFreeDelivery } = calculatedTotalDiscount ?? { totalDiscount: 0, hasFreeDelivery: false };

    const newAmount = totalMRP - totalDiscount + (hasFreeDelivery ? 0 : checkoutDeliveryCharge);
    setCouponDiscount(totalDiscount);
    if (cart && cart.amount !== newAmount) {
      addToCart({ ...cart, amount: parseFloat(newAmount.toFixed(2)) });
    }
  }, [totalMRP, checkoutDeliveryCharge, calculatedTotalDiscount, cart, addToCart]);

  useEffect(() => {
    const fetchDelivery = async () => {
      if (!cart || !cart.cartItems || cart.cartItems.length === 0) return;

      try {
        if (appliedCoupon?.type === CouponType.FREE_DELIVERY) {
          setCheckoutDeliveryCharge(0);
          return;
        }

        if (pathname.includes("/cart") && selectedAddress?.pinCode) {
          const totalCharge = await calculateTotalDeliveryCharges(cart, selectedAddress!.pinCode);
          setCheckoutDeliveryCharge(parseFloat(totalCharge.toFixed(2)) ?? 50);
        }
      } catch (error) {
        setCheckoutDeliveryCharge(50);
      }
    };

    fetchDelivery();
  }, [appliedCoupon, selectedAddress, cart?.cartItems]);

  useEffect(() => {
    const fetchDelivery = async () => {
      if (!cart || !cart.cartItems || cart.cartItems.length === 0) return;

      setCouponLoading(true);

      try {
        if (cart.id && (!coupons || path.includes("/cart"))) {
          const { data } = await getCouponsForCart(cart.id);
          if (data) {
            setCoupons(data);
          }
        }
      } finally {
        setCouponLoading(false);
      }
    };

    fetchDelivery();
  }, [cart?.cartItems]);

  useEffect(() => {
    if (!Array.isArray(cart?.appliedCoupons) || cart.appliedCoupons.length === 0 || !coupons) {
      if (appliedCoupon !== null) {
        setAppliedCoupon(null);
      }
      return;
    }
    const firstCoupon = cart.appliedCoupons[0];
    if (firstCoupon) {
      setAppliedCoupon(firstCoupon);
    }
  }, [cart?.appliedCoupons, coupons, appliedCoupon]);

  return (
    <CouponContext.Provider
      value={{
        coupons,
        couponLoading,
        appliedCoupon,
        couponDiscount,
        checkoutDeliveryCharge,
        setCouponLoading,
        setCoupons,
        setCouponDiscount,
        setAppliedCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

// Custom hook to access the coupon context
export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};
