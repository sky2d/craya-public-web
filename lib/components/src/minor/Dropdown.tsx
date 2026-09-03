"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect: (value: string) => void;
  className?: string;
  defaultOption?: string;
  error?: string;
  disable?: boolean;
  textSize?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  className = "",
  defaultOption = "Select an option",
  error,
  disable,
  textSize = "md:text-sm xl:text-[1vw]",
}) => {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <label className="block px-2 py-1 font-normal text-textGray sm:text-[13px] xl:text-[0.9vw]">{label}</label>}
      <div
        className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#C7C7C8] px-[10px] py-1 font-normal hover:border-brand-color3 focus:border-brand-color3 focus:outline-none ${textSize} ${disable ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        onClick={() => !disable && setIsOpen(!isOpen)}
      >
        <span className="text-black-dark2">{selected}</span>
        <span className={`transform text-brand-color3 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <IoIosArrowDown />
        </span>
      </div>
      {isOpen && (
        <div className="bg-white absolute z-10 mt-2 max-h-48 w-full overflow-y-auto rounded-md border border-[#C7C7C8] bg-white-light4">
          <input
            type="text"
            className="w-full border-b border-[#C7C7C8] px-[10px] py-1 font-normal shadow-md hover:border-[#C7C7C8] focus:border-[#C7C7C8] focus:outline-none md:text-sm xl:text-[1vw]"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          {filteredOptions.map(option => (
            <div
              key={option}
              className="cursor-pointer rounded-md px-[10px] py-1 text-base font-normal hover:bg-white-light3"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-state-error-dark">{error}</p>}
    </div>
  );
};
