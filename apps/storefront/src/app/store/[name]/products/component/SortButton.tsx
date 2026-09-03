import { useState } from "react";

interface SortButtonProps {
  onSort: (sortType: string) => void;
  primaryColor?: string;
}

export const SortButton = ({ onSort, primaryColor }: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSortOptionClick = (sortType: string) => {
    onSort(sortType);
    setIsOpen(!isOpen);
  };

  const sortOptions = [
    { key: "price-high-low", label: "Price - High to Low" },
    { key: "price-low-high", label: "Price - Low to High" },
    { key: "best-selling", label: "Best Selling" },
    { key: "new-arrival", label: "New Arrival" },
  ];

  return (
    <div className="relative w-full p-2 sm:w-1/4" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <button
        suppressHydrationWarning
        id="dropdownHoverButton"
        className="inline-flex w-full items-center justify-center rounded-lg border-[1px] px-5 py-2.5 text-center text-sm font-medium"
        type="button"
        style={{ border: primaryColor ? `1px solid ${primaryColor}` : "#7C54E9", color: primaryColor ? primaryColor : "#7C54E9" }}
      >
        Sort
        <svg className="ms-3 h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="dark:bg-gray-700 absolute right-0 z-20 mt-2 w-full divide-y rounded-lg bg-white-light3 shadow-lg">
          <ul>
            {sortOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSortOptionClick(option.key)}
                className="cursor-pointer rounded-lg px-4 py-2 transition-all duration-200"
                style={
                  {
                    backgroundColor: "transparent",
                    color: "inherit",
                    "--hover-bg": primaryColor || "#7C54E9",
                    "--hover-text": "#ffffff",
                  } as React.CSSProperties
                }
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                  e.currentTarget.style.color = "var(--hover-text)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "inherit";
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
