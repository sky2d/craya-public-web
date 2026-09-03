"use client";

import { Input } from "antd";
const { TextArea } = Input;
import { MdErrorOutline } from "react-icons/md";

interface TextAreaFieldProps {
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
  minRows?: number;
  tabIndex?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  placeholder = "",
  value = "",
  onChange,
  disabled = false,
  errorMessage,
  className = "border-[1px] border-brand-color3",
  minRows = 3,
  tabIndex,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
  };

  return (
    <div className={`relative flex w-full flex-col`}>
      <TextArea
        className={`${className ?? ""} ${errorMessage ? "border-red-500" : ""}`}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        autoSize={{ minRows: minRows }}
        tabIndex={tabIndex}
      />
      {errorMessage && (
        <div className="mt-1 flex items-center text-sm text-red-500">
          <MdErrorOutline className="mr-1 text-lg" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
