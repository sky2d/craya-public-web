"use client";

import Image, { StaticImageData } from "next/image";
import { toast } from "react-hot-toast";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import ErrorImg from "../icons/popupImages/Error.png";
import SuccessImg from "../icons/popupImages/Success.png";
import WarningImg from "../icons/popupImages/Warning.png";

type PopupConfig = {
  style: string;
  popupIcon: React.ReactNode;
  src: StaticImageData;
  alt: string;
};

type PopupsProps = {
  type: "success" | "warning" | "error";
  message: string;
};

const getPopupConfig = (type: "success" | "warning" | "error"): PopupConfig => {
  switch (type) {
    case "success":
      return {
        style: "body-sm-semibold text-state-success-light",
        popupIcon: <FaRegCheckCircle size={24} />,
        src: SuccessImg,
        alt: "Success popup background",
      };
    case "warning":
      return {
        style: "body-sm-semibold text-state-warning-light",
        popupIcon: <MdErrorOutline size={24} />,
        src: WarningImg,
        alt: "Warning popup background",
      };
    case "error":
      return {
        style: "body-sm-semibold text-state-error-light",
        popupIcon: <IoWarningOutline size={24} />,
        src: ErrorImg,
        alt: "Error popup background",
      };
  }
};

export const Popups: React.FC<PopupsProps> = ({ type, message }) => {
  const { style, popupIcon, src, alt } = getPopupConfig(type);

  return (
    <div className="relative w-full">
      <div>
        <Image src={src} alt={alt} className="h-auto w-full" />
      </div>
      <div className={`absolute inset-0 flex -rotate-2 items-center justify-center pl-6 pr-2 ${style}`}>
        {popupIcon}
        <span className="ml-2 line-clamp-1">{message}</span>
      </div>
    </div>
  );
};

export const showPopup = (type: "success" | "warning" | "error", message: string) => {
  toast(() => <Popups type={type} message={message} />, {
    position: "top-right",
    duration: 2000,
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
    },
    id: type,
  });
};
