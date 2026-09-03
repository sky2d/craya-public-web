"use client";

import Checkout from "@/assets/icons/Checkout.svg?component";
import { getFutureDate } from "@/services/formatUtils";
import { CourierDeliveryInfo } from "components/src/interfaces/orders";
import { checkEstimatedDelivery } from "components/src/services/api/orders";
import { useEffect, useState } from "react";

interface ProductDeliveryProps {
  pinCode: string;
  storeId: string;
  weightInGrams?: number;
  primaryColor?: string;
}

const ProductDelivery = ({ pinCode, storeId, weightInGrams, primaryColor }: ProductDeliveryProps) => {
  const [productDeliveryInfo, setProductDeliveryInfo] = useState<CourierDeliveryInfo | null>(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      const { data, error } = await checkEstimatedDelivery(storeId, pinCode, weightInGrams);
      if (data && !error) {
        const found = data.find(item => item.estimated_delivery_days);
        if (found) setProductDeliveryInfo(found);
      }
    };

    return () => {
      fetchDelivery();
    };
  }, []);

  if (!productDeliveryInfo) return null;

  return (
    <div className="my-4 rounded-[10px] border-[1px] p-2">
      <div className="flex w-full items-center">
        <Checkout className="text-gray-900 h-10 w-[40%]" style={{ color: primaryColor }} />
        <p className="w-full text-xl body-sm">
          Expected Delivery <span className="body-sm-semibold">{getFutureDate(parseInt(productDeliveryInfo.estimated_delivery_days))}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDelivery;
