import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BoxLogo from "../../../icons/iconFiles/BoxWhiteLogo.png";
import { Presence, StorefrontComponentData, StorefrontComponentProps, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { ModalProductSidebar, ProductSidebar } from "./productSideBar";
import { VideoCarousel } from "./verticalVideoCarousel";
import { VideoModal } from "./videoModal";

export const ShoppableVideoFeed: React.FC<StorefrontComponentProps> = ({ data, handlerFunction, wishlistItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const store = data?.store;

  if (!data || !store) return null;

  const videos = data.loops?.filter(loop => loop.presence === Presence.FEED) || [];
  if (videos.length === 0) return null;

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-start md:flex-row">
        <VideoCarousel
          videos={videos}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onVideoClick={id => setModalIndex(id)}
          store={store}
        />

        {/* Sidebar */}
        <ProductSidebar video={videos[activeIndex]} store={store} wishlistItems={wishlistItems} handlerFunction={handlerFunction} />
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <VideoModal
          startIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          data={data}
          wishlistItems={wishlistItems}
          handlerFunction={handlerFunction}
        />
      )}
    </>
  );
};

interface StorefrontVideoComponentProps {
  data?: StorefrontComponentData;
  handlerFunction?: StorefrontHandlerFunction;
  defaultLoopId?: string;
  defaultLoopIndex?: number;
  wishlist?: WishlistItems[];
  route?: boolean;
}

export const AllShoppableVideosFeed: React.FC<StorefrontVideoComponentProps> = ({
  data,
  handlerFunction,
  defaultLoopIndex,
  defaultLoopId,
  wishlist,
  route,
}) => {
  const [currLoopIndex, setCurrLoopIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(true);
  const router = useRouter();

  const handleLogoClick = () => {
    if (!route) {
      return;
    } else if (document.referrer && document.referrer !== window.location.href) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const videos = React.useMemo(() => data?.loops || [], [data?.loops]);

  const store = data?.store;

  if (!data || !store || !videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="absolute left-2 top-10 z-50 hidden aspect-square w-full max-w-[5vw] p-2 sm:block">
        <Image
          src={data.store?.logo?.fileUrl || ""}
          draggable={false}
          onClick={handleLogoClick}
          alt="Logo"
          fill
          className="cursor-pointer object-contain"
          sizes="(max-width: 640px) 10vw, 150px"
        />
      </div>
      <div className="relative flex h-full w-full items-center justify-center md:justify-start">
        {/* Carousel */}
        <VideoCarousel
          defaultLoopId={defaultLoopId}
          defaultLoopIndex={defaultLoopIndex}
          handlerFunction={handlerFunction}
          muted={isMuted}
          toggleMute={toggleMute}
          wishlistItems={wishlist}
          videos={videos}
          activeIndex={currLoopIndex}
          setActiveIndex={setCurrLoopIndex}
          store={store}
          className="!max-w-full"
          showProduct={true}
        />
        <ModalProductSidebar video={videos[currLoopIndex]} store={store} wishlistItems={wishlist} handlerFunction={handlerFunction} />
      </div>

      <div className="flex w-full items-center justify-end bg-brand-color3 p-0">
        <p className="flex items-center justify-end pr-4 text-lg font-normal text-white-light4">
          <span className="">Powered By</span>
          <span className="ml-2">
            <Image src={BoxLogo} alt="Logo" width={20} draggable={false} height={36} />
          </span>
        </p>
      </div>
    </div>
  );
};
