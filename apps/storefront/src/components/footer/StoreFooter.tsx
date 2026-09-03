"use client";

import { CrayLinks, SellerSideLinks } from "@/constants/NavigationLinks";
import { useModalContext } from "@/provider/ModalProvider";
import { useProductContext } from "@/provider/ProductProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { Loader } from "@/utils/loader";
import { FloatButton } from "antd";
import LogoStripe from "components/src/icons/iconFiles/TApe.svg";
import KrayaLogo from "components/src/icons/iconFiles/WhiteLogo.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export const StoreFooter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isGlobal } = useUserContext();
  const { storeDetails } = useStoreContext();
  const { tags } = useProductContext();
  const session = useSessionContext();
  const isLoggedIn = !session.loading && session.doesSessionExist;
  const { openModal } = useModalContext();

  const [loading, setLoading] = useState(false);

  const updatedSellerSideLinks = SellerSideLinks.map(section => {
    if (section.title === "Shop") {
      const productTags = [...tags]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(tag => ({
          name: tag,
          path: `/products?tag=${encodeURIComponent(tag)}`,
          external: false,
        }));

      const updatedLinks = [...productTags, ...section.links.map(link => ({ ...link, external: false }))];

      return { ...section, links: updatedLinks };
    }

    // Ensure external flag for other sections if not already present
    const updatedLinks = section.links.map(link => ({
      ...link,
      external: link.external ?? false, // default to false if not set
    }));

    return { ...section, links: updatedLinks };
  });

  const showFooter = (isGlobal && pathname !== "/" && pathname !== "/auth") || (!isGlobal && pathname !== `/videos`);

  const socials = storeDetails?.socials;

  const handleNavigation = (path: string, link: string, section: { title: string; links: { name: string; path: string }[] }, external: boolean) => {
    if (path === "/cart" || path === "/wishlist") {
      if (!isLoggedIn) {
        openModal("login");
      } else {
        router.push(path);
      }
      return;
    }
    if (external) {
      router.push(path);
      return;
    }
    if (section.title === "Shop") {
      setLoading(true);
      if (link === "Best Selling") {
        path = `/products?bestSellingProduct=${storeDetails?.id}`;
      } else if (link === "New arrivals") {
        path = `/products?newArrivalProduct=${storeDetails?.id}`;
      } else {
        path = `/products?tag=${encodeURIComponent(link)}`;
      }
      setLoading(false);
    }

    router.push(`${path}`);
  };

  if (!showFooter) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <footer className="relative flex flex-col items-center">
      <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square h-24 max-h-24 w-12 max-w-12 -translate-x-1/2 -translate-y-1/2 rotate-[80deg] flex-col text-center md:block md:rotate-0">
        <Image src={LogoStripe} draggable={false} alt="Craya Ribbon" fill className="object-contain sm:rotate-0" />
      </div>

      <div className="flex w-full flex-col items-stretch justify-center md:h-full md:flex-row">
        <div className="grid h-[70vh] w-full p-2 md:h-auto" style={{ backgroundColor: storeDetails?.primaryColor }}>
          <div className="flex items-start justify-between p-2 md:p-4">
            <div className="w-full">
              <Image
                draggable={false}
                src={storeDetails?.logo?.fileUrl || ""}
                alt="Store Logo"
                width={150}
                height={150}
                className="aspect-square rounded-full bg-white-light4 object-contain shadow-xl"
              />
            </div>
            <div className="w-full">
              <p className="flex flex-col items-end justify-start">
                <span className="text-white-light4 body-sm md:body-md">Contact Us</span>
                <span className="text-white-light4 body-sm md:body-md">
                  {(storeDetails?.user?.phone && storeDetails?.user?.phone) || "+91 93722 12328"}
                </span>
                <span className="cursor-pointer text-white-light4 body-sm md:body-md">
                  {(storeDetails?.user?.email && storeDetails?.user?.email) || "support@crayyheads.com"}
                </span>
              </p>
              <p className="m-1 flex items-center justify-end">
                {Object.entries(socials || {}).map(([platform, link]) => {
                  if (!link) return null;

                  let cleanUsername = link;

                  if (platform === "instagram") {
                    try {
                      const url = new URL(link);
                      const pathname = url.pathname;
                      const parts = pathname.split("/").filter(Boolean);
                      if (parts.length > 0) cleanUsername = parts[0];
                    } catch {
                      cleanUsername = link.replace("@", "").trim();
                    }
                  } else if (platform === "facebook") {
                    try {
                      const url = new URL(link);
                      const pathname = url.pathname;
                      const parts = pathname.split("/").filter(Boolean);
                      if (parts.length > 0) cleanUsername = parts[0];
                    } catch {
                      cleanUsername = link.trim();
                    }
                  }

                  let webLink = link;
                  let appLink = link;

                  if (platform === "instagram") {
                    webLink = `https://instagram.com/${cleanUsername}`;
                    appLink = `instagram://user?username=${cleanUsername}`;
                  } else if (platform === "facebook") {
                    webLink = `https://facebook.com/${cleanUsername}`;
                    appLink = `fb://profile/${cleanUsername}`;
                  }

                  const IconComponent = platform === "instagram" ? FaInstagram : platform === "facebook" ? FaFacebook : null;

                  if (!IconComponent) return null;

                  const handleClick = (e: React.MouseEvent) => {
                    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
                    if (isMobile) {
                      e.preventDefault();
                      window.location.href = appLink;

                      // fallback to web if app doesn't open
                      setTimeout(() => {
                        window.open(webLink, "_blank");
                      }, 1000);
                    }
                  };

                  return (
                    <a key={platform} href={webLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} className="m-1">
                      <IconComponent className="hover:text-primary text-2xl text-white-light4 transition-colors" />
                    </a>
                  );
                })}
              </p>
              <p className="text-right text-base font-medium text-white-light4">© 2025 {storeDetails?.name} Powered by Craya</p>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 py-4">
            {" "}
            {updatedSellerSideLinks.map((section, index) => (
              <div key={index} className="flex flex-col p-2">
                <h3 className="text-white-light4 body-sm-semibold">{section.title}</h3>
                <ul className="list-disc pl-5 text-white-light4 body-sm">
                  {section.links.map((link, idx) => {
                    return (
                      <li
                        key={idx}
                        className="group relative cursor-pointer hover:underline hover:underline-offset-4"
                        onClick={() => {
                          handleNavigation(link.path, link.name, section, link.external);
                        }}
                      >
                        {link.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid h-[70vh] w-full bg-brand-color1 p-2 md:h-auto">
          <div className="mt-5 flex items-start justify-between p-2 sm:mt-0">
            <div className="w-full">
              <Image src={KrayaLogo} draggable={false} alt="Logo" className="w-full max-w-md" height={100} width={100} />
            </div>
            <div className="w-full">
              <p className="flex flex-col items-end justify-center">
                <span className="text-white-light4 body-sm md:body-md">Contact Us</span>
                <span className="text-white-light4 body-sm md:body-md">+91 93722 12328</span>
                <span className="cursor-pointer text-white-light4 body-sm md:body-md">support@crayyheads.com</span>
              </p>
              <p className="m-1 flex items-center justify-end">
                <span className="m-1">
                  <FaInstagram
                    className="text-2xl text-white-light4"
                    onClick={() => window.open("https://www.instagram.com/craya.shop/", "_blank")}
                  />
                </span>
                <span className="m-1">
                  <FaLinkedin
                    className="text-2xl text-white-light4"
                    onClick={() => window.open("https://www.linkedin.com/company/craya/", "_blank")}
                  />
                </span>
                {/* ))} */}
              </p>
              <p className="text-right text-base font-medium text-white-light4">© 2025 Krayadotshop Pvt. Ltd.</p>
            </div>
          </div>

          <div className="my-4 grid grid-cols-3 sm:ml-8">
            {CrayLinks.map((section, index) => (
              <div key={index} className="flex w-full flex-col items-start p-1">
                <h3 className="text-start text-white-light4 body-sm-semibold">{section.title}</h3>
                <ul className="list-outside list-disc space-y-1 pl-5 text-white-light4 body-sm">
                  {section.links.map((link, idx) => {
                    const isExternal = link.path.startsWith("http");

                    return (
                      <li key={idx} className="relative">
                        {isExternal ? (
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white-light4 hover:underline hover:underline-offset-4"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <button
                            onClick={() => router.push(link.path)}
                            className="m-0 block w-full border-none bg-transparent p-0 text-left text-white-light4 hover:underline hover:underline-offset-4"
                          >
                            {link.name}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatButton.BackTop style={{ zIndex: "10" }} />
    </footer>
  );
};
