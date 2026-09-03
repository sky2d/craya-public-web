"use client";

import { StoreData } from "components/src/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface StorefrontContextType {
  storefront: StoreData | null;
}

interface StorefrontProviderProps {
  children: ReactNode;
  initialStoreData: StoreData | null;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export const StorefrontProvider: React.FC<StorefrontProviderProps> = ({ children, initialStoreData }) => {
  const [storefront] = useState<StoreData | null>(initialStoreData);

  return (
    <StorefrontContext.Provider
      value={{
        storefront: storefront,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
};

export const useStorefrontContext = () => {
  const context = useContext(StorefrontContext);
  if (context === undefined) {
    throw new Error("useStorefrontContext must be used within a StorefrontProvider");
  }
  return context as StorefrontContextType;
};
