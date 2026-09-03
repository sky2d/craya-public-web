import dynamic from "next/dynamic";
import { memo } from "react";
import { StorefrontComponentData, StorefrontComponentProps } from "../../interfaces";
import { CouponStatus, CouponVisibility } from "../../interfaces/Coupon";
import { COUPONS_PREVIEW_DATA } from "../data";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const DEFAULT_COUPON = {
  title: "COUPON",
  description: "Coupon description",
};

export const BuilderCouponsComponent: React.FC<StorefrontComponentProps> = ({ data = COUPONS_PREVIEW_DATA }) => {
  return <CouponsComponent data={data} builder />;
};

export const StorefrontCouponsComponent: React.FC<StorefrontComponentProps> = ({ data = COUPONS_PREVIEW_DATA }) => {
  return <CouponsComponent data={data} />;
};

interface CouponProps {
  data: StorefrontComponentData;
  builder?: boolean;
}
const CouponsComponent: React.FC<CouponProps> = ({ data = COUPONS_PREVIEW_DATA, builder = false }) => {
  const visibleCoupons = data.coupons?.filter(coupon => coupon.visibility === CouponVisibility.VISIBLE && coupon.status === CouponStatus.ACTIVE);

  const couponsToShow = visibleCoupons && visibleCoupons.length > 0 ? visibleCoupons : !builder ? [] : [DEFAULT_COUPON];

  const primaryColor = data.store?.primaryColor || "#CCCCCC";

  if (!couponsToShow || couponsToShow.length === 0) {
    return null;
  }

  return (
    <div className="max-h-72">
      <div className="scrollbar-none flex h-[70%] max-h-36 min-h-14 gap-3 overflow-auto py-3" style={{ backgroundColor: primaryColor }}>
        <Marquee pauseOnHover autoFill>
          {couponsToShow.map((coupon, index) => (
            <div key={index} className="mx-2 rounded-xl px-4 py-2">
              <span className="text-lg font-medium text-white-light2 md:text-4xl">• {coupon.title}</span>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="scrollbar-none flex h-[30%] max-h-24 min-h-9 gap-3 overflow-auto py-2 opacity-30" style={{ backgroundColor: primaryColor }}>
        <Marquee pauseOnHover autoFill direction="right">
          {couponsToShow.map((coupon, index) => (
            <div key={index} className="mx-2 rounded-xl px-4 py-1">
              <span className="text-lg font-medium text-white-light2">• {coupon.description}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export const Coupons = memo(CouponsComponent);
