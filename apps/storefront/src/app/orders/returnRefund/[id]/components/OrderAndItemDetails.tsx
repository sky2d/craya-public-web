import { convertDate } from "@/services/formatUtils"; // Adjust path as needed
import { CartItem } from "components/src/interfaces";
import { Order } from "components/src/interfaces/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface OrderAndItemDetailsProps {
  order: Order;
  cartItem: CartItem;
  adjustedPrice?: number;
}

const OrderAndItemDetails: React.FC<OrderAndItemDetailsProps> = ({ order, cartItem, adjustedPrice }) => {
  const { product, store } = cartItem;

  const image = cartItem.productSKU.images[0];

  const productPrice = adjustedPrice ?? cartItem.product.discountedPrice ?? cartItem.product.price;
  const router = useRouter();

  return (
    <div className="bg-gray-100 mb-6 rounded-3xl border-[0.5px] border-[#717171] p-4">
      {/* Order Summary */}
      <div className="text-gray-600 flex flex-wrap justify-between text-sm">
        <p className="text-lg font-semibold">
          Order: <span className="font-normal">#{order.id}</span>
        </p>
        <p className="text-lg font-semibold">
          Order Date : <span className="font-normal">{convertDate(order.createdAt)}</span>
        </p>
      </div>
      <hr className="my-1 border-t-[0.5px] border-[#717171]" />

      {/* Item Details */}
      <div className="mt-4 flex items-start gap-4">
        {/* Product Image */}
        <div className="relative aspect-[1/1.6] w-1/2 flex-shrink-0 overflow-hidden rounded-md sm:w-auto sm:min-w-[20%] md:min-w-[10%]">
          {image?.fileUrl ? (
            <Image
              draggable={false}
              src={image.fileUrl}
              placeholder="empty"
              unoptimized
              alt={product.description || "Product Image"}
              fill
              className="cursor-pointer rounded-md object-cover"
              sizes="(max-width: 640px) 15vw, 64px"
              onClick={() => {
                router.push(`${store.url}/products/details/${product.id}`);
              }}
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex h-full w-full items-center justify-center rounded-md text-sm">No Image</div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-start">
          <div className="flex w-full flex-wrap justify-between gap-x-4">
            <p className="flex-1 text-base font-semibold lg:text-[1vw]">
              {product.description
                ? product.description.length > 100
                  ? `${product.description.slice(0, 100)} ...`
                  : product.description
                : "No Description"}
            </p>
            <p className="text-base font-semibold">
              QTY: <span className="font-normal">{cartItem.quantity}</span>
            </p>
          </div>
          <div className="my-4 flex flex-col items-start gap-x-[4vw] sm:gap-x-8">
            {/* Size */}

            <span className="text-sm font-semibold lg:text-[1vw]">Size</span>
            <span className="mt-1 flex aspect-square h-7 items-center justify-center rounded-full bg-brand-color1 text-sm text-white-light4 lg:h-[2vw]">
              {cartItem.productSKU.size || "N/A"}
            </span>
          </div>
          {/* Price */}
          <div className="my-4 flex items-center justify-end text-2xl font-semibold text-brand-color1 md:text-[2.5vw]">₹{productPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderAndItemDetails;
