"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { useLoadingContext } from "@/provider/LoadingProvider";
import { useUserContext } from "@/provider/UserProvider";
import { PaymentType } from "components/src/interfaces";
import TableContent from "components/src/major/Table";
import { Loading } from "components/src/minor";
import { useState } from "react";
import { getPaymentTableColumns } from "../components/table.column/PaymentHistory.Column";
import { BankDetailsForm } from "./BankDetailsForm";
import { InitialPrompt } from "./InitialPrompt";
import { MethodSelector } from "./MethodSelector";
import { PayoutSummaryCard } from "./PayoutSummaryCard";
import { UpiDetailsForm } from "./UpiDetailsForm";

type ViewState = "initial" | "choose_method" | "add_bank" | "add_upi";

interface Transaction {
  id: number;
  from: string;
  date: string;
  amount: number;
}

const PayoutClient = () => {
  const { user } = useUserContext();
  const [view, setView] = useState<ViewState>("initial");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { loading } = useLoadingContext();

  const columns = getPaymentTableColumns();

  const transactions: Transaction[] = [
    { id: 1, from: "Craya", date: "12 Aug 2022 - 12:25 am", amount: 20000.0 },
    { id: 2, from: "Craya", date: "12 Aug 2022 - 12:25 am", amount: 20000.0 },
    { id: 3, from: "Craya", date: "12 Aug 2022 - 12:25 am", amount: 20000.0 },
    { id: 4, from: "Craya", date: "12 Aug 2022 - 12:25 am", amount: 20000.0 },
  ];

  const renderView = () => {
    if (user.payment?.paymentType === PaymentType.BANK) {
      return <BankDetailsForm />;
    }

    if (user.payment?.paymentType === PaymentType.UPI) {
      return <UpiDetailsForm />;
    }
    switch (view) {
      case "initial":
        return <InitialPrompt onAddAccount={() => setView("choose_method")} />;
      case "choose_method":
        return <MethodSelector onSelectBank={() => setView("add_bank")} onSelectUpi={() => setView("add_upi")} />;
      case "add_bank":
        return <BankDetailsForm />;
      case "add_upi":
        return <UpiDetailsForm />;
      default:
        return <InitialPrompt onAddAccount={() => setView("choose_method")} />;
    }
  };

  if (loading) return <Loading isCentre />;

  return (
    <>
      <div className="flex w-full gap-2">
        <WhiteBackgroundWrapper className="flex h-full min-h-[250px] w-[60%] flex-wrap items-center justify-center rounded-lg shadow-sm lg:col-span-2">
          {renderView()}
        </WhiteBackgroundWrapper>

        <div className="flex w-[40%] flex-wrap gap-2">
          <PayoutSummaryCard />
        </div>
      </div>

      <WhiteBackgroundWrapper className="w-full p-2">
        <TableContent<Transaction>
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          columns={columns}
          dataSource={transactions}
        />
      </WhiteBackgroundWrapper>
    </>
  );
};

export default PayoutClient;
