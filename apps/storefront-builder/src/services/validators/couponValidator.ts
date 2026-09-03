import { Coupon, CouponError } from "components/src/interfaces/Coupon";

export function validateCoupon(coupon: Partial<Coupon>): CouponError {
  const errors: CouponError = {};

  // Title validation
  if (coupon.title === "") {
    errors.title = "Title must be at least 3 characters long.";
  }

  // Description validation
  if (coupon.description === "") {
    errors.description = "Description must be at least 10 characters long.";
  }

  // Type validation
  if (!coupon.type) {
    errors.type = "Type must be either 'PERCENTAGE' or 'FLAT'.";
  }

  // Visibility validation
  if (!coupon.visibility) {
    errors.visibility = "Visibility must be either 'PUBLIC' or 'PRIVATE'.";
  }

  // AccessibleFor validation
  if (!coupon.accessibleFor) {
    errors.accessibleFor = "AccessibleFor is required.";
  }

  // DiscountValue validation
  if (!coupon.discountValue || coupon.discountValue < 0) {
    errors.discountValue = "Discount value is required.";
  }

  // MinPurchase validation
  if (coupon.minPurchase != null && coupon.minPurchase < 0) {
    errors.minPurchase = "Minimum purchase cannot be negative.";
  }

  // MaxDiscount validation (only for percentage coupons)
  if (!coupon.maxDiscount || coupon.maxDiscount < 0) {
    errors.maxDiscount = "Maximum discount not be 0.";
  }

  return errors;
}
