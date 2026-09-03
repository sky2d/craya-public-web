"use client";

import appLinkImage from "@/assets/backDrops/appLink.png";
import { useStoreContext } from "@/provider/StoreProvider";
import crayaApp from "components/src/icons/popupImages/storeFrontBuilder/crayaApp.png";
import generateApp from "components/src/icons/popupImages/storeFrontBuilder/generateApp.png";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2, showPopup } from "components/src/minor";
import { ModalBox } from "components/src/minor/ModalBox";
import { getStorefrontLink, getStoreStatus } from "components/src/services/api";
import { downloadSellerApp } from "components/src/services/api/emailManagement";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const ShopAppLinks = () => {
  const [showModal, setShowModal] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const { store, StoreStatus, setStoreStatus, storeLink, setStoreLink } = useStoreContext();
  const hasDevices = localStorage.getItem("isDevicesExist") === "true";
  const appLink = "craya app the best E-commerce app ";

  const handleGenerateButtonClick = async () => {
    if (!store.id) return showPopup("error", "Add address and hasLoops to generate link");
    if (
      StoreStatus.details.missing.includes("Add Loops") ||
      StoreStatus.details.missing.includes("Setup Delivery") ||
      StoreStatus.details.missing.includes("Setup Payment")
    ) {
      setIsGenerateModalOpen(true);
      return;
    }

    if (!store.url) {
      const response = await getStorefrontLink(store.id!);
      if (response.data) {
        setStoreLink(response.data);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "App Link",
          text: "Check out your app using this link!",
          url: appLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: open native mail app or copy to clipboard
      window.open(`mailto:?subject=Check this out&body=${window.location.href}`);
    }
  };

  const handleDownloadApp = async () => {
    await downloadSellerApp(store.user!.id!, "SELLER_APP_DOWNLOAD");
    setIsGenerateModalOpen(false);
    showPopup("success", "App link sent to your email");
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        showPopup("success", "Copied to clipboard");
        setTimeout(() => 2000);
      })
      .catch(err => showPopup("error", err.message));
  };

  useEffect(() => {
    const fetchStoreStatus = async () => {
      if (!store.id) return;
      const storeStatus = await getStoreStatus(store.id);
      if (storeStatus.data) {
        setStoreStatus(storeStatus.data);
      }
    };

    fetchStoreStatus();

    if (!store) return;

    if (hasDevices) return;

    setShowModal(true);
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [store]);

  return (
    <div className="relative h-full w-full">
      <ModalBox
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        type2
        image={crayaApp}
        title="Get Craya Seller App!!! "
        description="Download the craya companion app to manage your store on the go. It's completely safe"
      />
      {/* Background Image using Next.js Image */}
      <div className="absolute inset-0 z-0">
        <Image src={appLinkImage} alt="Background" fill priority />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-2/3 flex-col items-center justify-center p-4">
        {/* Store Link Section */}
        <div className="bg-white flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-opacity-70 p-4">
          <p className="text-center body-md-semibold">Store Link</p>
          <div className="flex w-3/5 gap-3">
            <div className="flex h-12 w-full items-center justify-between rounded-md border border-brand-color3 p-2">
              <p
                onClick={() => window.open(`${store.url ? store.url : storeLink.url}`, "_blank")}
                className="line-clamp-1 cursor-pointer body-md-semibold hover:scale-100 hover:text-brand-color1"
              >
                {store.url ? store.url : storeLink.url ? storeLink.url : "Click to generate your store link"}
              </p>
              <button onClick={() => copyToClipboard(store.url ? store.url : storeLink.url ? storeLink.url : "Click to generate your store link")}>
                <FaRegCopy className="cursor-pointer text-brand-color1" />
              </button>
            </div>
            <div className="flex w-1/5 items-center justify-center">
              <Button2 label="Generate" disabled={store.url ? true : false} type={ButtonType.DEFAULT} handleClick={handleGenerateButtonClick} />
            </div>
          </div>
        </div>

        {/* App Link Section */}
        <div className="bg-white flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-opacity-70 p-4">
          <p className="text-center body-md-semibold">App Link</p>
          <div className="flex w-3/5 gap-3">
            <div className="flex h-12 w-full items-center justify-between rounded-md border border-brand-color3 p-2">
              <p className="line-clamp-1 body-md-semibold">{appLink}</p>
              <button onClick={() => copyToClipboard(appLink)}>
                <FaRegCopy className="cursor-pointer text-brand-color1" />
              </button>
            </div>
            <div className="flex h-12 w-1/5 items-center justify-center">
              <Button2 label="Share" type={ButtonType.DEFAULT} handleClick={() => handleShare()} />
            </div>
          </div>
        </div>
      </div>

      <ModalBox
        isModalOpen={isGenerateModalOpen}
        setIsModalOpen={setIsGenerateModalOpen}
        type2
        singleButton
        singleButtonLabel="Get Download Link"
        handleSingleButtonClick={handleDownloadApp}
        image={generateApp}
        title="Before You Start Selling"
        description="Download the Seller App to get your
storefront link & see it live! Set up Shiprocket and Payment for smooth payments & deliveries. Add Loops to level up your storefront!"
      />
    </div>
  );
};

export default ShopAppLinks;
