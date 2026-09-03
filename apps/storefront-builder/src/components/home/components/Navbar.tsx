"use client";

import { NavbarLinks } from "@/constant/NavigationLinks";
import { logout } from "@/services/auth/signOut";
import { useHideNavbar } from "@/utils/hiddenLinks";
import Hamburger from "components/src/icons/iconFiles/Hamburger Menu.svg";
import Logo from "components/src/icons/iconFiles/logo.svg";
import { SidebarMenu } from "components/src/major/SidebarMenu";
import DrawerWrapper from "components/src/major/wrapper/DrawerWrapper";
import { Overlay } from "components/src/major/wrapper/Overlay";
import FancyButton from "components/src/minor/FancyButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSessionContext();
  const router = useRouter();
  const pathname = usePathname();
  const doNotShowNavbar = useHideNavbar(pathname);

  if (doNotShowNavbar) {
    return null;
  }

  const sessionExists = !session.loading && session.doesSessionExist;

  return (
    <div className="p-2">
      <nav className="relative mx-auto flex w-full snap-start items-center justify-between rounded-md bg-brand-color1 p-1">
        <Link href="/" className="flex items-center space-x-3 px-2">
          <Image src={Logo} alt="Craya Logo" width={150} height={150} />
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-end p-1 md:hidden">
          <Image src={Hamburger} alt="Hamburger" width={100} height={100} />
        </div>
        <div className="hidden md:flex md:w-auto md:flex-row" id="navbar-default">
          <ul className="flex items-center justify-center rounded-lg p-2 font-medium md:flex-row rtl:space-x-reverse">
            {NavbarLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="w-full rounded-sm px-4 text-sm text-white-light4 transition-all duration-300 hover:underline hover:underline-offset-4 lg:text-lg"
                >
                  {label}
                </Link>
              </li>
            ))}
            {!sessionExists ? (
              <li>
                {" "}
                <FancyButton
                  text="Log In"
                  icon={undefined}
                  onClick={() => router.push("/auth")}
                  className="cursor-pointer px-6 py-2 hover:shadow-md"
                />
              </li>
            ) : (
              <li>
                <FancyButton
                  text="LogOut"
                  className="cursor-pointer px-4 py-3 hover:shadow-md"
                  icon={undefined}
                  onClick={async () => {
                    await logout();
                  }}
                />
              </li>
            )}
          </ul>
        </div>
        {isOpen && (
          <>
            <Overlay
              isOpen={isOpen}
              handleClickOutside={() => {
                setIsOpen(false);
              }}
            />
            <DrawerWrapper className="bg-brand-color3 p-2">
              <SidebarMenu
                items={[
                  { label: "Are you a Buyer?", basePath: process.env.NEXT_PUBLIC_WEB_DOMAIN || "https://craya.shop/", show: true },
                  { label: "Contact Us", basePath: "/contact", show: true },
                  {
                    label: sessionExists ? "LogOut" : "Login",
                    basePath: `/auth`,
                    show: true,
                    customClick: sessionExists ? () => logout() : undefined,
                  },
                ]}
                iconSize={20}
                highlightColor="#ffffff"
                onItemClick={() => setIsOpen(false)}
              />
            </DrawerWrapper>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
