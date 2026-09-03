import { Label } from "@/components/homeScreen/sellers/components/Label";
import { useUserContext } from "@/provider/UserProvider";
import { BankPayment, PaymentType } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldType } from "components/src/interfaces/InputField";
import { Button2, InputField2 } from "components/src/minor";
import { UpiCard } from "./UpiCard";

export const UpiDetailsForm = () => {
  const { bankDetails, bankErrors, setBankDetails } = useUserContext();

  return (
    <div className="flex h-full w-full flex-col justify-between gap-2 md:flex-row">
      <UpiCard />
      <div className="w-full space-y-4">
        <div className="flex justify-end">
          <Button2 label="Account" className="ml-2 !w-auto" type={ButtonType.PRIMARY} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Beneficiary Name :</Label>
          <InputField2
            dataIndex={0}
            type={InputFieldType.TEXT}
            placeholder="Beneficiary Name"
            value={bankDetails?.bankAccountHolder || ""}
            onChange={e => setBankDetails?.({ ...(bankDetails as BankPayment), bankAccountHolder: e.target.value, paymentType: PaymentType.UPI })}
            errorMessage={bankErrors?.accountHolder}
          />
          <Label>UPI Id :</Label>
          <InputField2
            dataIndex={1}
            type={InputFieldType.TEXT}
            placeholder="UPI ID"
            value={bankDetails?.upi || ""}
            onChange={e => setBankDetails?.({ ...(bankDetails as BankPayment), upi: e.target.value, paymentType: PaymentType.UPI })}
            errorMessage={bankErrors?.upi}
          />
        </div>
      </div>
    </div>
  );
};
