"use client";
import React from "react";

interface FancyButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const BuiltInButton: React.FC<FancyButtonProps> = ({ text, icon, className, onClick }) => {
  return (
    <div className={`relative inline-block hover:translate-y-1 ${className}`} onClick={onClick}>
      <div className="absolute left-[-4px] top-1 z-0 h-full w-full rounded-full border-[1px] border-black-dark1 bg-[#B8B9E3]"></div>

      <div className="border-black relative z-10 flex items-center justify-center gap-2 rounded-full border bg-brand-color2 px-6 py-3 shadow-sm">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="px-1 text-base font-semibold text-white-light4 sm:text-[1.2vw]">{text}</span>
      </div>
    </div>
  );
};
