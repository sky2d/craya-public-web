import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdOutlineCancel } from "react-icons/md";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import BoxLogo from "../../../icons/iconFiles/BoxWhiteLogo.png";
import { Loop, StorefrontComponentData, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { VideoCard } from "../../../major";
import { createStorefrontData } from "../../../services/storefront";
import { handleFlickingNavigation } from "../../../utils/flickingNavigation";
import { getCardWidthModalClass } from "../../../utils/videoCard";
import { FeedVideoCard } from "../ProductGrid";
import { AllShoppableVideosFeed } from "../shopbleVideoFeed/ShoppableVideoFeed";

export interface ModalCarouselProps {
  videos: Loop[];
  activeModalId: number;
  setActiveModalId: (id: number) => void;
  closeModal: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  data: StorefrontComponentData;
  handlerFunction?: StorefrontHandlerFunction;
  wishlistItems?: WishlistItems[];
}

export const ModalCarousel: React.FC<ModalCarouselProps> = ({
  videos,
  activeModalId,
  setActiveModalId,
  closeModal,
  isMuted,
  toggleMute,
  data,
  handlerFunction,
  wishlistItems,
}) => {
  const modalCarouselRef = useRef<Flicking | null>(null);
  const plugins = [new Perspective({ rotate: 0.1 })];
  const windowWidth = useWindowWidth();
  const [isFlickingReady, setIsFlickingReady] = useState(false);

  const handleModalChanged = (e: { index: number }) => {
    setActiveModalId(e.index);
  };

  const length = videos.length;

  if (length < 1) return null;

  return (
    // <div className="fixed inset-0 z-[1000] flex h-screen items-center justify-center bg-black-dark1 bg-opacity-90">
    <div className="fixed inset-0 z-[1000] flex h-[100dvh] w-screen items-center justify-center bg-black-dark1 bg-opacity-90">
      {/* Close button */}
      <div className="absolute left-3 top-10 z-50 hidden w-[10vw] max-w-[150px] p-4 sm:block">
        <Image draggable={false} src={data.store?.logo?.fileUrl || ""} alt="Logo" fill className="cursor-pointer object-contain" />
      </div>

      <button
        className="absolute left-1/2 top-4 z-20 -translate-x-1/2 transform cursor-pointer rounded-full text-center text-2xl text-white-light4 sm:left-auto sm:right-4 sm:translate-x-0"
        onClick={closeModal}
      >
        <MdOutlineCancel className="cursor-pointer text-3xl" />
      </button>

      {windowWidth >= 640 ? (
        <div className="relative flex h-full w-full flex-col justify-center">
          <Flicking
            circular
            plugins={plugins}
            ref={el => {
              if (el) {
                modalCarouselRef.current = el;
                setIsFlickingReady(true);
              }
            }}
            onChanged={handleModalChanged}
            defaultIndex={activeModalId}
            // className="h-[96vh]"
            moveType="strict"
            bound
          >
            {videos.map((item, id) => {
              const storefrontData = createStorefrontData({ products: item.products, store: data.store });
              const distance = Math.abs(activeModalId - id);
              const opacity = Math.max(0.3, 1 - distance * 0.2);

              return (
                <div
                  key={id}
                  className={`${getCardWidthModalClass(windowWidth, length)} flex h-full items-center justify-center py-2`}
                  style={{ opacity }}
                >
                  <VideoCard
                    loop={item}
                    size=" w-auto aspect-[1/1.8]"
                    handlerFunction={handlerFunction}
                    isPlaying={id === activeModalId}
                    backgroundColor={data.store?.primaryColor}
                    storefrontData={storefrontData}
                    wishlistItems={wishlistItems}
                    muted={id === activeModalId ? isMuted : true}
                    toggleMute={toggleMute}
                  />

                  {id === activeModalId && storefrontData.products.length > 0 && (
                    <div className="hidden h-auto w-auto min-w-44 p-2 sm:block">
                      <p className="rounded-t-[11px] bg-[#AC1E2E] text-center text-xl font-medium text-white-light4">Products</p>
                      <div
                        className="h-full max-h-[80vh] min-h-52 max-w-[30vw] overflow-y-auto bg-white-light4 p-2"
                        style={{
                          WebkitOverflowScrolling: "touch",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <FeedVideoCard
                          key={storefrontData.id || id}
                          data={storefrontData}
                          wishlistItems={wishlistItems}
                          handlerFunction={handlerFunction}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </Flicking>

          <div className="flex w-full items-center justify-end bg-brand-color3 p-0">
            <p className="flex items-center justify-center text-lg font-normal text-white-light4">
              <span>Powered By</span>
              <span className="ml-2">
                <Image src={BoxLogo} draggable={false} alt="Logo" width={20} height={36} />
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full justify-center">
          <AllShoppableVideosFeed defaultLoopIndex={activeModalId} data={data} wishlist={wishlistItems} handlerFunction={handlerFunction} />
        </div>
      )}
      {windowWidth >= 640 && length > 1 && (
        <>
          {" "}
          <button
            className="absolute left-0 z-10 hidden cursor-pointer rounded-full p-2 focus:outline-none sm:block lg:left-[15%]"
            onClick={() => handleFlickingNavigation(isFlickingReady, modalCarouselRef, "prev")}
            disabled={!isFlickingReady}
          >
            <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white-light4 text-black-dark1 hover:bg-black-dark3 hover:text-white-light4">
              <MdOutlineArrowBackIos />
            </span>
          </button>
          <button
            className="absolute right-0 z-10 hidden cursor-pointer rounded-full p-2 focus:outline-none sm:block lg:right-[15%]"
            onClick={() => handleFlickingNavigation(isFlickingReady, modalCarouselRef, "next")}
            disabled={!isFlickingReady}
          >
            <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white-light4 text-black-dark1 hover:bg-black-dark3 hover:text-white-light4">
              <MdOutlineArrowForwardIos />
            </span>
          </button>
        </>
      )}
    </div>
  );
};
