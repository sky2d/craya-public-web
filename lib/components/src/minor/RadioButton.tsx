import React from "react";

interface RadioButtonProps {
  checked?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ checked = false, label, onChange, disabled = false, className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={`flex items-center ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"} ${className}`}>
      <input type="radio" checked={checked} onChange={handleChange} disabled={disabled} className="hidden" />
      <span
        className={`relative flex h-6 w-6 items-center justify-center rounded-full border ${checked ? "border-brand-color1 bg-brand-color1" : "bg-white-Light3 border-brand-color3"}`}
      >
        {checked && <span className="absolute h-3 w-3 rounded-full bg-white-light4"></span>}
      </span>
      <span className={`ml-2 ${disabled ? "text-white-light4" : ""} body-md`}>{label}</span>
    </label>
  );
};
