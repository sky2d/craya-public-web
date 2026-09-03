import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useEffect, useRef, useState } from "react";
import { Loop, Store, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { VideoCard } from "../../../major";
import NavigationButton from "../../../minor/NavigationButton";
import { createStorefrontData } from "../../../services/storefront";
import { handleFlickingNavigation } from "../../../utils/flickingNavigation";

interface VerticalVideoCarouselProps {
  videos: Loop[];
  store: Store;
  onVideoClick?: (id: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handlerFunction?: StorefrontHandlerFunction;
  muted?: boolean;
  toggleMute?: () => void;
  wishlistItems?: WishlistItems[];
  showProduct?: boolean;
  defaultLoopId?: string | number;
  defaultLoopIndex?: number;
  className?: string;
}

export const VideoCarousel: React.FC<VerticalVideoCarouselProps> = ({
  videos,
  store,
  activeIndex,
  setActiveIndex,
  onVideoClick,
  handlerFunction,
  muted,
  toggleMute,
  wishlistItems,
  showProduct,
  defaultLoopId,
  defaultLoopIndex,
  className,
}) => {
  const [isFlickingReady, setIsFlickingReady] = useState(false);
  const carouselRef = useRef<Flicking | null>(null);
  const [visitedIndexes, setVisitedIndexes] = useState<Set<number>>(new Set([activeIndex]));
  const primaryColor = store.primaryColor;

  useEffect(() => {
    if (videos && videos.length > 0 && defaultLoopId && carouselRef.current) {
      const defaultIndex = defaultLoopId ? videos.findIndex(video => video.video.id === defaultLoopId) : -1;
      const startIndex = defaultIndex !== -1 ? defaultIndex : 0;
      setActiveIndex(startIndex);
      carouselRef.current.moveTo(startIndex).catch(e => console.error("MoveTo failed", e));
    } else if (defaultLoopIndex) {
      setActiveIndex(defaultLoopIndex);
    }
  }, [defaultLoopId, videos, defaultLoopIndex, carouselRef.current]);

  // Lazy-load around active video
  const handleLoopChange = (index: number) => {
    const total = videos.length;

    setActiveIndex(index); // 👈 update parent state

    const neighbors = [index];

    if (index > 0) neighbors.push(index - 1);
    if (index < total - 1) neighbors.push(index + 1);

    setVisitedIndexes(new Set(neighbors));
  };

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden flex-col items-end justify-center md:flex md:w-1/3">
        {videos.length > 1 && (
          <>
            <NavigationButton
              isFlickingReady={isFlickingReady}
              direction="up"
              show={activeIndex > 0}
              primaryColor={primaryColor}
              carouselRef={carouselRef}
              handleFlickingNavigation={handleFlickingNavigation}
            />
            <NavigationButton
              isFlickingReady={isFlickingReady}
              direction="down"
              show={activeIndex < videos.length - 1}
              primaryColor={primaryColor}
              carouselRef={carouselRef}
              handleFlickingNavigation={handleFlickingNavigation}
            />
          </>
        )}
      </div>

      {/* Flicking Carousel */}

      <Flicking
        ref={el => {
          if (el) {
            carouselRef.current = el;
            setIsFlickingReady(true);
          }
        }}
        horizontal={false}
        defaultIndex={defaultLoopIndex}
        align="center"
        className={`flex aspect-[1/1.8] h-[80vh] w-auto max-w-[90vw] justify-center rounded-md sm:max-w-[50vw] md:max-w-[33vw] ${className ?? ""}`}
        moveType="strict"
        threshold={50}
        onChanged={({ index }) => {
          handleLoopChange(index);
        }}
      >
        {videos.map((item, id) => {
          const shouldLoad = id === activeIndex || id === activeIndex + 1 || visitedIndexes.has(id);
          const storefrontData = createStorefrontData({
            products: item.products,
            store: store,
          });

          return (
            <div key={id} className="flicking-panel h-full w-full" data-index={id}>
              <VideoCard
                loop={shouldLoad ? item : undefined}
                size="h-full w-full"
                handlerFunction={handlerFunction}
                isPlaying={id === activeIndex}
                backgroundColor={primaryColor}
                onClick={() => onVideoClick && onVideoClick(id)}
                muted={muted}
                toggleMute={toggleMute}
                wishlistItems={wishlistItems}
                showProduct={showProduct}
                storefrontData={storefrontData}
              />
            </div>
          );
        })}
      </Flicking>
    </>
  );
};
