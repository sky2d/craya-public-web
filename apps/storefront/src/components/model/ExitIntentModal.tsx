"use client";

import ExitDoor from "@/assets/icons/ExitIntent.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { BaseModal } from "components/src/major/BaseModal";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import { FC } from "react";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal: FC<ExitIntentModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "60%",
        xxl: "50%",
      }}
      className="overflow-hidden rounded-xl"
      padding="0"
      borderRadius="12px"
    >
      <div className="relative h-full min-h-[300px] w-full sm:min-h-[80vh]">
        {/* Background Image */}
        <Image src={ExitDoor} draggable={false} alt="Exit Background" fill priority className="object-cover" />

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-start px-6 py-10 sm:px-12">
          <h1 className="mb-3 text-4xl font-extrabold text-white-light4 drop-shadow-md sm:text-[6vw]">Wait!</h1>
          <p className="mb-6 text-xl font-black text-white-light4 drop-shadow-[2px_2px_0px_rgba(253,224,71,1)] sm:text-[2.5vw]">Are you sure you </p>
          <p className="mb-6 text-xl font-black text-white-light4 drop-shadow-[2px_2px_0px_rgba(253,224,71,1)] sm:text-[2.5vw]">want to miss out?</p>
          <div className="w-auto">
            <Button2 type={ButtonType.PRIMARY} label="Keep Exploring" handleClick={onClose} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
