"use client";

import Cart from "@/assets/image/Checkout.png";
import { BaseModal } from "components/src/major/BaseModal";
import Image from "next/image";
import { FC } from "react";

interface AddedToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddedToCartModal: FC<AddedToCartModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="min-w-[40vw] rounded-[16px]" padding="10px">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-[30%]" style={{ height: "150px" }}>
          <Image src={Cart} draggable={false} alt="Item has been added to cart" className="object-contain" fill />
        </div>
        <div className="flex w-full flex-col items-start justify-start px-4">
          <p className="text-xl font-bold">Added to Cart</p>
          <p className="text-sm font-medium text-black-dark3">Your item is in the bag. Keep browsing or make it yours now.</p>
        </div>
      </div>
    </BaseModal>
  );
};
