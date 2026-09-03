"use client";
import React from "react";

interface FancyButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FancyButton: React.FC<FancyButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`${className} rounded-md bg-brand-color2 text-center text-white-light4 shadow-2xl shadow-black-dark4 heading-5 hover:opacity-60`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FancyButton;
