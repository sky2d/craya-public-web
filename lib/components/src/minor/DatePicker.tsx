"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdErrorOutline } from "react-icons/md";

interface DatePickerComponentProps {
  value?: string;
  endDate?: string;
  errorMessage?: string;
  onChange?: (date: Date | null) => void;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ value, endDate, errorMessage, onChange }) => {
  const datePickerClass = `w-full ${errorMessage ? "rounded-lg border border-1 input-error" : `rounded-lg border border-1 border-brand-color3`} `;
  return (
    <>
      <DatePicker
        showIcon
        selected={value ? new Date(value) : null}
        onChange={onChange}
        showPopperArrow={false}
        maxDate={endDate ? new Date(endDate) : undefined}
        placeholderText="Enter your Date of birth"
        className={datePickerClass}
      />
      {errorMessage && (
        <div className="mt-1 flex items-center text-red-500">
          <MdErrorOutline className="mr-1 text-lg" />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
};
