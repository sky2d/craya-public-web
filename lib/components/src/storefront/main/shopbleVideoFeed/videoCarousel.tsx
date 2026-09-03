import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useEffect, useRef, useState } from "react";
import { Loop, Store, StorefrontHandlerFunction, WishlistItems } from "../../../interfaces";
import { VideoCard } from "../../../major";
import NavigationButton from "../../../minor/NavigationButton";
import { createStorefrontData } from "../../../services/storefront";
import { handleFlickingNavigation } from "../../../utils/flickingNavigation";

interface VideoCarouselProps {
  videos: Loop[];
  store: Store;
  onVideoClick?: (id: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handlerFunction?: StorefrontHandlerFunction;
  muted?: boolean;
  toggleMute?: () => void;
  wishlistItems?: WishlistItems[];
  feed?: boolean;
  defaultLoopId?: string | number;
  defaultLoopIndex?: number;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  store,
  activeIndex,
  setActiveIndex,
  onVideoClick,
  handlerFunction,
  muted,
  toggleMute,
  wishlistItems,
  feed,
  defaultLoopId,
  defaultLoopIndex,
}) => {
  const carouselRef = useRef<Flicking | null>(null);
  const [visitedIndexes, setVisitedIndexes] = useState<Set<number>>(new Set());
  const [isFlickingReady, setIsFlickingReady] = useState(false);
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

  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.75 },
    );

    // Observe only currently rendered Flicking panels
    const elements = carouselRef.current.camera.children || [];
    Array.from(elements).forEach((el, idx) => {
      el.setAttribute("data-index", String(idx));
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeIndex]);

  // Lazy-load around active video
  const handleLoopChange = (index: number) => {
    const total = videos.length;
    const preloadAhead = 1;
    const preloadBehind = 1;

    setActiveIndex(index); // 👈 update parent state
    setVisitedIndexes(prev => {
      const newSet = new Set(prev);
      for (let i = Math.max(0, index - preloadBehind); i <= Math.min(total - 1, index + preloadAhead); i++) {
        newSet.add(i);
      }
      return newSet;
    });
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
        className="aspect-[1/1.8] h-full max-h-[90vh] w-auto max-w-[80vw] rounded-md sm:max-w-[60vw]"
        moveType="strict"
        threshold={120}
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
                feed={feed}
                storefrontData={storefrontData}
              />
            </div>
          );
        })}
      </Flicking>
    </>
  );
};
