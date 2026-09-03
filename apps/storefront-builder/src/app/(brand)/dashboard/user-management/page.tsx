"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useLoadingContext } from "@/provider/LoadingProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { SocialContacts } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2, Loading } from "components/src/minor";
import React from "react";

interface FieldConfig<T> {
  key: keyof T;
  label: string;
  placeholder: string;
  type?: InputFieldType;
}

function RenderFieldGroup<T extends object>({
  title,
  fields,
  startIndex = 0,
  data,
  setData,
  errors = {},
}: {
  title: string;
  fields: FieldConfig<T>[];
  startIndex?: number;
  data: T;
  setData: (newData: T) => void;
  errors?: Partial<Record<keyof T, string>>;
}) {
  const handleChange = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [field]: e.target.value as T[keyof T],
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <WhiteBackgroundWrapper className="w-full text-start text-xl font-medium">{title}</WhiteBackgroundWrapper>

      <WhiteBackgroundWrapper className="flex w-full flex-col gap-2 p-4 text-start">
        {fields.map((field, index) => (
          <div key={String(field.key)} className="w-full p-1">
            <Label>{field.label}</Label>
            <InputField2
              dataIndex={startIndex + index}
              type={field.key === "dob" ? InputFieldType.DATE : field.type || InputFieldType.TEXT}
              placeholder={field.placeholder}
              value={String(data[field.key] || "")}
              onChange={handleChange(field.key)}
              errorMessage={errors[field.key] || ""}
            />
          </div>
        ))}
      </WhiteBackgroundWrapper>
    </div>
  );
}

const Page = () => {
  const { user, userErrors, setUser } = useUserContext();
  const { storeSocials, storeSocialError, setStoreSocials } = useStoreContext();
  const { loading } = useLoadingContext();

  const basicDetailsLeft = [
    { key: "sellerName", label: "Full Name", placeholder: "Enter your name" },
    { key: "gender", label: "Gender", placeholder: "Enter your gender" },
    { key: "email", label: "Email", placeholder: "Enter your email" },
    { key: "dob", label: "Date of Birth", placeholder: "Enter your date of birth" },
    { key: "phone", label: "Phone", placeholder: "Enter your phone" },
  ] as FieldConfig<typeof user>[];

  const basicDetailsRight = [
    { key: "instagram", label: "Instagram", placeholder: "Instagram handle" },
    { key: "facebook", label: "Facebook", placeholder: "Facebook handle" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "WhatsApp handle" },
  ] as FieldConfig<SocialContacts>[];

  if (loading) return <Loading isCentre />;

  return (
    <div className="flex w-full gap-2 px-2">
      <RenderFieldGroup<typeof user>
        title="Basic Details :"
        fields={basicDetailsLeft}
        startIndex={1}
        data={user}
        setData={setUser}
        errors={userErrors || {}}
      />

      <RenderFieldGroup<SocialContacts>
        title="Store Links :"
        fields={basicDetailsRight}
        startIndex={4}
        data={storeSocials}
        setData={setStoreSocials}
        errors={storeSocialError || {}}
      />
    </div>
  );
};

export default Page;
