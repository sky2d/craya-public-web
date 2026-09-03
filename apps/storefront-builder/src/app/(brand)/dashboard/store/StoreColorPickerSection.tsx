"use client";

import { Label } from "@/components/homeScreen/sellers/components/Label";
import { ColorPicker } from "antd";
import { Store } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2 } from "components/src/minor";
import { useEffect, useState } from "react";

type Props = {
  store: Store;
  setStore: (store: Store) => void;
  storeError?: string;
};

const StoreColorPickerSection = ({ store, setStore, storeError }: Props) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const openColorModal = () => {
    setIsColorModalOpen(true);
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isColorModalOpen && !(event.target as HTMLElement).closest(".color-modal")) {
        closeColorModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorModalOpen]);
  return (
    <div className="w-full p-1">
      <Label>Add Hex Code For Color Theme</Label>
      <div className="flex items-center justify-center gap-2" onClick={openColorModal}>
        <ColorPicker
          className="hover:border-brand-color3 focus:border-brand-color3 focus:outline-none"
          value={store.primaryColor}
          onChange={color => setStore({ ...store, primaryColor: color.toHexString() })}
        />
        <InputField2
          dataIndex={2}
          type={InputFieldType.TEXT}
          placeholder="Add Hex Code"
          onChange={e => setStore({ ...store, primaryColor: e.target.value })}
          value={store.primaryColor}
          errorMessage={storeError}
        />
      </div>
    </div>
  );
};

export default StoreColorPickerSection;
