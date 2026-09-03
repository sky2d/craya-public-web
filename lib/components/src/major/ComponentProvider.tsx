import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type ComponentProviderProps = {
  children: ReactNode;
};

export const ComponentProvider: React.FC<ComponentProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
