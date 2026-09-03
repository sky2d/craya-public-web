import { useRouter } from "next/navigation";
import React, { cloneElement } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { navigateToPath } from "../utils/domain";

type SidebarItem = {
  label: string;
  basePath: string;
  show: boolean | null;
  customClick?: () => void;
  target?: "domain" | "subdomain";
};

type SidebarMenuProps = {
  items: SidebarItem[];
  iconSize?: number;
  highlightColor?: string;
  onItemClick?: () => void;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, iconSize = 18, highlightColor = "#7C54E9", onItemClick }) => {
  const router = useRouter();
  const visibleItems = items.filter(item => item.show);

  const handleClick = (item: SidebarItem) => {
    if (onItemClick) onItemClick();

    if (item.customClick) {
      item.customClick();
    } else if (item.target === "domain") {
      navigateToPath(item.basePath);
    } else {
      router.push(item.basePath);
    }
  };

  return (
    <ul className="h-auto w-full py-3 body-sm-semibold">
      {visibleItems.map((item, index) => {
        return (
          <div key={index} className="sideBarElements">
            {index <= visibleItems.length - 1 && <hr className="my-1 border-t-2 opacity-[0.6]" style={{ border: `1px solid ${highlightColor}` }} />}
            <li className="flex w-full cursor-pointer items-center justify-between py-2" onClick={() => handleClick(item)}>
              <div className="flex flex-1 pl-4">
                <span className="w-full text-brand-color1 sm:text-base" style={{ color: highlightColor }}>
                  {item.label}
                </span>
              </div>
              <span className="pr-4 text-brand-color1">
                {cloneElement(<IoIosArrowForward />, {
                  height: iconSize,
                  width: iconSize,
                  style: { color: highlightColor },
                })}
              </span>
            </li>
            {index === visibleItems.length - 1 && <hr className="my-1 border-t-2 opacity-[0.6]" style={{ border: `1px solid ${highlightColor}` }} />}
          </div>
        );
      })}
    </ul>
  );
};
