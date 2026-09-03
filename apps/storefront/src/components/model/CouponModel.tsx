import { useCartContext } from "@/provider/CartProvider";
import { useCouponContext } from "@/provider/CouponProvider";
import { Loader } from "@/utils/loader";
import { getCalculatedTotal } from "@/utils/orders";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Coupon } from "components/src/interfaces/Coupon";
import { InputFieldSize, InputFieldType } from "components/src/interfaces/InputField";
import { BaseModal } from "components/src/major/BaseModal";
import { Button2, InputField2, showPopup } from "components/src/minor";
import { applyCoupon, removeCoupon } from "components/src/services/api";
import { validateCoupon } from "components/src/services/api/coupons";
import { FC, useCallback, useEffect, useState } from "react";
import { RiCloseCircleFill, RiCoupon3Line } from "react-icons/ri";
import { WhiteBackgroundWrapper } from "../wrapper/WhiteBackgroundWrapper";

interface CouponModelProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const CouponModel: FC<CouponModelProps> = ({ isModalOpen, handleCancel }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { appliedCoupon, setCouponDiscount, setAppliedCoupon, coupons, couponLoading, setCouponLoading } = useCouponContext();
  const { cart, addToCart } = useCartContext();

  const filteredCoupons: Coupon[] = coupons
    ? Object.values(coupons)
        .flat()
        .filter(coupon => coupon.visibility === "VISIBLE" && coupon.status === "ACTIVE" && coupon.isFake === false)
    : [];

  const handleCouponCode = async () => {
    const storeIds = Array.from(new Set(cart?.cartItems?.map(item => item.storeId).filter(Boolean) as string[]));

    if (!searchTerm || storeIds.length < 1 || !cart) {
      return null;
    }
    setCouponLoading(true);
    const { data: coupon, error } = await validateCoupon(storeIds, searchTerm);
    setCouponLoading(false);

    if (!coupon || error) showPopup("error", "Coupon not found");

    if (coupon && coupon.minPurchase > getCalculatedTotal(cart, coupon)) {
      showPopup("error", `Minimum purchase of ₹${coupon.minPurchase} is required to apply this coupon.`);
    } else if (coupon) {
      handleApplyCoupon(coupon);
    } else {
      showPopup("error", "Coupon not found");
    }
    handleCancel();
    setSearchTerm("");
  };

  const handleApplyCoupon = async (coupon: Coupon) => {
    if (!cart) return;

    if (getCalculatedTotal(cart, coupon) <= 0) {
      showPopup("error", "Please add products from this store.");
      return;
    }

    if (getCalculatedTotal(cart, coupon) < coupon.minPurchase) {
      showPopup("warning", `Minimum purchase of ₹${coupon.minPurchase} is required to apply this coupon.`);
      return;
    }

    if (appliedCoupon) {
      showPopup("warning", `Only one coupon can be applied at a time.`);
      return;
    }

    if (isCouponApplied(coupon)) {
      showPopup("warning", `Coupon "${coupon.title}" is already applied.`);
      setAppliedCoupon(null);
      return;
    }

    if (coupon.id && cart) {
      setCouponLoading(true);
      const { data, error } = await applyCoupon(coupon.title, cart?.id);
      setCouponLoading(false);
      if (!data || error) {
        showPopup("error", "Failed to apply coupon. Please try again.");
        return;
      }
      setAppliedCoupon(coupon);
      addToCart({ ...cart, appliedCoupons: [coupon] });
      setCouponDiscount(data.couponDiscount ? data.couponDiscount / 100 : 0);
      showPopup("success", `Coupon "${coupon.title}" has been applied.`);
      handleCancel();
    }
  };
  const handleRemoveCoupon = useCallback(async () => {
    if (!appliedCoupon || !cart || !cart.appliedCoupons) return;
    setCouponLoading(true);
    const { data, error } = await removeCoupon(cart?.id);
    setCouponLoading(false);
    if (!data || error) {
      showPopup("error", "Failed to remove coupon. Please try again.");
      return;
    }
    setAppliedCoupon(null);
    addToCart({
      ...cart,
      appliedCoupons: [],
    });
    showPopup("warning", `Coupon "${appliedCoupon?.title}" has been removed.`);
  }, [appliedCoupon, cart, setCouponLoading, setAppliedCoupon]);

  const isCouponApplied = (coupon: Coupon) => {
    return appliedCoupon?.id === coupon.id;
  };

  useEffect(() => {
    if (!appliedCoupon || !cart) return;
    const calculatedTotal = getCalculatedTotal(cart, appliedCoupon);
    if (calculatedTotal < appliedCoupon.minPurchase) {
      handleRemoveCoupon();
    }
  }, [appliedCoupon, cart, handleRemoveCoupon]);

  return (
    <BaseModal isOpen={isModalOpen} onClose={handleCancel} title="Select Coupons" className="min-w-[40vw]">
      {couponLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <WhiteBackgroundWrapper className="my-8 rounded-lg bg-white-light3">
            <p className="body-normal-semibold">Apply Coupon</p>
            <div className="flex items-center justify-center">
              <div className="w-full p-2">
                <InputField2
                  type={InputFieldType.TEXT}
                  placeholder="Please enter a valid coupon code"
                  value={searchTerm}
                  size={InputFieldSize.LARGE}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-auto p-2">
                <Button2 type={ButtonType.PRIMARY} label="Apply" handleClick={handleCouponCode} />
              </div>
            </div>
          </WhiteBackgroundWrapper>
          <WhiteBackgroundWrapper className="my-8 rounded-lg">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map(coupon => (
                <div
                  key={coupon.id}
                  className={`relative my-4 rounded-2xl bg-white-light3 ${isCouponApplied(coupon) ? "opacity-75" : ""} shadow-lg`}
                  style={{
                    backgroundColor: coupon.byCraya ? "rgba(124, 84, 233, 0.5)" : `${coupon.store?.primaryColor}80`,
                  }}
                >
                  {isCouponApplied(coupon) && (
                    <span className="absolute right-2 top-2 cursor-pointer text-xl text-red-500 hover:scale-110" onClick={handleRemoveCoupon}>
                      <RiCloseCircleFill />
                    </span>
                  )}
                  <div className="flex flex-col p-4">
                    <div className="flex items-center justify-start">
                      <span className="icon mr-2">
                        <RiCoupon3Line className="text-lg text-white-light4" />
                      </span>
                      <h3 className="font-bold text-white-light4">{coupon.title}</h3>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-white-light4 body-sm-semibold">{coupon.description}</p>
                    </div>
                  </div>
                  <div className="my-2 w-full">
                    <button
                      suppressHydrationWarning
                      className={`w-full rounded-b-2xl p-2 text-white-light4 hover:shadow-xl ${isCouponApplied(coupon) ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() => handleApplyCoupon(coupon)}
                      style={{ backgroundColor: coupon.byCraya ? "#7C54E9" : coupon.store?.primaryColor }}
                    >
                      {isCouponApplied(coupon) ? "Coupon Applied" : "Apply Coupon"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center">No coupons found</p>
            )}
          </WhiteBackgroundWrapper>
        </>
      )}
    </BaseModal>
  );
};

export default CouponModel;
