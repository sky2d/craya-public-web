import { ReactNode } from "react";

interface QuantityPickerProps {
  label: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  handleLeftIconClick?: (event: React.FormEvent) => void;
  handleRightIconClick?: (event: React.FormEvent) => void;
  disabled?: boolean;
}

export const QuantityPicker: React.FC<QuantityPickerProps> = ({
  label,
  leftIcon,
  disabled,
  rightIcon,
  handleLeftIconClick,
  handleRightIconClick,
}) => {
  return (
    <div className="join flex h-8 items-center rounded-lg bg-brand-color1 px-4 py-1 text-white-light4">
      {leftIcon && (
        <span
          className={`mr-2 flex ${disabled ? "cursor-not-allowed" : "cursor-pointer"} items-center`}
          onClick={e => {
            if (!disabled && handleLeftIconClick) handleLeftIconClick(e);
          }}
        >
          {leftIcon}
        </span>
      )}
      {label}
      {rightIcon && (
        <span
          className={`ml-2 flex ${disabled || !handleRightIconClick ? "cursor-not-allowed" : "cursor-pointer"} items-center`}
          onClick={e => {
            if (!disabled && handleRightIconClick) handleRightIconClick(e);
          }}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
};
