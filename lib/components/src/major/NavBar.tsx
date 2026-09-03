import Image from "next/image";
import React from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconButton } from "../minor";

interface NavBarProps {
  imageUrl: string;
  cartItemCount?: number;
  onHamburgerClick?: () => void;
  onSearchClick?: () => void;
  onHeartClick?: () => void;
  onCartClick?: () => void;
  onLogoClick?: () => void;
}

export const NavBar: React.FC<NavBarProps> = props => {
  return (
    <div className="flex w-full items-center justify-between p-4 lg:mx-auto lg:w-3/4">
      <div className="HamBurger-icon flex w-[35%] items-center justify-start sm:w-[20%]">
        <IconButton icon={RxHamburgerMenu} onClick={props.onHamburgerClick} iconStyle="text-xl duration-300 ease-in  hover:scale-105 sm:text-3xl" />
      </div>
      <div className="logo relative flex h-full min-h-10 w-full max-w-[30%] justify-center">
        {props.imageUrl && (
          <Image
            src={props.imageUrl}
            draggable={false}
            alt="Brand logo"
            onClick={props.onLogoClick}
            fill
            priority
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
            className="cursor-pointer rounded-md object-contain"
          />
        )}
      </div>
      <div className="icon-list flex w-[35%] items-center justify-end gap-2 sm:w-[20%]">
        <IconButton icon={IoSearchOutline} onClick={props.onSearchClick} iconStyle="text-xl duration-300 ease-in  hover:scale-105	sm:text-3xl" />
        <IconButton icon={IoMdHeartEmpty} onClick={props.onHeartClick} iconStyle="text-xl duration-300 ease-in  hover:scale-105 sm:text-3xl" />
        <div className="relative">
          <IconButton icon={BsCart2} onClick={props.onCartClick} iconStyle="text-xl duration-300 ease-in  hover:scale-105	sm:text-3xl" />
          {props.cartItemCount !== undefined && props.cartItemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-color1 text-xs text-white-light4">
              {props.cartItemCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
