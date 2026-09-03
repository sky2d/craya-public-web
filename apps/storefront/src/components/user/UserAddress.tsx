import { useUserContext } from "@/provider/UserProvider";
import { validateAddressFields } from "@/services/validators/address.validator";
import { Address } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldSize, InputFieldType } from "components/src/interfaces/InputField";
import { Button2, InputField2 } from "components/src/minor";
import { useEffect, useState } from "react";

export const UserAddress = ({ onSave, editAddress }: { onSave: (address: Address) => void; editAddress?: Address }) => {
  const { addressErrors, setAddressErrors } = useUserContext();
  const [address, setAddress] = useState<Address>(() => ({
    flatNumber: "",
    area: "",
    landMark: "",
    town: "",
    state: "",
    pinCode: "",
    phoneNumber: "",
    customerName: "",
    isSelected: true,
  }));

  useEffect(() => {
    if (editAddress) {
      setAddress(editAddress);
    }
  }, [editAddress]);

  const addressFields = [
    { key: "customerName", label: "Customer Name", placeholder: "Type here..." },
    { key: "flatNumber", label: "Flat, House no., Building", placeholder: "Eg. E-2039, Star towers" },
    { key: "area", label: "Area, Street, Sector, Village", placeholder: "Eg. Rohini Sector 17" },
    { key: "landMark", label: "Landmark", placeholder: "Eg. Near Petrol Pump" },
    { key: "town", label: "Town/City", placeholder: "Eg. Delhi" },
    { key: "state", label: "State", placeholder: "Eg. Delhi" },
    { key: "pinCode", label: "Pincode", placeholder: "Eg. 201014" },
    { key: "phoneNumber", label: "Phone Number", placeholder: "Type here..." },
  ] as const;

  const handleStoreDetailChange = (key: keyof Address, value: string) => {
    setAddress(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const validationErrors = validateAddressFields(address);
    if (validationErrors) {
      setAddressErrors(validationErrors);
      return;
    }
    setAddressErrors(undefined);
    onSave(address);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="grid w-full grid-cols-1 items-end gap-2 sm:grid-cols-2">
        {addressFields.map(field => (
          <div className="my-1 w-full" key={field.key}>
            <label className="block px-2 text-sm text-textColor body-sm">{field.label}</label>
            <InputField2
              type={InputFieldType.TEXT}
              size={InputFieldSize.SMALL}
              placeholder={field.placeholder}
              onChange={e => handleStoreDetailChange(field.key, e.target.value)}
              value={address[field.key]!.toString()}
              errorMessage={addressErrors?.[field.key]?.toString()}
              onSubmit={handleSave}
            />
          </div>
        ))}
      </div>
      <div className="my-4 w-full">
        <Button2 type={ButtonType.PRIMARY} label="Save Address" handleClick={handleSave} />
      </div>
    </div>
  );
};
