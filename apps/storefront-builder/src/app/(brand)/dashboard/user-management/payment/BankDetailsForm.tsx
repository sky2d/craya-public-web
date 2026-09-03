"use client";

import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useUserContext } from "@/provider/UserProvider";
import { BankPayment, PaymentType } from "components/src/interfaces";
import { InputFieldType } from "components/src/interfaces/InputField";
import { InputField2 } from "components/src/minor";
import { BankCard } from "./BankCard";

export const BankDetailsForm = () => {
  const { bankDetails, bankErrors, setBankDetails } = useUserContext();
  const handleChange = (field: keyof BankPayment) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (setBankDetails) {
      setBankDetails({ ...(bankDetails as BankPayment), paymentType: PaymentType.BANK, [field]: e.target.value });
    }
  };
  return (
    <div className="flex h-full w-full flex-col justify-between gap-2 lg:flex-row">
      <BankCard />
      <div className="h-full w-full space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Beneficiary Name :</Label>
            <InputField2
              dataIndex={0}
              type={InputFieldType.TEXT}
              placeholder="Beneficiary Name"
              value={bankDetails?.bankAccountHolder || ""}
              onChange={handleChange("bankAccountHolder")}
              errorMessage={bankErrors?.accountHolder}
            />
          </div>

          <div>
            <Label>IFSC Code :</Label>
            <InputField2
              dataIndex={1}
              type={InputFieldType.TEXT}
              placeholder="IFSC Code"
              value={bankDetails?.bankIfsc || ""}
              onChange={handleChange("bankIfsc")}
              errorMessage={bankErrors?.ifsc}
            />
          </div>

          <div>
            <Label> Account Number :</Label>
            <InputField2
              dataIndex={2}
              type={InputFieldType.TEXT}
              placeholder="Bank Account Number"
              value={bankDetails?.bankAccountNumber || ""}
              onChange={handleChange("bankAccountNumber")}
              errorMessage={bankErrors?.accountNumber}
            />
          </div>

          <div>
            <Label>Bank Name :</Label>
            <InputField2
              dataIndex={3}
              type={InputFieldType.TEXT}
              placeholder="Bank Name"
              value={bankDetails?.bankName || ""}
              onChange={handleChange("bankName")}
              errorMessage={bankErrors?.bankName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
