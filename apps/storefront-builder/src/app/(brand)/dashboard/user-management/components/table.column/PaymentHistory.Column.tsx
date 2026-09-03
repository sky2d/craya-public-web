import type { ColumnsType } from "antd/es/table";

interface Transaction {
  id: number;
  from: string;
  date: string;
  amount: number;
}

export const getPaymentTableColumns = (): ColumnsType<Transaction> => [
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (from: string) => <span className="text-[clamp(14px,0.9vw,17px)] font-normal">{from}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => <span className="text-[clamp(14px,0.9vw,17px)] font-normal">{date}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => <span className="text-[clamp(14px,0.9vw,17px)] font-normal">{amount}</span>,
  },
];
