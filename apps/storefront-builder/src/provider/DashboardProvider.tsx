"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface DashboardContextType {
  step: number;
  setStep: (step: number) => void;
}

const DashboardContext = createContext({});

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [step, setStep] = useState<number>(1);

  const value: DashboardContextType = { step, setStep };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = () => useContext(DashboardContext) as DashboardContextType;
