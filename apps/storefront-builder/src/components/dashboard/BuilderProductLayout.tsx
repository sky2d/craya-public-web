import { isSizesMissing } from "@/utils/isSzeMissingInSKUs";
import { convertToProductStockList } from "@/utils/productSkuToProductStock";
import DisabledOverlay from "components/src/icons/iconFiles/DisabledOverlay.png";
import OverLay from "components/src/icons/iconFiles/SoldOutOverlays.png";
import { ProductStatusEnum, SimpleProduct } from "components/src/interfaces";
import ImageSkeletonLoader from "components/src/major/ImageSkeletonLoader";
import { IconButton } from "components/src/minor";
import { StocksMissing } from "components/src/minor/OutOfStock";
import Image from "next/image";
import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

type BuilderProductLayoutProps = {
  product: SimpleProduct;
  handleClick?: () => void;
  backgroundColor?: string;
};

export const BuilderProductLayout: React.FC<BuilderProductLayoutProps> = ({ product, handleClick, backgroundColor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const productStockList = convertToProductStockList(product.productSKUs || []);

  return (
    <div className={`flex h-full w-full cursor-pointer flex-col items-stretch`}>
      <div
        className="relative flex w-full"
        style={{ aspectRatio: "1/1.6" }}
        onClick={handleClick}
        onMouseEnter={() => {
          if (isSizesMissing(productStockList) && !product.isOutOfStock && product.status !== ProductStatusEnum.DISABLED) setIsModalOpen(true);
        }}
        onMouseLeave={() => {
          if (isSizesMissing(productStockList) && !product.isOutOfStock) setIsModalOpen(false);
        }}
      >
        {loader && <ImageSkeletonLoader />}

        <Image
          src={product?.productSKUs![0].images[0].fileUrl || ""}
          alt="Product Image"
          draggable={false}
          onLoad={() => setLoader(false)}
          className={`h-full w-full rounded-[10px] object-cover transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 ${
            loader ? "hidden" : ""
          }`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          priority
          style={{ aspectRatio: "1/1.6" }}
        />

        {product.isOutOfStock && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center">
            <Image
              src={OverLay}
              draggable={false}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              alt="Product is Sold Out"
              className="h-full w-full rounded-[10px] object-cover"
              fill
              priority
            />
          </div>
        )}
        {product.status === ProductStatusEnum.DISABLED && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center">
            <Image
              src={DisabledOverlay}
              draggable={false}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              alt="Product is Sold Out"
              className="h-full w-full rounded-[10px] object-cover"
              fill
              priority
            />
          </div>
        )}
        {isModalOpen && (
          <div className="absolute h-full w-full">
            <StocksMissing />
          </div>
        )}
      </div>
      <div className="my-2 h-1 w-full rounded-[4px]" style={{ backgroundColor }}></div>
      <div className="relative w-full grid-rows-2 sm:grid">
        <div className="row-span-1 flex justify-between">
          <div className="line-clamp-2 flex-1">
            <span className={`block text-sm font-medium text-black-dark1 sm:text-[1.2vw]`}>{product.name}</span>
          </div>
          <IconButton
            icon={IoMdHeartEmpty}
            size={24}
            buttonStyle={`like-icon-${product.id} transition-transform duration-300 ease-in-out  text-black-dark1`}
          />
        </div>
        <div className="row-span-1 flex">
          <span
            className="m-1 text-xs font-extrabold text-black-dark1 sm:text-[1.2vw]"
            style={{ color: backgroundColor ? backgroundColor : "#121212" }}
          >
            {product.discountedPrice ? `₹${product.discountedPrice}` : `₹${product.price}`}
          </span>
          {product.discountedPrice && <span className="text-gray-500 m-1 text-xs font-extrabold line-through">₹{product.price}</span>}
        </div>
      </div>
    </div>
  );
};
