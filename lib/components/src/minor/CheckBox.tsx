import { FaCheck } from "react-icons/fa6";

interface CheckBoxProps {
  checked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked = false, label, onChange, className, disabled = false }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={`flex items-center ${disabled ? "opacity-40" : ""}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} disabled={disabled} className="hidden" />
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md ${
          checked ? "bg-brand-color1 text-white-light2" : "border border-white-light1"
        } ${disabled ? "text-white-Light4 cursor-not-allowed border-white-light1 bg-black-dark3 opacity-40" : "cursor-pointer"} ${className}`}
      >
        {checked ? <FaCheck className="text-[10px] font-bold text-white-light4" /> : null}
      </span>
      {label && <span className={`ml-2 ${disabled ? "text-white-light4" : ""}`}>{label}</span>}
    </label>
  );
};
