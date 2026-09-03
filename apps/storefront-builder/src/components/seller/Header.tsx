import React from "react";

interface HeaderProps {
  label: string;
  isCancel?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  return <div>Header</div>;
};
