"use client";

import Checkout from "@/assets/icons/Checkout.svg";
import { getFutureDate } from "@/services/formatUtils";
import { CourierDeliveryInfo } from "components/src/interfaces/orders";
import Image from "next/image";

interface ProductDeliveryProps {
  estimatedDelivery: CourierDeliveryInfo;
}

const ProductDelivery: React.FC<ProductDeliveryProps> = ({ estimatedDelivery }) => {
  return (
    <div className="my-4 rounded-[10px] border-[1px] p-2">
      {estimatedDelivery ? (
        <div className="flex w-full items-center">
          <Image src={Checkout} draggable={false} alt="Checkout Image" className="h-10" />
          <p className="w-full text-xl body-sm">
            Expected Delivery <span className="body-sm-semibold">{getFutureDate(parseInt(estimatedDelivery.estimated_delivery_days))}</span>
          </p>
        </div>
      ) : (
        <p className="text-xl body-sm">Loading delivery information...</p>
      )}
    </div>
  );
};

export default ProductDelivery;
