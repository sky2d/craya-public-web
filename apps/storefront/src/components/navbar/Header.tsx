"use client";

import SearchComponent from "@/components/navbar/SearchComponent";
import { SideBar } from "@/components/navbar/SideBar";
import { useCartContext } from "@/provider/CartProvider";
import { useModalContext } from "@/provider/ModalProvider";
import { Store } from "components/src/interfaces";
import { NavBar } from "components/src/major/NavBar";
import { Overlay } from "components/src/major/wrapper/Overlay";
import { navigateToPath } from "components/src/utils/domain";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface HeaderProps {
  isRootDomain: boolean;
  storeDetails?: Store;
}

const Header: React.FC<HeaderProps> = ({ storeDetails, isRootDomain }) => {
  const router = useRouter();
  const { cart } = useCartContext();
  const pathname = usePathname();
  const { openModal } = useModalContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const session = useSessionContext();

  const doNotShowNavbar = useMemo(() => {
    const path = pathname;

    if (isRootDomain) {
      return path === "/" || path === "/auth" || path === "/contact";
    }

    return path === "/videos";
  }, [pathname, isRootDomain]);

  const closeAll = useCallback(() => {
    setIsSidebarOpen(false);
    setIsSearchDropdownOpen(false);
  }, []);

  const toggleState = useCallback((stateSetter: React.Dispatch<React.SetStateAction<boolean>>, closeOther: () => void) => {
    stateSetter(prev => !prev);
    closeOther();
  }, []);

  const handleCartClick = useCallback(() => {
    if (!session.loading && !session.doesSessionExist) {
      openModal("login");
      return;
    }
    router.push("/cart");
  }, [session, openModal, router]);

  const handleSearchClick = useCallback(() => {
    if (!session.loading && !session.doesSessionExist) {
      openModal("login");
      return;
    }
    toggleState(setIsSearchDropdownOpen, () => setIsSidebarOpen(false));
  }, [session, openModal, toggleState]);

  const handleLikeClick = useCallback(() => {
    if (!session.loading && !session.doesSessionExist) {
      openModal("login");
      return;
    }
    router.push("/wishlist");
  }, [session, openModal, router]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const navbarImageUrl = useMemo(() => {
    if (isRootDomain) {
      return "/icons/CrayaLogo.svg";
    }
    return storeDetails?.logo?.fileUrl || "";
  }, [isRootDomain, storeDetails?.logo?.fileUrl]);

  return doNotShowNavbar ? null : (
    <div className="sticky top-0 z-[999] w-full border-b border-gray bg-[#ffffff]">
      <Overlay isOpen={isSidebarOpen || isSearchDropdownOpen} handleClickOutside={closeAll} />

      <NavBar
        imageUrl={navbarImageUrl}
        onHamburgerClick={() => toggleState(setIsSidebarOpen, () => setIsSearchDropdownOpen(false))}
        onSearchClick={handleSearchClick}
        onCartClick={handleCartClick}
        onHeartClick={handleLikeClick}
        cartItemCount={cart?.cartItems?.length ?? 0}
        onLogoClick={handleLogoClick}
      />

      <SearchComponent isSearchDropdownOpen={isSearchDropdownOpen} closeDropdown={() => setIsSearchDropdownOpen(false)} />

      <SideBar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Header;
