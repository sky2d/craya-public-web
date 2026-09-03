"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useCouponContext } from "@/provider/CouponProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { validateCoupon } from "@/services/validators/couponValidator";
import { Coupon, CouponType, CouponVisibility } from "components/src/interfaces/Coupon";
import { InputFieldType } from "components/src/interfaces/InputField";
import { Dropdown, InputField2, showPopup } from "components/src/minor";
import { createCoupon, updateCoupon } from "components/src/services/api/coupons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CouponHeaderSection } from "./CouponHeaderSection";

// You will need to import Ant Design's CSS for the DatePicker to work correctly.
// You can do this in your main layout file (e.g., layout.js or app.js).
// import 'antd/dist/reset.css';

/**
 * Calculates the duration between two dates and returns a formatted string.
 * @param {dayjs.Dayjs} start - The start date.
 * @param {dayjs.Dayjs} end - The end date.
 * @returns {string} - The formatted duration (e.g., "1 Month 15 Days").
 */

// const calculateDuration = (start: Dayjs | null, end: Dayjs | null): string => {
//   if (!start || !end || end.isBefore(start)) {
//     return "Invalid date range";
//   }

//   const months = end.diff(start, "month");
//   const remainingStart = start.add(months, "month");
//   const days = end.diff(remainingStart, "day");

//   let result = "";
//   if (months > 0) {
//     result += `${months} ${months === 1 ? "Month" : "Months"}`;
//   }
//   if (days > 0) {
//     result += ` ${days} ${days === 1 ? "Day" : "Days"}`;
//   }

//   return result.trim() || "Same Day";
// };
// Main Component for the Coupon Form
export const CouponDetail = ({ coupon }: { coupon: Coupon }) => {
  const router = useRouter();
  const { selectedCoupon, setSelectedCoupon, coupons, setCoupons, isCouponChanged, setIsCouponChanged } = useCouponContext();
  const { store } = useStoreContext();

  useEffect(() => {
    if (coupon.storeId === "") {
      setSelectedCoupon({ ...coupon, storeId: store.id! });
      return;
    }
    setSelectedCoupon(coupon, false);
  }, []);

  const handleSaveCouponButton = async () => {
    const errors = validateCoupon(selectedCoupon);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showPopup("error", firstError as string);
      return;
    }

    if (!isCouponChanged) {
      showPopup("error", "No changes made to save");
      return;
    }

    try {
      if (selectedCoupon.id) {
        const response = await updateCoupon(selectedCoupon, selectedCoupon.id);
        if (response.data) {
          const updatedCoupon = response.data;
          setCoupons(coupons.map(coupon => (coupon.id === updatedCoupon.id ? updatedCoupon : coupon)));
          router.back();
          showPopup("success", "Coupon updated successfully");
        } else {
          showPopup("error", response.message!);
        }
      } else {
        const response = await createCoupon(selectedCoupon);

        if (response.data) {
          setCoupons([...coupons, response.data]);
          router.back();
        } else {
          showPopup("error", response.message!);
        }
      }
    } catch (error) {
      console.log("Error saving coupon:", error);
      // Optionally show toast
    } finally {
      setIsCouponChanged(false);
    }
  };
  return (
    <div className="p-1">
      <CouponHeaderSection
        label="Save"
        text={coupon.id ? "Edit Coupon" : "Add New Coupon"}
        showCancelButton
        onCancelClick={() => router.back()}
        handleClick={handleSaveCouponButton}
      />
      <WhiteBackgroundWrapper>
        {/* Main layout grid */}
        <div className="flex gap-2">
          {/* Column 1: Form Fields */}
          <div className="w-1/2">
            <form autoComplete="off" className="space-y-6">
              <div>
                <Label>Coupon Code</Label>
                <InputField2
                  type={InputFieldType.TEXT}
                  placeholder="50% off"
                  value={selectedCoupon.title}
                  onChange={e => setSelectedCoupon({ ...selectedCoupon, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>Coupon Type</Label>
                  <Dropdown
                    options={[CouponType.PERCENTAGE, CouponType.FREE_DELIVERY, CouponType.FIXED]}
                    onSelect={value => setSelectedCoupon({ ...selectedCoupon, type: value as CouponType })}
                    defaultOption={selectedCoupon.type}
                  />
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <InputField2
                    type={InputFieldType.NUMBER}
                    placeholder="e.g., 20 or 20%"
                    value={selectedCoupon.discountValue}
                    onChange={e => setSelectedCoupon({ ...selectedCoupon, discountValue: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label>Maximum Discount</Label>
                <InputField2
                  type={InputFieldType.NUMBER}
                  placeholder="Enter maximum discount amount"
                  value={selectedCoupon.maxDiscount}
                  onChange={e => setSelectedCoupon({ ...selectedCoupon, maxDiscount: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label>Minimum Cart Value</Label>
                <InputField2
                  type={InputFieldType.NUMBER}
                  placeholder="Enter minimum cart value for eligibility"
                  value={selectedCoupon.minPurchase}
                  onChange={e => setSelectedCoupon({ ...selectedCoupon, minPurchase: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label>Visibility on Storefront</Label>
                <Dropdown
                  options={[CouponVisibility.VISIBLE, CouponVisibility.HIDDEN]}
                  defaultOption={selectedCoupon.visibility}
                  onSelect={value => setSelectedCoupon({ ...selectedCoupon, visibility: value as CouponVisibility })}
                />
              </div>

              <div>
                <Label>Coupon Description</Label>
                <InputField2
                  resizable
                  rows={4}
                  placeholder="Add a description for internal reference"
                  value={selectedCoupon.description}
                  onChange={e => setSelectedCoupon({ ...selectedCoupon, description: e.target.value })}
                />
              </div>
            </form>
          </div>

          {/* Column 2: Date Selection */}
          <div className="w-1/2">
            <div>
              <Label>Expiry Date (Optional)</Label>
              <input
                type="date"
                className="w-full rounded-xl border border-gray-200 bg-white-light5 p-3 text-sm focus:border-brand-color1 focus:outline-none"
                value={selectedCoupon.expiryDate ? new Date(selectedCoupon.expiryDate).toISOString().split("T")[0] : ""}
                onChange={e => setSelectedCoupon({ ...selectedCoupon, expiryDate: e.target.value ? new Date(e.target.value).toISOString() : "" })}
              />
            </div>

            {!selectedCoupon.expiryDate && (
              <div className="bg-gray-50 border-gray-200 mt-6 rounded-lg border p-6 text-center">
                <p className="text-base font-semibold text-brand-color1">Coupon Valid for Forever</p>
              </div>
            )}
          </div>
        </div>
      </WhiteBackgroundWrapper>
    </div>
  );
};
