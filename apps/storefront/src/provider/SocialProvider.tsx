"use client";

import { Policies } from "components/src/interfaces";

import { createContext, ReactNode, useContext, useState } from "react";

interface SocialContextType {
  policies: Policies[];
}

const SocialContext = createContext({});

interface SocialProviderProps {
  children: ReactNode;
  data: Policies[];
}

export const SocialProvider = ({ children, data }: SocialProviderProps) => {
  const [policies] = useState<Policies[]>(data);

  const value: SocialContextType = { policies };

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
};

export const useSocialContext = () => useContext(SocialContext) as SocialContextType;
