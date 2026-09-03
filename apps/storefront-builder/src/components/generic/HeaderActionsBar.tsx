import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import React from "react";
import { DashboardNextButton } from "../dashboard/DashboardNextButton";

type HeaderActionsBarProps = {
  text: string;
  showCancelButton?: boolean;
  onCancelClick?: () => void;
};

const HeaderActionsBar: React.FC<HeaderActionsBarProps> = ({ text, showCancelButton = false, onCancelClick }) => {
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
        <DashboardNextButton />
      </div>
    </div>
  );
};

export default HeaderActionsBar;
