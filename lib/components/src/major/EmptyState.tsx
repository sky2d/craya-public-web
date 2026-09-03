import React from "react";
import { ButtonType } from "../interfaces/Buttons";
import { Button2 } from "../minor";

interface EmptyStateProps {
  image: React.ReactNode;
  title: string;
  subtitle: string;
  onButtonClick?: () => void;
  buttonText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ image, title, subtitle, onButtonClick, buttonText = "Go Back" }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
      <div className="relative mb-6 flex aspect-square w-[80%] justify-center sm:w-[30%]">{image}</div>
      <h2 className="mb-2 text-xl font-bold text-black-dark1 sm:text-[1.8vw]">{title}</h2>
      <p className="text-gray-500 text-lg sm:text-[1vw]">{subtitle}</p>
      <div className="my-2 w-full sm:w-1/2">
        <Button2 type={ButtonType.PRIMARY} buttonSize="md" handleClick={onButtonClick} label={buttonText}></Button2>
      </div>
    </div>
  );
};

export default EmptyState;
