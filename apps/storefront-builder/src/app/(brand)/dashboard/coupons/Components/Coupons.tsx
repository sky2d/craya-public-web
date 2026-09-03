"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { useCouponContext } from "@/provider/CouponProvider";
import { Coupon, CouponStatus } from "components/src/interfaces/Coupon";
import TableContent from "components/src/major/Table";
import { showPopup } from "components/src/minor";
import { updateCoupon } from "components/src/services/api/coupons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCouponTableColumns } from "./Coupon.Table/Coupon.Column";
import { CouponHeaderSection } from "./CouponHeaderSection";

export const Coupons = () => {
  const { coupons, setCoupons } = useCouponContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  // Handles toggling the enable/disable switch for an item
  const handleToggleEnable = async (coupon: Coupon) => {
    if (!coupon.id) return;
    const newStatus = coupon.status === CouponStatus.ACTIVE ? CouponStatus.DISABLED : CouponStatus.ACTIVE;

    const updateCouponRes = await updateCoupon({ status: newStatus }, coupon.id);

    if (updateCouponRes.data) {
      const updatedCoupon = updateCouponRes.data;
      setCoupons(coupons.map(item => (item.id === updatedCoupon.id ? updatedCoupon : item)));
      showPopup("success", "Coupon status updated successfully");
    }
  };
  const columns = getCouponTableColumns({
    onToggleEnable: handleToggleEnable,
    onEditButtonClick: id => router.push(`/dashboard/coupons/${id}`),
  });

  return (
    <div className="p-2">
      <div>
        <CouponHeaderSection label="Add Coupon" text="Coupons" handleClick={() => router.push("/dashboard/coupons/addCoupon")} />
      </div>
      <div className="py-2">
        <WhiteBackgroundWrapper>
          {/* Table Content */}
          <TableContent<Coupon> dataSource={coupons} columns={columns} selectedRowKeys={selectedRowKeys} onSelectionChange={setSelectedRowKeys} />
        </WhiteBackgroundWrapper>
      </div>
    </div>
  );
};
