"use client";
import { Policies } from "components/src/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface PolicyContextType {
  policies: Policies[];
  setPolicies: (policies: Policies[]) => void;

  selectedPolicy: Policies;
  setSelectedPolicy: (policy: Policies) => void;
}
const policyContext = createContext({} as PolicyContextType);

interface PolicyProviderProps {
  children: ReactNode;
}

const INTIAL_POLICY_DATA: Policies = {
  id: "",
  title: "",
  type: "",
  description: "",
  storeId: "",
  isFake: false,
};

export const PolicyProvider = ({ children }: PolicyProviderProps) => {
  const [policies, setPolicies] = useState<Policies[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<Policies>(INTIAL_POLICY_DATA);

  const value: PolicyContextType = {
    policies,
    setPolicies,
    selectedPolicy,
    setSelectedPolicy,
  };

  return <policyContext.Provider value={value}>{children}</policyContext.Provider>;
};

export const usePolicyContext = () => useContext(policyContext) as PolicyContextType;
