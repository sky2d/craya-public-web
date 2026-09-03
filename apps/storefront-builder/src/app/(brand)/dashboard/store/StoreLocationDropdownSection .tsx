"use client";

import StateAndCityMap from "@/constant/StateAndCityMap";
import { Store } from "components/src/interfaces";
import { Dropdown, showPopup } from "components/src/minor";
import { useEffect, useMemo, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

type Props = {
  store: Store;
  setStore: (store: Store) => void;
  errorMessage?: string;
};

const StoreLocationDropdownSection = ({ store, setStore, errorMessage }: Props) => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const [city, state] = useMemo(() => {
    if (!store.address) return ["", ""];
    const parts = store.address.split(", ").filter(Boolean);
    if (parts.length === 1) return ["", parts[0]];
    return parts;
  }, [store.address]);

  const handleStateSelect = (selectedState: string) => {
    const cities = StateAndCityMap[selectedState] || [];
    setAvailableCities(cities);

    setStore({
      ...store,
      address: `, ${selectedState}`,
    });
  };

  const handleCitySelect = (selectedCity: string) => {
    const currentState = state || "";

    if (!currentState) {
      showPopup("error", "Please select a State");
      return;
    }

    setStore({
      ...store,
      address: `${selectedCity}, ${currentState}`.trim(),
    });
  };

  useEffect(() => {
    if (state) {
      setAvailableCities(StateAndCityMap[state.toString()] || []);
    }
  }, [state]);

  return (
    <>
      <div className="flex w-full gap-2 p-1">
        <Dropdown
          label="State"
          key={state}
          options={Object.keys(StateAndCityMap)}
          defaultOption={state || "State"}
          onSelect={handleStateSelect}
          className="flex-1"
        />

        {city
          ? availableCities.length > 0 && (
              <Dropdown
                label="City"
                key={city}
                options={availableCities}
                defaultOption={city || "City"}
                onSelect={handleCitySelect}
                className="flex-1"
              />
            )
          : availableCities.length > 0 && (
              <Dropdown label="City" options={availableCities} defaultOption={city || "City"} onSelect={handleCitySelect} className="flex-1" />
            )}
      </div>
      {errorMessage && (
        <div className="mt-1 flex items-center text-red-500 body-sm">
          <MdErrorOutline className="mr-1" />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default StoreLocationDropdownSection;
