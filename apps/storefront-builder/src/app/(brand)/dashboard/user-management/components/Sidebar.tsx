"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Payment from "../../../../../assets/icons/Bank.svg?component";
import DeliveryIcon from "../../../../../assets/icons/Delivery.svg?component";
import Policies from "../../../../../assets/icons/Policy.svg?component";
import Settings from "../../../../../assets/icons/Setting.svg?component";

const navItems = [
  { name: "General Details", href: "/dashboard/user-management", icon: Settings },
  { name: "Payment Setup", href: "/dashboard/user-management/payment", icon: Payment },
  { name: "Delivery Setup", href: "/dashboard/user-management/delivery", icon: DeliveryIcon },
  { name: "Policies", href: "/dashboard/user-management/policies", icon: Policies },
  { name: "Help And Support", href: "/dashboard/user-management/help", icon: Policies },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[20vw] rounded-xl border-[1px] border-[#CDCDCD] bg-[#ffff] p-4">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-indigo-50 hover:text-brand-color1 ${
                    isActive ? "bg-indigo-50 text-brand-color1" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${isActive ? "text-brand-color1" : "text-[#B3B8C2]"}`} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
