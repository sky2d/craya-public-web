"use client";

import { useStoreContext } from "@/provider/StoreProvider";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { DeliveryStatusEnum, Order } from "components/src/interfaces/orders";
import TableContent from "components/src/major/Table";
import { showPopup } from "components/src/minor";
import SegmentedControl from "components/src/minor/SegmentedControl";
import { getOrders, printInvoice, printLabel } from "components/src/services/api/orders";
import { downloadFile } from "components/src/utils/downloadFile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getOrderTableColumns } from "./table.column/OrdersTable.columns";

const labelMap: Record<string, string> = {
  Pending: "PENDING",
  "Out for Pickup": "PICKUP_SCHEDULED",
  "In-Transit": "IN_TRANSIT",
  Completed: "DELIVERED",
  "Return/Exchange": "RETURN_REQUESTED",
  Delivered: "DELIVERED",
  "In-Progress": "IN_PROGRESS",
  "All Orders": "",
};

const TABS = ["Pending", "Out for Pickup", "In-Transit", "Delivered", "Return/Exchange", "All"];
const OrdersDashboard: React.FC<{ orderData: Order[]; totalOrders: number }> = ({ orderData, totalOrders }) => {
  const [alignValue, setAlignValue] = React.useState<string>("Pending");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(totalOrders);
  const [ordersData, setOrdersData] = useState<Order[]>(orderData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { store } = useStoreContext();
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (alignValue !== "Pending") {
        setLoading(true);
        const { data, error } = await getOrders({
          deliveryStatus: labelMap[alignValue] as DeliveryStatusEnum,
          seller: true,
        });
        if (error) {
          setOrdersData([]);
          setTotal(0);
        }
        if (data?.total) setTotal(data.total);
        if (data?.orders) setOrdersData(data.orders);
        setLoading(false);
      } else if (alignValue === "Pending") {
        setOrdersData(orderData);
        setTotal(totalOrders);
      }
    };
    fetchOrders();
  }, [alignValue]);

  const handlePrintInvoice = async (orderId: string) => {
    const { data, error } = await printInvoice(orderId);
    if (error || !data || !data.invoiceUrl) {
      showPopup("error", "Error generating invoice. Please try again later.");
      return;
    }
    downloadFile(data.invoiceUrl, `invoice_${orderId}.pdf`);
  };
  const handlePrintLabel = async (orderId: string) => {
    const { data, error } = await printLabel(orderId);
    if (error || !data) {
      showPopup("error", "Error generating label. Please try again later.");
      return;
    }
  };

  const columns = getOrderTableColumns(alignValue, {
    onViewMore: id => router.push(`/dashboard/order-management/${id}?storeId=${store.id}`),
    onPrintInvoice: handlePrintInvoice,
    onPrintLabel: handlePrintLabel,
  });

  return (
    <div className="my-4 rounded-lg border-[1px] border-[#CDCDCD] bg-[#FFFFFF] p-6">
      <div className="my-2 flex justify-between">
        <SegmentedControl options={TABS} value={alignValue} onChange={(newVal: string) => setAlignValue(newVal)} />
        <div className="flex h-7 gap-4">
          <Input placeholder="Search" prefix={<SearchOutlined className="site-form-item-icon" />} className="w-64" />
          <Button className="h-7" icon={<FilterOutlined />}>
            Filter
          </Button>
        </div>
      </div>

      <TableContent<Order>
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={setSelectedRowKeys}
        totalPage={total}
        columns={columns}
        dataSource={ordersData}
        loading={loading}
      />
    </div>
  );
};

export default OrdersDashboard;
