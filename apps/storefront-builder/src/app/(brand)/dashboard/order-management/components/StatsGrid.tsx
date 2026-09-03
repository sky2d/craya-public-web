"use client";

import { ShoppingOutlined } from "@ant-design/icons";
import { StatCard } from "components/src/minor/StatCard";

const statsData = [
  {
    title: "Total Orders",
    icon: <ShoppingOutlined style={{ fontSize: "20px" }} />,
    infoText: "This card shows the total number of canceled, returned, and damaged orders.",
    stats: [
      { label: "Canceled", value: 30, change: "-20%", changeColor: "red" as const },
      { label: "Returned", value: 20 },
      { label: "Damaged", value: 5 },
    ],
  },
  {
    title: "Total Sales",
    icon: <ShoppingOutlined style={{ fontSize: "20px" }} />,
    infoText: "This card shows the total sales made during the selected period.",
    stats: [
      { label: "Last Month", value: "1.2k", change: "+15%", changeColor: "green" as const },
      { label: "Last Week", value: 450 },
      { label: "Today", value: 85 },
    ],
  },
  {
    title: "New Customers",
    icon: <ShoppingOutlined style={{ fontSize: "20px" }} />,
    infoText: "This card shows the total number of new customers acquired during the selected period.",
    stats: [
      { label: "Organic", value: 250, change: "+5%", changeColor: "green" as const },
      { label: "Referral", value: 120 },
      { label: "Campaign", value: 98 },
    ],
  },
  {
    title: "Pending Issues",
    icon: <ShoppingOutlined style={{ fontSize: "20px" }} />,
    infoText: "This card shows the total number of new tickets, open issues, and overdue tasks.",
    stats: [
      { label: "New Tickets", value: 15, change: "+3%", changeColor: "green" as const },
      { label: "Open", value: 42 },
      { label: "Overdue", value: 3 },
    ],
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((data, index) => (
        <StatCard key={index} title={data.title} infoText={data.infoText} icon={data.icon} stats={data.stats} />
      ))}
    </div>
  );
};
