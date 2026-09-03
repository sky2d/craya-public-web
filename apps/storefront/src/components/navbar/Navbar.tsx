"use client";

import { NavbarLinks } from "@/constants/NavigationLinks";
import { logout } from "@/services/auth/signOut";
import Hamburger from "components/src/icons/iconFiles/Hamburger Menu.svg?component";
import Logo from "components/src/icons/iconFiles/logo.svg";
import { SidebarMenu } from "components/src/major/SidebarMenu";
import DrawerWrapper from "components/src/major/wrapper/DrawerWrapper";
import { Overlay } from "components/src/major/wrapper/Overlay";
import FancyButton from "components/src/minor/FancyButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSessionContext();
  const router = useRouter();

  const sessionExists = !session.loading && session.doesSessionExist;

  return (
    <nav className="relative mx-auto flex w-full snap-start items-center justify-between bg-brand-color1 p-2">
      <Link href="/" className="flex items-center space-x-3">
        <Image src={Logo} draggable={false} alt="Craya Logo" width={200} height={50} />
      </Link>
      <div onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-end p-1 md:hidden">
        <Hamburger className="h-full w-full" />
      </div>
      <div className="hidden md:flex md:w-auto md:flex-row" id="navbar-default">
        <ul className="flex items-center justify-center rounded-lg p-2 font-medium md:flex-row rtl:space-x-reverse">
          {NavbarLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                href={path}
                className="w-full rounded-sm px-3 text-sm text-white-light4 transition-all duration-300 hover:underline hover:underline-offset-4 lg:text-lg"
              >
                {label}
              </Link>
            </li>
          ))}
          {!session.loading && !session.doesSessionExist ? (
            <li>
              {" "}
              <FancyButton text="Login" icon={undefined} onClick={() => router.push("/auth")} className="cursor-pointer hover:shadow-md" />
            </li>
          ) : (
            <li>
              <FancyButton
                text="LogOut"
                className="cursor-pointer"
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
                { label: "Are you a Seller?", basePath: `https://craya.store/sellers`, show: true },
                { label: "Contact US", basePath: `/contact`, show: true },
                { label: sessionExists ? "LogOut" : "Login", basePath: `/auth`, show: true, customClick: sessionExists ? () => logout() : undefined },
              ]}
              iconSize={20}
              highlightColor="#ffffff"
              onItemClick={() => setIsOpen(false)}
            />
          </DrawerWrapper>
        </>
      )}
    </nav>
  );
};

export default Navbar;
