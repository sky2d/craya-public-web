import { twMerge } from "tailwind-merge";

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  collapsed,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={twMerge(
      "flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all duration-200 hover:bg-brand-color3 hover:text-white-light4",
      isActive ? "bg-brand-color3 text-white-light4" : "text-gray-700",
    )}
  >
    <Icon className="aspect-square w-[clamp(18px,1vw,24px)] flex-shrink-0" />
    <span
      className={twMerge(
        "inline-flex items-center overflow-hidden truncate text-ellipsis whitespace-nowrap leading-none transition-transform duration-300",
        collapsed && "hidden",
      )}
    >
      {label}
    </span>
  </div>
);
