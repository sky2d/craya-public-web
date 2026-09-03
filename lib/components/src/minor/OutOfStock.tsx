import Image from "next/image";
import { RiErrorWarningLine } from "react-icons/ri";
import soldOut from "../icons/iconFiles/soldOut.png";

export const OutOfStock = () => {
  return (
    <div className="relative m-2 flex h-[340px] w-[214px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl bg-brand-color1/50">
      <Image src={soldOut} alt="Sold Out" draggable={false} className="h-auto w-auto" />
    </div>
  );
};

export const StocksMissing = () => {
  return (
    <div className="h-full w-full cursor-pointer rounded-[10px] bg-brand-color1/50 p-2">
      <div className="item-center flex items-center justify-center gap-1 rounded-3xl border-2 border-white-light4 p-1 text-white-light4">
        <RiErrorWarningLine className="body-sm-bold" />
        <p className="body-xs-bold">Keep an eye on out of stock SKU</p>
      </div>
    </div>
  );
};
