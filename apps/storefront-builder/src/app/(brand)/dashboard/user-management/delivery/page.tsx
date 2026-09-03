"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useLoadingContext } from "@/provider/LoadingProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { Address } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2, Loading } from "components/src/minor";
import { useCallback } from "react";

const DeliveryPage = () => {
  const { storePickupAddress, setStorePickupAddress, storePickupError } = useStoreContext();
  const { loading } = useLoadingContext();

  const handleChange = useCallback(
    (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStorePickupAddress({ ...(storePickupAddress || {}), [field]: e.target.value } as Address);
    },
    [setStorePickupAddress, storePickupAddress],
  );

  const addressFields = [
    { key: "customerName", label: "Name to be asked for at the centre :", placeholder: "Store Name" },
    { key: "area", label: "Address Line 1 :", placeholder: "Address Line 1" },
    { key: "flatNumber", label: "Address Line 2 ", placeholder: "Address Line 2" },
    { key: "landMark", label: "Landmark :", placeholder: "Landmark" },
  ] as const;

  const gridFields = [
    { key: "town", label: "City :", placeholder: "City" },
    { key: "state", label: "State/Province :", placeholder: "State/Province" },
    { key: "pinCode", label: "Zip Postal Code :", placeholder: "Postal Code" },
    { key: "phoneNumber", label: "Phone Number :", placeholder: "Phone Number" },
  ] as const;

  if (loading) return <Loading isCentre />;

  return (
    <div className="flex w-full flex-col gap-2 px-2">
      <WhiteBackgroundWrapper className="w-full text-start text-xl font-medium">Delivery Setup :</WhiteBackgroundWrapper>

      <WhiteBackgroundWrapper className="flex flex-col gap-4">
        <p className="text-gray-700 font-medium">🚚 Shipment Pickup Address :</p>

        <div className="flex flex-col">
          {addressFields.map((field, index) => (
            <div key={field.key} className="w-full p-1">
              <Label>{field.label}</Label>
              <InputField2
                dataIndex={index}
                type={InputFieldType.TEXT}
                placeholder={field.placeholder}
                value={storePickupAddress?.[field.key] || ""}
                onChange={handleChange(field.key)}
                errorMessage={storePickupError?.[field.key]}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gridFields.map((field, index) => (
            <div key={field.key} className="w-full">
              <Label>{field.label}</Label>
              <InputField2
                dataIndex={index + addressFields.length}
                type={InputFieldType.TEXT}
                placeholder={field.placeholder}
                value={storePickupAddress?.[field.key] || ""}
                onChange={handleChange(field.key)}
                errorMessage={storePickupError?.[field.key]}
              />
            </div>
          ))}
        </div>
      </WhiteBackgroundWrapper>
    </div>
  );
};

export default DeliveryPage;
