import { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { StorefrontComponentData, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { AllShoppableVideosFeed } from "./ShoppableVideoFeed";

interface VideoModalProps {
  startIndex: number;
  onClose: () => void;
  data: StorefrontComponentData;
  wishlistItems?: WishlistItems[];
  handlerFunction?: StorefrontHandlerFunction;
}

export const VideoModal: React.FC<VideoModalProps> = ({ startIndex, onClose, data, wishlistItems, handlerFunction }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex h-[100dvh] w-screen items-center justify-center bg-black-dark1 bg-opacity-90">
      <button
        className="absolute left-1/2 top-4 z-20 -translate-x-1/2 transform cursor-pointer rounded-full text-center text-2xl text-white-light4 sm:left-auto sm:right-4 sm:translate-x-0"
        onClick={onClose}
      >
        <MdOutlineCancel className="cursor-pointer text-3xl" />
      </button>
      <div className="relative flex h-full w-full justify-center">
        <AllShoppableVideosFeed defaultLoopIndex={startIndex} data={data} wishlist={wishlistItems} handlerFunction={handlerFunction} />
      </div>
    </div>
  );
};
