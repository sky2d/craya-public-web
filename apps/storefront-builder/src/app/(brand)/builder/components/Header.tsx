"use client";
import { useRouter } from "next/navigation";

import ColoredBlackLogo from "components/src/icons/iconFiles/krayaSvg/ColoredBlackLogo.svg";
import Image from "next/image";
import { ComponentStoreHeader } from "./ComponentStoreHeader";
import { ToggleButton } from "./ToggleButton";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="flex h-[9%] w-full items-center justify-between border border-[#CDCDCD] bg-white-light6">
      <div className="relative h-[40px] w-[170px]" onClick={() => router.push("/dashboard")}>
        <Image src={ColoredBlackLogo} alt="Colored Logo" fill className="cursor-pointer" />
      </div>
      <ToggleButton />
      <div className="flex w-1/4 items-center px-2">
        <ComponentStoreHeader />
      </div>
    </div>
  );
};
