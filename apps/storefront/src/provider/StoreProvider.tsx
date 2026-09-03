"use client";

import { Store } from "components/src/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface StoreContextType {
  storeDetails: Store | undefined;
  storeLoading: boolean;
  setStoreLoading: (storeLoading: boolean) => void;
}

const StoreContext = createContext({});

interface StoreProviderProps {
  children: ReactNode;
  initialStoreData: Store | undefined;
}

export const StoreProvider = ({ children, initialStoreData }: StoreProviderProps) => {
  const [storeDetails] = useState<Store | undefined>(initialStoreData);
  const [storeLoading, setStoreLoading] = useState<boolean>(false);

  const value: StoreContextType = {
    storeDetails,
    storeLoading,
    setStoreLoading,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => useContext(StoreContext) as StoreContextType;
