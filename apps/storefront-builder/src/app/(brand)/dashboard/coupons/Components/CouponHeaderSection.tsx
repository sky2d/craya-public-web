import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import React from "react";

interface HeaderSectionProps {
  text: string;
  showCancelButton?: boolean;
  onCancelClick?: () => void;
  handleClick: () => void;
  label: string;
}

export const CouponHeaderSection: React.FC<HeaderSectionProps> = ({ text, label, showCancelButton = false, onCancelClick, handleClick }) => {
  return (
    <div className="flex w-full items-center justify-between px-2 py-2">
      <h4 className="text-[clamp(24px,1.7vw,30px)] font-semibold">{text}</h4>

      <div className="flex h-full items-center justify-center gap-1">
        {showCancelButton && (
          <Button2
            type={ButtonType.DEFAULT}
            buttonSize="lg"
            label="Cancel"
            className="!w-1/2 !border-[1px] !border-[#6e6c6c] !text-[#6e6c6c]"
            handleClick={onCancelClick}
          />
        )}
        <Button2
          label={label}
          buttonSize="lg"
          className="border bg-brand-color1 !px-9 text-white-light4"
          type={ButtonType.PRIMARY}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};
