"use client";

import NetBankingImage from "@/assets/image/NetBanking.png";
import { BaseModal } from "components/src/major/BaseModal";
import Image from "next/image";
import { FC } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { WhiteBackgroundWrapper } from "../wrapper/WhiteBackgroundWrapper";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  handleNetBanking: () => void;
  handleCashOnDelivery: () => void;
}

const PaymentModal: FC<PaymentModalProps> = ({ isOpen, onClose, totalAmount, handleCashOnDelivery, handleNetBanking }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Payments" className="text-center text-4xl font-semibold">
      <div className="w-full space-y-6 p-2">
        {/* Total Section */}
        <WhiteBackgroundWrapper className="flex w-full items-center justify-between rounded-lg bg-white-light3 p-6 text-xl font-semibold text-brand-color1 shadow-md">
          <span>Total</span>
          <span className="font-bold">₹{totalAmount}</span>
        </WhiteBackgroundWrapper>

        {/* Payment Mode Section */}
        <div>
          <p className="text-black text-center text-lg font-semibold">Select Payment Mode</p>

          {/* Net Banking Option */}
          <WhiteBackgroundWrapper className="flex items-center justify-between rounded-lg bg-white-light3 p-6 text-base font-semibold text-black-dark1 shadow-md hover:shadow-lg">
            <div className="flex w-full items-center gap-3">
              <Image src={NetBankingImage} alt="Net Banking" draggable={false} className="aspect-[42/32] w-[10%] object-contain" />
              <p className="text-black text-sm font-medium">Net Banking</p>
            </div>
            <div
              className="flex cursor-pointer items-center text-sm font-medium text-brand-color3"
              onClick={() => {
                handleNetBanking();
                onClose();
              }}
            >
              Add
              <RiArrowRightSLine className="ml-1 text-lg" />
            </div>
          </WhiteBackgroundWrapper>

          {/* OR Divider */}
          <div className="text-gray-400 my-4 flex items-center justify-center text-sm font-medium">
            <div className="h-[1px] flex-1 bg-black-dark4" />
            <span className="mx-2">OR</span>
            <div className="h-[1px] flex-1 bg-black-dark4" />
          </div>

          {/* Cash on Delivery Option */}
          <WhiteBackgroundWrapper className="flex items-center justify-between rounded-lg bg-white-light3 p-6 text-base font-semibold text-black-dark1 shadow-md hover:shadow-lg">
            <div className="flex w-full items-center gap-3">
              <div className="aspect-[42/32] w-[10%] rounded-full bg-brand-color1" />
              <p className="text-sm font-medium">Cash on Deliver</p>
            </div>
            <div
              className="flex cursor-pointer items-center text-sm font-medium text-brand-color3"
              onClick={() => {
                handleCashOnDelivery();
                onClose();
              }}
            >
              Go
              <RiArrowRightSLine className="ml-1 text-lg" />
            </div>
          </WhiteBackgroundWrapper>
        </div>
      </div>
    </BaseModal>
  );
};

export default PaymentModal;
