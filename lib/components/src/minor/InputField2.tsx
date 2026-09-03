"use client";

import { Input } from "antd";
import { useState } from "react";
import { MdErrorOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { InputFieldSize, InputFieldType } from "../interfaces/InputField";

interface InputField2Props {
  resizable?: boolean;
  autoResize?: boolean;
  type?: InputFieldType;
  rows?: number;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  iconPosition?: "left" | "right";
  icon?: React.ReactNode;
  onIconClick?: () => void;
  size?: InputFieldSize;
  onSubmit?: () => void;
  className?: string;
  dataIndex?: number;
}

export const InputField2: React.FC<InputField2Props> = ({
  resizable = false,
  rows = 1,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  disabled = false,
  errorMessage,
  icon,
  iconPosition,
  onIconClick,
  size,
  onSubmit,
  className,
  dataIndex,
}) => {
  const [inputType, setInputType] = useState(type);
  const { TextArea } = Input;

  const handleTogglePasswordVisibility = () => {
    setInputType(prevType => (prevType === "password" ? "text" : "password"));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const currentIndex = Number((e.target as HTMLElement).getAttribute("data-index"));
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-index]")).sort(
        (a, b) => Number(a.getAttribute("data-index")) - Number(b.getAttribute("data-index")),
      );

      const next = elements.find(el => Number(el.getAttribute("data-index")) === currentIndex + 1);
      next?.focus();

      if (!next && onSubmit) {
        onSubmit();
      }
    }
  };

  let SizeClass = "";

  switch (size) {
    case "small":
      SizeClass = "p-1";
      break;
    case "large":
      SizeClass = "p-4";
      break;
    default:
      SizeClass = "p-3";
      break;
  }

  return (
    <div className="relative flex w-full flex-col">
      <div className="relative flex items-center">
        {iconPosition === "left" && icon && (
          <span onClick={onIconClick} className="absolute left-3 cursor-pointer">
            {icon}
          </span>
        )}
        {resizable ? (
          <TextArea
            placeholder={placeholder}
            className={`w-full rounded-lg border-[#C7C7C8] px-[10px] py-1 font-normal hover:border-brand-color3 focus:border-brand-color3 focus:outline-none md:text-sm xl:text-[1vw] ${SizeClass} ${
              errorMessage ? "border-red-500" : ""
            }`}
            value={value}
            rows={rows}
            onChange={onChange}
            data-index={dataIndex}
            disabled={disabled}
          />
        ) : (
          <Input
            size={size}
            type={inputType}
            placeholder={placeholder}
            value={value}
            inputMode={inputType === "number" ? "numeric" : undefined}
            pattern={inputType === "number" ? "[0-9]*" : undefined}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            status={errorMessage ? "error" : ""}
            data-index={dataIndex}
            className={`w-full rounded-lg focus:border-brand-color3 focus:outline-none ${SizeClass} ${className} border-[#C7C7C8] px-[10px] py-1 text-sm font-normal hover:border-brand-color3 xl:text-[1vw] ${
              errorMessage ? "border-red-500" : ""
            } ${iconPosition === "left" ? "pl-8" : ""} ${iconPosition === "right" ? "pr-8" : ""}`}
          />
        )}

        {type === "password" && (
          <span onClick={handleTogglePasswordVisibility} className="absolute right-3 cursor-pointer">
            {inputType === "password" ? <MdVisibilityOff /> : <MdVisibility />}
          </span>
        )}
        {iconPosition === "right" && icon && (
          <span onClick={onIconClick} className="absolute right-3 cursor-pointer">
            {icon}
          </span>
        )}
      </div>
      {errorMessage && (
        <div className="mt-1 flex items-center text-red-500 body-sm">
          <MdErrorOutline className="mr-1" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
