"use client";

import React, { forwardRef, ReactNode, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IconButton } from "./IconButton";

interface InputFieldProps {
  type?: "text" | "number" | "email" | "password" | "date" | "tel";
  compress?: boolean;
  errorSpace?: boolean;
  placeholder?: string;
  value?: string | number;
  icon?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resizable?: boolean;
  error?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  autoResize?: boolean;
  width?: string;
  height?: string;
  iconPosition?: "left" | "right";
  borderRadius?: string;
  className?: string;
  iconClickHandler?: () => void;
  max?: string;
  id?: string;
}

// Forward ref to handle parent references
export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  (
    {
      id = "input",
      type = "text",
      placeholder = "",
      compress,
      value = "",
      icon,
      onChange,
      onKeyDown,
      resizable = false,
      autoResize = false,
      error = false,
      disabled = false,
      errorMessage = "Invalid input",
      width = "full",
      iconPosition = "left",
      className,
      height,
      errorSpace,
      borderRadius = "14px",
      iconClickHandler,
      max,
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);

    const handleTogglePasswordVisibility = () => {
      setInputType(prevType => (prevType === "password" ? "text" : "password"));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    const baseClasses = " transition-all duration-300";
    const normalClasses = "border-gray-300";
    const errorClasses = "border-red-500 relative";
    const disabledClasses = "opacity-50 cursor-not-allowed";
    const inputClasses = `h-full w-full ${compress ? "p-2" : "p-4"} overflow-y-auto focus:outline-none border-[#C7C7C8] rounded-lg border outline-none transition-all focus:border-bg-brand-color1 focus:ring-2 focus:ring-bg-brand-color1 focus:ring-opacity-50 hover:bg-zinc-100 focus:bg-white-light4`;

    const inputWrapperClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className ?? ""} ${
      disabled ? disabledClasses : ""
    }  flex items-center w-full ${iconPosition === "right" ? "flex-row-reverse" : "flex-row"}`;

    return (
      <div className={`relative flex w-full flex-col ${errorSpace ? "mb-4" : ""}`}>
        <div
          tabIndex={0}
          className={inputWrapperClasses}
          style={{
            borderRadius,
            width: width === "full" ? "100%" : width,
            height: height === "full" ? "100%" : height,
          }}
        >
          {icon && (
            <div onClick={iconClickHandler} className="flex-shrink-0 px-2">
              <IconButton buttonStyle="flex justify-center item-center" iconComponent={icon} />
            </div>
          )}
          {resizable || autoResize ? (
            <textarea
              id={id}
              placeholder={placeholder}
              value={String(value)}
              onChange={handleChange}
              onKeyDown={onKeyDown} // Pass onKeyDown to textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputClasses}
              style={{
                borderRadius,
                width: width === "full" ? "100%" : width,
                ...(autoResize
                  ? {
                      overflowY: "hidden",
                      height: "auto",
                    }
                  : {}),
                resize: resizable ? "vertical" : "none",
              }}
              disabled={disabled}
              wrap="hard"
              onInput={e => {
                if (autoResize) {
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.style.height = "auto";
                  textarea.style.height = textarea.scrollHeight + "px";
                  textarea.scrollTop = textarea.scrollHeight;
                }
              }}
            />
          ) : (
            <input
              id={id}
              type={inputType}
              placeholder={placeholder}
              value={String(value)}
              onChange={handleChange}
              onKeyDown={onKeyDown} // Pass onKeyDown to input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClasses}
              disabled={disabled}
              style={{
                borderRadius,
              }}
              max={type === "number" || type === "date" ? max : undefined}
            />
          )}
        </div>
        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
          >
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        )}
        {error && (
          <div className="mt-1 flex items-center text-red-500">
            <MdErrorOutline className="mr-1 text-lg" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
