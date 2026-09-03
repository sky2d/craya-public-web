import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { logout } from "@/services/auth/signOut";
import { sidebarConfig } from "@/utils/sidebarConfig";
import { Layout } from "antd";
const { Sider } = Layout;
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import ChevronDown from "../../assets/icons/ChevronDown.svg?component";
import Home from "../../assets/icons/Home.svg?component";
import Logout from "../../assets/icons/Logout.svg?component";
import { SidebarItem } from "./SidebarItem";

export const MenuScreen = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsModalOpen, isStoreChanged, store } = useStoreContext();
  const { isProductInfoChanged } = useProductContext();

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { selectedKey } = useMemo(() => {
    for (const section of sidebarConfig) {
      for (const item of section.items) {
        if (item.path && pathname.startsWith(item.path) && !item.children) {
          return { selectedKey: item.key, openKey: null };
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.path && pathname.startsWith(child.path)) {
              return { selectedKey: child.key, openKey: item.key };
            }
          }
        }
      }
    }
    return pathname === "/dashboard" ? { selectedKey: "home", openKey: null } : { selectedKey: null, openKey: null };
  }, [pathname]);

  useEffect(() => {
    if (collapsed) setOpenKeys([]);
  }, [collapsed]);

  const handleNavigation = (path: string) => {
    if (isStoreChanged || isProductInfoChanged) return setIsModalOpen(true);
    router.push(path);
  };

  const toggleDropdown = (key: string) => {
    setOpenKeys(prev => (prev.includes(key) ? [] : [key]));
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleMouseEnter = () => setCollapsed(false);
  const handleMouseLeave = () => setCollapsed(true);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      trigger={null}
      collapsedWidth={80}
      width={250}
      className="!flex-[0_0_auto] overflow-hidden border-r border-r-[#CDCDCD] bg-white-light4 transition-all duration-300 ease-in-out"
    >
      <div className="flex h-full flex-col">
        {/* --- Store Logo --- */}
        <div className="flex w-full justify-center p-2">
          <div className="relative aspect-square w-[60px] overflow-hidden rounded-lg border border-[#CDCDCD] transition-all duration-300">
            <Image src={store?.logo?.fileUrl || "/cray-logo.png"} alt="Store logo" fill className="object-contain" quality={100} priority />
          </div>
        </div>

        {/* --- Menu --- */}
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {/* Home */}
          <SidebarItem
            icon={Home}
            label="Home"
            collapsed={collapsed}
            isActive={selectedKey === "home"}
            onClick={() => handleNavigation("/dashboard")}
          />

          {/* Sections */}
          {sidebarConfig.map(section => (
            <div key={section.category} className="mt-2 space-y-1 text-[clamp(10px,0.7vw,14px)] font-medium">
              <h2 className="px-2 text-[9px] font-medium uppercase text-[#8F8F8F]">{section.category}</h2>

              {section.items.map(item =>
                item.children ? (
                  <div key={item.key}>
                    <div
                      onClick={() => toggleDropdown(item.key)}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-3 transition-colors duration-200 hover:bg-brand-color3 hover:text-white-light4"
                    >
                      <div className="flex items-center gap-x-4">
                        <item.icon className="aspect-square w-[clamp(18px,1vw,24px)] flex-shrink-0" />
                        <span
                          className={twMerge(
                            "inline-flex transform items-center leading-none transition-transform duration-300",
                            collapsed && "hidden",
                          )}
                        >
                          {item.label}
                        </span>
                      </div>

                      {!collapsed && (
                        <ChevronDown
                          className={twMerge("h-4 w-4 transform transition-transform duration-300", openKeys.includes(item.key) && "rotate-180")}
                        />
                      )}
                    </div>

                    {/* Dropdown Children */}
                    <div
                      className={twMerge(
                        "ml-6 overflow-hidden pl-4 transition-all duration-300 ease-in-out",
                        openKeys.includes(item.key) && !collapsed ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      {item.children.map(child => (
                        <div
                          key={child.key}
                          onClick={() => handleNavigation(child.path)}
                          className={twMerge(
                            "cursor-pointer rounded-md py-1.5 transition-colors duration-200 hover:text-brand-color1",
                            selectedKey === child.key && "text-brand-color1",
                          )}
                        >
                          {child.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <SidebarItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    collapsed={collapsed}
                    isActive={selectedKey === item.key}
                    onClick={() => handleNavigation(item.path!)}
                  />
                ),
              )}
            </div>
          ))}
        </div>

        {/* --- Logout --- */}
        <div className="p-2">
          <div
            onClick={handleLogout}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-color1 p-2 text-brand-color1 transition-colors duration-200 hover:bg-red-50"
          >
            <Logout className="h-5 w-5 flex-shrink-0" />
            <span className={twMerge("whitespace-nowrap text-sm font-medium", collapsed && "hidden")}>Logout</span>
          </div>
        </div>
      </div>
    </Sider>
  );
};
