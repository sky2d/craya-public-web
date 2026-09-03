import Button from "antd/es/button";
import { ReactNode } from "react";
import { ButtonType, IconPosition } from "../interfaces/Buttons";

interface Button2Props {
  type: ButtonType;
  disabled?: boolean;
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl";
  label: string;
  iconsPosition?: IconPosition;
  icon?: ReactNode;
  background?: string;
  className?: string;
  handleClick?: (event: React.FormEvent) => void;
  onIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Button2: React.FC<Button2Props> = ({
  type,
  disabled = false,
  label,
  icon,
  iconsPosition,
  handleClick,
  onIconClick,
  background,
  className,
  buttonSize,
}) => {
  let buttonTypeClass = "";
  let sizeClass = "";

  switch (type) {
    case ButtonType.PRIMARY:
      buttonTypeClass = `bg-brand-color1 ${!background && "hover:!bg-brand-color1"} hover:opacity-90 `;
      break;
    case ButtonType.DEFAULT:
      buttonTypeClass = "border !border-black-dark2 hover:!border-brand-color1 !text-black-dark1 hover:!text-brand-color1  bg-!white-light3";
      break;
    case ButtonType.TEXT:
      buttonTypeClass = "text-black-dark-color4 hover:bg-black-dark3 bg-transparent border-none";
      break;
    case ButtonType.LINK:
      buttonTypeClass = "text-brand-color1 hover:text-brand-color1/80 underline bg-transparent border-none";
      break;
  }
  let disabledClass = "";
  if (disabled) {
    disabledClass = "opacity-50 !bg-white-light3 !text-black-dark1 cursor-not-allowed !border-black-dark1 ";
  }

  switch (buttonSize) {
    case "xs":
      sizeClass = "px-2 py-1";
      break;
    case "sm":
      sizeClass = "px-3 py-1.5 ";
      break;
    case "md":
      sizeClass = "px-4 py-3 ";
      break;
    case "lg":
      sizeClass = "px-7 py-5 ";
      break;
    case "xl":
      sizeClass = "px-8 py-7 ";
      break;
    default:
      sizeClass = "px-4 py-2 ";
  }

  return (
    <Button
      className={`${buttonTypeClass} ${disabledClass} w-full ${sizeClass} ${className} flex items-center justify-center rounded-lg transition-all duration-200`}
      type={type}
      style={{ backgroundColor: background }}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
    >
      {iconsPosition === "left" && (
        <span onClick={onIconClick} className={`mr-2 flex items-center`}>
          {icon}
        </span>
      )}
      {label}
      {iconsPosition === "right" && (
        <span className={`ml-2 flex items-center`} onClick={onIconClick}>
          {icon}
        </span>
      )}
    </Button>
  );
};
