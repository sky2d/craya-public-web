// import Analytics from "../../assets/icons/Analytics.svg?component";
import Bank from "../assets/icons/Bank.svg?component";
import LinkIcon from "../assets/icons/Link.svg?component";
import Products from "../assets/icons/Product.svg?component";
import Promotions from "../assets/icons/Promotions.svg?component";
import MoreSettings from "../assets/icons/Setting.svg?component";
import Shipping from "../assets/icons/Shipping.svg?component";
import Store from "../assets/icons/Shop 4.svg?component";

export const sidebarConfig = [
  {
    category: "MAKE",
    items: [
      {
        key: "storefront",
        label: "Storefront",
        icon: Store,
        children: [
          { key: "store-details", label: "Store Details", path: "/dashboard/store" },
          { key: "storefront-builder", label: "Storefront Builder", path: "/builder" },
        ],
      },
      {
        key: "store-links",
        label: "Store & App Links",
        icon: LinkIcon,
        path: "/dashboard/link",
      },
      {
        key: "loop-addition",
        label: "Loop Addition",
        icon: LinkIcon,
        path: "/dashboard/loops",
      },
    ],
  },
  {
    category: "MANAGE",
    items: [{ key: "order", label: "Order", icon: Products, path: "/dashboard/order-management" }],
  },
  {
    category: "MARKET",
    items: [{ key: "Coupons", label: "Coupons", icon: Promotions, path: "/dashboard/coupons" }],
  },
  {
    category: "SETTINGS",
    items: [
      { key: "payment", label: "Payment", icon: Bank, path: "/dashboard/user-management/payment" },
      { key: "shipping", label: "Shipping", icon: Shipping, path: "/dashboard/user-management/delivery" },
      { key: "user-managements", label: "More Settings", icon: MoreSettings, path: "/dashboard/user-management" },
    ],
  },
];
