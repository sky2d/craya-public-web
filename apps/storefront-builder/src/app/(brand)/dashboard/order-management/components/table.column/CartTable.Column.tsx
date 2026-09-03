import { TableProps } from "antd";
import { CartItem, Product, ProductSKU } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import Image from "next/image";

export const getCartTableColumns = (): TableProps<CartItem>["columns"] => {
  const columns: TableProps<CartItem>["columns"] = [
    {
      title: "SKu",
      dataIndex: "productSKU",
      key: "productSKU",
      render: (productSKU: ProductSKU) => (
        <div className="flex items-center gap-2">
          <div className="relative aspect-[1/1.6] w-20 overflow-hidden rounded">
            {productSKU.images[0] && (
              <Image src={productSKU.images[0].fileUrl} alt={productSKU.size || "size"} fill className="rounded object-cover" />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product: Product) => (
        <div>
          <span className="text-[clamp(14px,0.9vw,17px)] font-normal">{product.name}</span>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => <span className="text-[clamp(14px,0.9vw,17px)] font-normal">{quantity}</span>,
    },
    {
      title: "Price per Unit",
      dataIndex: "product",
      key: "pricePerUnit",
      render: (product: Product) => (
        <span className="text-[clamp(14px,0.9vw,17px)] font-normal">
          ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },

    {
      title: "Total",
      dataIndex: "product",
      key: "total",
      render: (_, record: CartItem) => (
        <div className="text-[clamp(14px,0.9vw,17px)] font-normal">
          <p className="text-brand-color1">
            ₹
            {(record.product.price * record.quantity).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p className="text-black-dark3">
            ₹
            {record.product.price.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            x {record.quantity}
          </p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "productSKU",
      key: "Status",
      render: (cart: CartItem) => {
        const availableStock = cart?.productSKU?.quantity || 0;
        const isLimited = availableStock < 5;

        return (
          <div>
            {isLimited ? (
              <Button2
                type={ButtonType.DEFAULT}
                className="!border-none !bg-[#FF8D8D] text-center text-[clamp(12px,0.7vw,14px)] !text-white-light4"
                label="Low Stock Warning"
                buttonSize="lg"
              />
            ) : (
              <Button2
                type={ButtonType.DEFAULT}
                className="!border-none !bg-[#DEEEE8] text-center text-[clamp(12px,0.7vw,14px)]"
                label="Good Stock"
                buttonSize="lg"
              />
            )}
          </div>
        );
      },
    },
  ];

  return columns;
};
