import { CartItem } from "components/src/interfaces";
import Image from "next/image";

interface ModalProductCardProps {
  cartItem: CartItem;
  className?: string;
  onProductClick: () => void;
}

export const ModalProductCard: React.FC<ModalProductCardProps> = ({ cartItem, className, onProductClick }) => {
  const { price, discountedPrice, name } = cartItem.product;
  const productSku = cartItem.productSKU;

  return (
    <div className={`flex w-full cursor-pointer gap-2 rounded-[15px] bg-[#FFFFFF] p-2 shadow-xl ${className}`} onClick={onProductClick}>
      <div className="relative aspect-square w-1/3 min-w-[60px]">
        <Image
          draggable={false}
          src={productSku.images[0].fileUrl || ""}
          alt={name}
          fill
          className="rounded-[11px] object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-full flex-col overflow-hidden">
        <span className="line-clamp-2 break-words text-sm font-medium">{name}</span>
        <span className="text-sm font-semibold text-[#AC1E2E]">₹{discountedPrice ?? price}</span>
      </div>
    </div>
  );
};
