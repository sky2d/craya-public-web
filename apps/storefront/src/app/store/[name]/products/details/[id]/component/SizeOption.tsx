import React from "react";

const SizeOption = React.memo(function SizeOption({
  size,
  selected,
  onClick,
  primaryColor,
}: {
  size: string;
  selected: boolean;
  onClick: () => void;
  primaryColor?: string;
}) {
  return (
    <div
      className={`border-gray-300 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-[1px] font-bold md:h-14 ${
        selected ? "text-white-light4" : ""
      }`}
      style={{
        backgroundColor: selected ? primaryColor : "transparent",
      }}
      onClick={onClick}
    >
      {size}
    </div>
  );
});
export default SizeOption;
