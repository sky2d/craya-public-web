import SearchComponent from "@/components/navbar/SearchComponent";
import { ButtonType, IconPosition } from "components/src/interfaces/Buttons";
import { Overlay } from "components/src/major/wrapper/Overlay";
import { Button2 } from "components/src/minor";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

export const FilterButton = () => {
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const handleClickOutside = () => {
    setIsSearchDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsSearchDropdownOpen(prev => !prev);
  };

  return (
    <div className="relative w-full p-2 sm:w-1/4">
      {isSearchDropdownOpen && <Overlay isOpen={isSearchDropdownOpen} handleClickOutside={handleClickOutside} />}
      {isSearchDropdownOpen && <SearchComponent isSearchDropdownOpen={isSearchDropdownOpen} closeDropdown={toggleDropdown} />}
      <Button2 type={ButtonType.DEFAULT} label="Filter" iconsPosition={IconPosition.LEFT} icon={<FiFilter />} handleClick={toggleDropdown} />
    </div>
  );
};
