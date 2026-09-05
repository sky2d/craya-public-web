"use client";

import Feature from "@/assets/icons/Feature.svg";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { logout } from "@/services/auth/signOut";
import { Avatar, Skeleton } from "antd";
import { ButtonType } from "components/src/interfaces/Buttons";
import ImageSkeletonLoader from "components/src/major/ImageSkeletonLoader";
import { SidebarMenu } from "components/src/major/SidebarMenu";
import { Button2 } from "components/src/minor";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

type SideBarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
  isRootDomain?: boolean;
};

export const SideBar = ({ isOpen, closeSidebar, isRootDomain }: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  let storePrefix = "";
  if (pathname.startsWith("/store/")) {
    storePrefix = `/store/${pathname.split("/")[2]}`;
  } else if (pathname.startsWith("/shop-local")) {
    storePrefix = `/shop-local`;
  }
  const session = useSessionContext();
  const { user, loading, isGlobal } = useUserContext();
  const { storeDetails } = useStoreContext();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (session.loading) return;

    if (!session.doesSessionExist) {
      setLoader(false);
    } else if (isOpen && loading) {
      setShowSkeleton(true);
    } else {
      setShowSkeleton(false);
    }
  }, [isOpen, loading, session]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-dvh w-3/4 max-w-[640px] flex-col justify-between overflow-y-auto bg-[#ffffff] transition-transform duration-300 ease-in-out sm:w-2/5 md:w-[30%] lg:w-[25%] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute right-2 top-2 z-10 cursor-pointer" onClick={closeSidebar}>
        <button aria-label="Close Sidebar" suppressHydrationWarning>
          <MdOutlineCancel className="text-[24px] text-[#000000] opacity-[0.6]" />
        </button>
      </div>
      {showSkeleton ? (
        <Skeleton active />
      ) : session.loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className={`${!session.doesSessionExist ? "p-2" : " "}`}>
            {/* {session.doesSessionExist && ( */}
            <div className="relative flex flex-col justify-start rounded-full p-2 sm:flex-row sm:items-center sm:p-4">
              <div className="relative aspect-square w-[50%] max-w-32 sm:w-[27%] sm:max-w-[27%]">
                {session.doesSessionExist && user?.image?.fileUrl ? (
                  <>
                    {loader && <ImageSkeletonLoader aspectRatio="1/1" rounded />}
                    <Image
                      draggable={false}
                      src={user.image.fileUrl}
                      alt="User Profile"
                      fill
                      sizes="(max-width: 640px) 50vw, 27vw"
                      onLoad={() => setLoader(false)}
                      className="rounded-full object-cover shadow-lg"
                    />
                  </>
                ) : (
                  <Avatar
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "gray",
                      fontSize: "calc(100% * 2.5)",
                    }}
                    icon={<IoPersonOutline />}
                  />
                )}
              </div>
              <div className={`flex flex-col items-start justify-center p-2`}>
                {session.doesSessionExist && (
                  <div className="m-1">
                    <div className="line-clamp-1 text-base font-semibold lg:text-[1.5vw]">{user ? user.name : "user"}</div>
                    <div className="line-clamp-1 text-sm font-normal md:text-[1.1vw]">
                      {" "}
                      {user ? (user.loginMethod === "GOOGLE" ? user.email : user.phone) : ""}
                    </div>
                  </div>
                )}

                {!session.doesSessionExist && (
                  <div
                    onClick={() => {
                      closeSidebar();
                      router.push("/auth");
                    }}
                    className="w-full"
                  >
                    <Button2 label="Login" handleClick={() => {}} type={ButtonType.PRIMARY} />
                  </div>
                )}
              </div>
            </div>
            {/* )} */}

            <SidebarMenu
              items={[
                { label: "Home", basePath: `${storePrefix}/`, show: !isGlobal, target: "subdomain" },
                { label: "Videos", basePath: `${storePrefix}/videos?storeId=${storeDetails?.id}`, show: !isGlobal, target: "subdomain" },
                { label: "Orders", basePath: "/orders", show: session.doesSessionExist, target: "domain" },
                { label: "Edit Profile", basePath: "/edit-user-profile", show: session.doesSessionExist, target: "domain" },
                { label: "About Us", basePath: "/aboutUs", show: isGlobal, target: "domain" },
                { label: "About Store", basePath: `${storePrefix}/about`, show: !isGlobal, target: "subdomain" },
              ]}
              iconSize={20}
              highlightColor="#000000"
              onItemClick={closeSidebar}
            />
          </div>
          <div className="w-full p-2">
            <div className="relative aspect-[1/0.36] w-full">
              <Image
                src={Feature}
                alt="Report an issue or suggest a feature"
                fill
                className="w-full cursor-pointer object-contain"
                onClick={() => {
                  window.open("https://wa.me/918252271465", "_blank");
                }}
              />
            </div>

            {session.doesSessionExist && (
              <div className="w-full px-1 pt-4">
                <Button2
                  type={ButtonType.PRIMARY}
                  label="LogOut"
                  className="bg-brand-color1"
                  handleClick={() => {
                    logout();
                    closeSidebar();
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
