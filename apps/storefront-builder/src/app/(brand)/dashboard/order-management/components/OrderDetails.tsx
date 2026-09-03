"use client";
import { CartItem } from "components/src/interfaces";
import { Order } from "components/src/interfaces/orders";
import TableContent from "components/src/major/Table";
import { useState } from "react";
import CustomerInfoCard from "./CustomerInfoCard";
import PaymentInfoCard from "./PaymentInfoCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import ProgressCard from "./ProgressCard";
import { getCartTableColumns } from "./table.column/CartTable.Column";

interface OrderDetailsPageProps {
  order: Order;
}
const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ order }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { address, user } = order;
  const columns = getCartTableColumns();

  return (
    <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
      {/* Left Column */}
      <div className="space-y-6 lg:col-span-2">
        <ProgressCard />
        <div className="my-4 rounded-lg border border-[#CDCDCD] bg-[#ffff] p-4">
          <h1 className="pb-2 text-[clamp(16px,1.2vw,22px)] font-semibold">Product</h1>
          <TableContent<CartItem>
            selectedRowKeys={selectedRowKeys}
            onSelectionChange={setSelectedRowKeys}
            columns={columns}
            dataSource={order.cart.cartItems}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <CustomerInfoCard user={user} address={address} />
        <PaymentInfoCard paymentGateway={order.paymentGateway} />
        <PaymentSummaryCard order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
