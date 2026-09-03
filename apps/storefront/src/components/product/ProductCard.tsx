import { convertDate } from "@/services/formatUtils";
import { CartItem } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { DeliveryStatusEnum, Order, PaymentStatusEnum } from "components/src/interfaces/orders";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WhiteBackgroundWrapper } from "../wrapper/WhiteBackgroundWrapper";

interface ProductCardProps {
  id: string;
  item: CartItem;
  order: Order;
  adjustedPrice?: number;
  handleReview?: (order: ProductCardProps) => void;
  handleTrack?: (order: ProductCardProps) => void;
  handleReturnRefund?: (order: ProductCardProps) => void;
}

const ProductCard: React.FC<ProductCardProps> = props => {
  return (
    <>
      {props.order.paymentStatus !== PaymentStatusEnum.Failed && (
        <div className="w-full p-1">
          <WhiteBackgroundWrapper
            key={props.id}
            className="flex h-full w-full items-start justify-center rounded-3xl bg-[#F5F3F3] px-2 py-4 shadow-xl"
          >
            <ProductContent {...props} />
          </WhiteBackgroundWrapper>
        </div>
      )}
    </>
  );
};

const ProductContent: React.FC<ProductCardProps> = props => {
  const { description, price, discountedPrice, image, name } = props.item.product;
  const { createdAt, estimatedDeliveryDate, paymentStatus, deliveryStatus } = props.order;

  const router = useRouter();

  const handleProductClick = (cartItem: CartItem) => {
    if (cartItem.product.id && cartItem.store) {
      const storeUrl = cartItem.store.url;
      if (!storeUrl) return;
      router.push(`${storeUrl}/products/details/${cartItem.product.id}`);
    }
  };

  return (
    <>
      <div
        className="bg-gray-400 relative w-full max-w-48 rounded-md p-2 md:rounded-[20px]"
        style={{ aspectRatio: "1/1.6" }}
        onClick={() => handleProductClick(props.item)}
      >
        <Image
          draggable={false}
          src={image?.fileUrl || ""}
          alt="Product Image"
          fill
          className="cursor-pointer rounded-md object-cover md:rounded-[20px]"
          style={{ aspectRatio: "1/1.6" }}
        />
      </div>
      <div className="flex h-full w-full flex-col items-stretch justify-start p-4">
        <div className="my-1 h-full">
          <h2 className="text-base font-semibold text-black-dark3 lg:text-lg"> {name}</h2>
          <p className="text-gray-500 w-[15vw] cursor-pointer truncate text-sm font-normal lg:text-base">{description}</p>

          {createdAt && <p className="text-[#9B9B9B] body-xs md:body-sm">Ordered At: {convertDate(createdAt)}</p>}
        </div>
        <div className="my-2 h-full">
          {estimatedDeliveryDate && (
            <p className="body-sm">
              ETD: <span className="text-sm font-normal">{estimatedDeliveryDate}</span>
            </p>
          )}

          <p className="body-sm">
            Order value: <span>₹{props.adjustedPrice ? props.adjustedPrice.toFixed(2) : (price ?? discountedPrice)}</span>
          </p>
        </div>
        <div className="flex h-full items-start justify-between">
          <div className="flex items-start gap-x-2">
            {/* Style/Color */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-sm font-semibold lg:text-[1vw]">Style</span>
              <span
                className="border-gray-300 mt-1 aspect-square h-7 rounded-full border lg:h-[2vw]"
                style={{ backgroundColor: props.item.productSKU.color || "#ffffff" }}
              ></span>
            </div>
            {/* Size */}
            <div className="flex flex-col items-center text-center">
              <span className="text-sm font-semibold lg:text-[1vw]">Size</span>
              <span className="mt-1 flex aspect-square h-7 items-center justify-center rounded-full bg-brand-color1 text-sm text-white-light4 lg:h-[2vw]">
                {props.item.productSKU.size || "N/A"}
              </span>
            </div>
          </div>
          <div>
            <p className="text-base font-semibold">
              QTY: <span className="font-normal">{props.item.quantity}</span>
            </p>
          </div>
        </div>
        <div className="flex h-full flex-wrap justify-end gap-2 p-2">
          {props.handleReview && deliveryStatus === DeliveryStatusEnum.DELIVERED && (
            <Button2 type={ButtonType.PRIMARY} label="Review" handleClick={() => props.handleReview?.(props)} />
          )}

          {props.handleTrack && paymentStatus !== PaymentStatusEnum.Failed && deliveryStatus !== DeliveryStatusEnum.DELIVERED && (
            <Button2 type={ButtonType.PRIMARY} label="Track" handleClick={() => props.handleTrack?.(props)} />
          )}

          {paymentStatus === PaymentStatusEnum.Paid && deliveryStatus === DeliveryStatusEnum.DELIVERED && (
            <Button2 type={ButtonType.PRIMARY} label="Initiate Exchange" handleClick={() => props.handleReturnRefund?.(props)} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
