import { TableProps } from "antd";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Coupon, CouponStatus } from "components/src/interfaces/Coupon";
import { Button2 } from "components/src/minor";
import { ToggleSwitch } from "components/src/minor/ToggleSwitch";

interface CouponTableActions {
  onEditButtonClick: (couponId: string) => void;
  onToggleEnable: (coupon: Coupon) => void;
}

export const getCouponTableColumns = (actions: CouponTableActions): TableProps<Coupon>["columns"] => {
  const { onToggleEnable, onEditButtonClick } = actions;

  return [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="text-gray-800 font-medium">{title}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
    {
      title: "Valid",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date: string) => <span className="text-gray-600">{date}</span>,
    },
    {
      title: "Enable / Disable",
      key: "status",
      render: (_, record: Coupon) => <ToggleSwitch enabled={record.status === CouponStatus.ACTIVE} setEnabled={() => onToggleEnable(record)} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Coupon) => (
        <Button2
          label="Edit"
          type={ButtonType.PRIMARY}
          handleClick={() => {
            onEditButtonClick(record.id!);
          }}
          buttonSize="md"
        />
      ),
    },
  ];
};
