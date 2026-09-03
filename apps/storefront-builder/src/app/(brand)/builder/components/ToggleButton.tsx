"use client";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { ButtonType, IconPosition } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import { GrRevert } from "react-icons/gr";
import { HiMiniComputerDesktop, HiMiniDevicePhoneMobile } from "react-icons/hi2";
export const ToggleButton = () => {
  const { viewMode, setViewMode } = useBuilderContext();

  const handleSwitch = () => {
    setViewMode(viewMode === "Desktop" ? "Mobile" : "Desktop");
  };

  return (
    <div className="flex cursor-pointer select-none items-center">
      <div className="flex items-center gap-3">
        {/* Desktop Icon Button */}
        <button
          onClick={() => setViewMode("Desktop")}
          className={`transition-colors duration-200 ${
            viewMode === "Desktop" ? "text-brand-color1" : "hover:bg-gray-100 text-brand-color3 hover:text-white-light7"
          }`}
          aria-label="Desktop view"
        >
          <HiMiniComputerDesktop size={24} />
        </button>

        {/* Mobile Icon Button */}
        <button
          onClick={() => setViewMode("Mobile")}
          className={`transition-colors duration-200 ${
            viewMode === "Mobile" ? "text-brand-color1" : "hover:bg-gray-100 text-brand-color3 hover:text-white-light7"
          }`}
          aria-label="Mobile view"
        >
          <HiMiniDevicePhoneMobile size={24} />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-white-light7"></div>

        {/* Revert Changes Button */}
        <Button2
          iconsPosition={IconPosition.LEFT}
          label="revert changes"
          type={ButtonType.PRIMARY}
          buttonSize="md"
          icon={<GrRevert />}
          handleClick={handleSwitch}
        />
      </div>
    </div>
  );
};
