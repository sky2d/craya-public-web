"use client";

import { useLoadingContext } from "@/provider/LoadingProvider";
import { usePolicyContext } from "@/provider/PolicyProvider";
import { Policies } from "components/src/interfaces";
import { Loading } from "components/src/minor";
import { useEffect, useState } from "react";
// optionally import updatePolicy later

interface RadioOption {
  label: string;
  value: string;
  description: string;
}

interface RadioGroupClientProps {
  storeId: string;
  initialValue?: Policies[];
  policyType: "return" | "exchange" | "cancellation";
}

const POLICY_OPTIONS: Record<string, RadioOption[]> = {
  exchange: [
    { label: "Exchange within 7 days of order", value: "7", description: "Items can be exchanged within 7 days of order" },
    { label: "Exchange within 14 days of order", value: "14", description: "Items can be exchanged within 14 days of order" },
    { label: "Exchange within 30 days of order", value: "30", description: "Items can be exchanged within 30 days of order" },
  ],
};

export const RadioGroupClient: React.FC<RadioGroupClientProps> = ({ storeId, initialValue, policyType }) => {
  const options = POLICY_OPTIONS[policyType];
  const { setPolicies, setSelectedPolicy } = usePolicyContext();
  const { loading } = useLoadingContext();

  const existingPolicy = initialValue?.find(p => p.type === policyType);
  const [selectedOption, setSelectedOption] = useState(
    existingPolicy ? options.find(opt => existingPolicy.description.includes(opt.value))?.value || options[0].value : options[0].value,
  );

  useEffect(() => {
    if (initialValue) {
      setPolicies(initialValue);
      if (existingPolicy) {
        setSelectedPolicy(existingPolicy);
      }
    }
  }, [initialValue, existingPolicy]);

  const handleChange = (value: string) => {
    setSelectedOption(value);
    const selected = options.find(o => o.value === value);
    if (!selected) return;
    const payload = {
      title: `${policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy`,
      description: selected.description,
      type: policyType,
      storeId,
      isFake: false,
    };

    setSelectedPolicy({ id: existingPolicy?.id || "", ...payload });
  };

  if (loading) return <Loading isCentre />;

  return (
    <div className="flex flex-col gap-2">
      {options.map(option => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 transition-all ${
            selectedOption === option.value ? "border-brand-color1 bg-purple-50 text-brand-color1" : "border-[#C7C7C8] text-[#C7C7C8]"
          }`}
        >
          <span>{option.label}</span>
          <input
            type="radio"
            name={`${policyType}-policy`}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleChange(option.value)}
            className="h-4 w-4 accent-purple-500"
          />
        </label>
      ))}
    </div>
  );
};
