import { TableProps, Tag } from "antd";
import { Cart, PopoverPlacement } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Order } from "components/src/interfaces/orders";
import { Button2 } from "components/src/minor";
import { InfoPopover } from "components/src/minor/InfoPopoverProps";

interface ColumnActionsProps {
  onViewMore: (orderId: string) => void;
  onPrintInvoice: (orderId: string) => Promise<void>;
  onPrintLabel: (orderId: string) => Promise<void>;
}

export const getOrderTableColumns = (tab: string, actions: ColumnActionsProps): TableProps<Order>["columns"] => {
  const { onViewMore, onPrintInvoice, onPrintLabel } = actions;

  const baseColumns: TableProps<Order>["columns"] = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "orderId",
      render: (orderId: Order["id"]) => <span>{orderId ? `${orderId.slice(0, 8)}...` : ""}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "orderDate",
      render: (orderDate: Order["createdAt"]) => {
        const dateObj = new Date(orderDate);

        const date = dateObj.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        });

        const time = dateObj.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });

        return (
          <div>
            <p className="text-gray-800 text-[clamp(12px,0.7vw,14px)]">{date}</p>
            <p className="text-gray-500 text-[clamp(12px,0.7vw,14px)]">{time}</p>
          </div>
        );
      },
    },
    {
      title: "Customer Detail",
      dataIndex: "user",
      key: "customer",
      render: (_, record: Order) => {
        const { user } = record;
        const { address } = record;
        const content = (
          <>
            <h1 className="text-[clamp(12px,0.7vw,14px)] font-semibold text-brand-color1"> Contact Details</h1>
            <div className="space-y-1 pb-1 text-[clamp(12px,0.7vw,14px)] font-normal">
              {user.name && <p>Name: {user.name}</p>}
              {user.phone && <p>Phone: {user.phone}</p>}
              {user.email && <p>Email: {user.email}</p>}
            </div>

            <div className="space-y-1 pt-2 text-[clamp(12px,0.7vw,14px)] font-normal">
              {address?.area && <p>Area: {address.area}</p>}
              {address?.town && <p>Town: {address.town}</p>}
              {address?.state && <p>State: {address.state}</p>}
              {address?.pinCode && <p>Postal Code: {address.pinCode}</p>}
            </div>
          </>
        );
        const shortAddress = [address?.area, address?.town, address?.state].filter(Boolean).join(", ");

        return (
          <>
            <p className="text-gray-800 text-[clamp(12px,0.7vw,14px)]">{user.name}</p>
            {user.phone && <p className="text-gray-500 text-[clamp(12px,0.7vw,14px)]">{user.phone}</p>}
            {user.email && <p className="text-gray-500 text-[clamp(12px,0.7vw,14px)]">{user.email}</p>}
            <InfoPopover infoText={content} placement={PopoverPlacement.Bottom}>
              {shortAddress && (
                <p className="cursor-pointer truncate text-[clamp(12px,0.7vw,14px)] text-brand-color1 hover:underline">
                  {shortAddress.length > 25 ? shortAddress.slice(0, 25) + "..." : shortAddress}
                </p>
              )}
            </InfoPopover>
          </>
        );
      },
    },
    {
      title: "Products",
      dataIndex: "cart",
      key: "products",
      render: (cart: Cart) => {
        const productCount = cart.cartItems?.length || 0;
        return (
          <div>
            <p className="text-[clamp(12px,0.7vw,14px)]">
              {productCount} sku{productCount !== 1 ? "s" : ""}
            </p>

            <span className="cursor-pointer text-[clamp(12px,0.7vw,14px)] text-brand-color1 hover:underline">View Products</span>
          </div>
        );
      },
    },
    {
      title: "Order Total",
      dataIndex: "amount",
      key: "orderTotal",
      render: (_, record: Order) => (
        <div className="flex flex-col items-start">
          {record.amount === null ? (
            "N/A"
          ) : (
            <p className="font-semibold">₹{(record.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}

          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{record.paymentGateway}</span>
        </div>
      ),
    },
  ];

  if (tab === "Pending" || tab === "Out for Pickup") {
    baseColumns.push({
      title: "Invoice",
      key: "invoice",
      render: (_, record) => (
        <div className="flex flex-col gap-2">
          <Button2
            type={ButtonType.DEFAULT}
            handleClick={() => onPrintInvoice(record.id)}
            className="w-28 text-center text-[clamp(12px,0.7vw,14px)]"
            label="Print Invoice"
          />
          <Button2
            type={ButtonType.DEFAULT}
            handleClick={() => onPrintLabel(record.id)}
            className="w-28 text-center text-[clamp(12px,0.7vw,14px)]"
            label="Print Label"
          />
        </div>
      ),
    });
  }

  baseColumns.push(
    {
      title: "Status",
      dataIndex: "deliveryStatus",
      key: "status",
      render: (status: Order["deliveryStatus"]) => {
        const styles = {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
        switch (status) {
          case "PICKUP_SCHEDULED":
            styles.bgColor = "bg-[#FFF2E2]";
            styles.textColor = "text-black-dark1 text-[clamp(12px,0.7vw,14px)]";
            break;
          case "DELIVERED":
            styles.bgColor = "bg-[#DEEEE8]";
            styles.textColor = "text-[#005B29] text-[clamp(12px,0.7vw,14px)]";
            break;
          case "IN_PROGRESS":
            styles.bgColor = "bg-[#FFF2E2]";
            styles.textColor = "text-black-dark1 text-[clamp(12px,0.7vw,14px)]";
            break;
          case "PENDING":
            styles.bgColor = "bg-[#FF8D8D]";
            styles.textColor = "text-white-light4 text-[clamp(12px,0.7vw,14px)]";
            break;
        }
        return (
          <Tag bordered={false} className={`rounded-lg p-3 text-xs ${styles.bgColor} ${styles.textColor}`}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "View more",
      key: "viewMore",
      render: (_, record) => <Button2 type={ButtonType.PRIMARY} label="View More" handleClick={() => onViewMore(record.id)} />,
    },
  );

  return baseColumns;
};
