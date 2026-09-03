// context/SellerContext.tsx
"use client";
import { Coupon, CouponAccessibility, CouponStatus, CouponType, CouponVisibility } from "components/src/interfaces/Coupon";
import { showPopup } from "components/src/minor";
import { getCoupons } from "components/src/services/api/coupons";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useStoreContext } from "./StoreProvider";

interface CouponContextType {
  coupons: Coupon[];
  setCoupons: (coupons: Coupon[]) => void;
  selectedCoupon: Coupon;
  setSelectedCoupon: (coupon: Coupon, isCouponChanged?: boolean) => void;
  isCouponChanged: boolean;
  setIsCouponChanged: (isCouponChanged: boolean) => void;
  couponLoading: boolean;
  setCouponLoading: (isLoading: boolean) => void;
}

export const INITIAL_COUPON_DATA: Coupon = {
  title: "",
  description: "",
  type: CouponType.PERCENTAGE, // e.g. "PERCENTAGE" | "FIXED"
  visibility: CouponVisibility.VISIBLE, // e.g. "VISIBLE" | "HIDDEN"
  accessibleFor: CouponAccessibility.ALL_CUSTOMERS, // e.g. "ALL_CUSTOMERS" | "SPECIFIC_CUSTOMERS"
  status: CouponStatus.ACTIVE, // e.g. "ACTIVE" | "DISABLED"
  discountValue: 0,
  minPurchase: 0,
  maxDiscount: 0,
  storeId: "",
  expiryDate: "",
  isFake: false,
};

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const { store } = useStoreContext();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, _setSelectedCoupon] = useState<Coupon>(INITIAL_COUPON_DATA);
  const [isCouponChanged, setIsCouponChanged] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!store?.id) return;
      try {
        setCouponLoading(true);
        const { data, error } = await getCoupons(store.id);
        if (error) showPopup("error", error);
        setCoupons(data || []);
      } catch (err) {
        console.log("Error fetching coupons:", err);
      } finally {
        setCouponLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const setSelectedCoupon = (coupon: Coupon, isCouponChanged = true) => {
    _setSelectedCoupon(coupon);
    setIsCouponChanged(isCouponChanged);
  };

  return (
    <CouponContext.Provider
      value={{ selectedCoupon, setSelectedCoupon, coupons, setCoupons, isCouponChanged, setIsCouponChanged, couponLoading, setCouponLoading }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = (): CouponContextType => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCoupon must be used within a couponProvider");
  }
  return context;
};
