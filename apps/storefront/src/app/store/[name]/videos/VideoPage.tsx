"use client";

import { useModalContext } from "@/provider/ModalProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { useUserContext } from "@/provider/UserProvider";
import { handleAddToWishList, handleProductPress, handleShare } from "@/services/storeActions";
import { Loop, StorefrontActions, StorefrontComponentData, Wishlist } from "components/src/interfaces";
import { createStorefrontData } from "components/src/services/storefront";
import { AllShoppableVideosFeed } from "components/src/storefront/main/shopbleVideoFeed/ShoppableVideoFeed";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

interface VideosPageProps {
  errorMessage?: string;
  loops: Loop[] | undefined;
  reelId: string | undefined;
}

export default function VideosPage({ loops, reelId, errorMessage }: VideosPageProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { storeDetails } = useStoreContext();
  const { wishlist, setWishlist, user } = useUserContext();
  const { openModal } = useModalContext();
  const [currentIndex, setCurrentIndex] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (reelId && loops) {
      setCurrentIndex(reelId);
    }
  }, [reelId, loops]);

  const updateWishlist = (newWishlist: Wishlist) => {
    setWishlist(newWishlist);
  };

  const handleComponentAction = (action: StorefrontActions, data: StorefrontComponentData) => {
    if (action === StorefrontActions.SHARE_PRESS) {
      handleShare(data.loops[0].video.id!, storeDetails?.id);
    } else if (action === StorefrontActions.PRODUCT_PRESS) {
      handleProductPress(router, `/products/details/${data.products[0].id}`);
    } else if (action === StorefrontActions.ADD_TO_WISHLIST) {
      handleAddToWishList(data.products[0], updateWishlist, wishlist, user, openModal);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      closeFullscreen();
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleOpenFullscreen = () => {
    openFullscreen();
    setIsFullscreen(true);
  };

  const openFullscreen = () => {
    if (!modalRef.current) return;
    const elem = modalRef.current as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(console.error);
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen().catch(console.error);
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen().catch(console.error);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen().catch(console.error);
    }
  };

  const closeFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (errorMessage || loops?.length === 0) return <ErrorPage title="No Videos Found" description={errorMessage || "No videos available"} />;

  const storefrontData = createStorefrontData({
    loops,
    store: storeDetails,
  });

  return (
    <div ref={modalRef} className="relative h-screen w-full overflow-hidden bg-black-dark1">
      {loops && loops.length > 0 && (
        <>
          <button
            onClick={isFullscreen ? closeFullscreen : handleOpenFullscreen}
            className="absolute right-4 top-4 z-50 hidden animate-bounce items-center gap-2 rounded-lg bg-white-light4 p-3 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 sm:flex"
          >
            <svg
              className="text-primary h-6 w-6 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l4 4m12 12v4m0 0h-4m4 0l-4-4M4 16v4m0 0h4m-4 0l4-4m12-12V4m0 0h-4m4 0l-4 4"
              />
            </svg>
            <span className="text-black text-sm font-semibold">{isFullscreen ? "Exit Full Screen" : "Go Full Screen"}</span>
          </button>
        </>
      )}

      <AllShoppableVideosFeed
        wishlist={wishlist?.wishlistItems}
        data={storefrontData}
        handlerFunction={handleComponentAction}
        defaultLoopId={currentIndex}
        route
      />
    </div>
  );
}
