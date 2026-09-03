import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { Loop } from "../../../interfaces";
import NavigationButton from "../../../minor/NavigationButton";
import { handleFlickingNavigation } from "../../../utils/flickingNavigation";
import { getCardWidthClass } from "../../../utils/videoCard";
import { VideoCardWrapper } from "./VideoCardWrapper";

interface HorizontalVideoCarouselProps {
  videos: Loop[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  openModal: (index: number) => void;
  primaryColor?: string;
}

export const HorizontalVideoCarousel: React.FC<HorizontalVideoCarouselProps> = ({ videos, activeIndex, setActiveIndex, openModal, primaryColor }) => {
  const plugins = [new Perspective({ rotate: 0.1 })];
  const windowWidth = useWindowWidth();
  const [isFlickingReady, setIsFlickingReady] = useState(false);
  const length = videos.length;
  const carouselRef = useRef<Flicking | null>(null);

  if (!length) return null;

  const handleChanged = (e: { index: number }) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="relative flex w-full flex-col justify-center">
      <Flicking
        circular={true}
        ref={el => {
          if (el) {
            carouselRef.current = el;
            setIsFlickingReady(true);
          }
        }}
        plugins={plugins}
        onChanged={handleChanged}
        className="flex w-full justify-center overflow-hidden"
        moveType="strict"
        bound={true}
        index={activeIndex}
      >
        {videos.map((loop, index) => {
          const distance = Math.abs(activeIndex - index);
          const opacity = Math.max(0.3, 1 - distance * 0.2);

          return (
            <div
              key={index}
              className={`m-2 flex h-full max-w-full items-start justify-center overflow-hidden rounded-md text-3xl ${getCardWidthClass(windowWidth, videos.length)}`}
              style={{ opacity }}
            >
              <VideoCardWrapper loop={loop} index={index} isActive={index === activeIndex} primaryColor={primaryColor} openModal={openModal} />
            </div>
          );
        })}
      </Flicking>
      {length > 1 && (
        <>
          <div className="flex w-full items-center justify-center">
            {videos.length > 1 && (
              <>
                <NavigationButton
                  isFlickingReady={isFlickingReady}
                  direction="left"
                  show={true}
                  primaryColor={primaryColor}
                  carouselRef={carouselRef}
                  handleFlickingNavigation={handleFlickingNavigation}
                />
                <NavigationButton
                  isFlickingReady={isFlickingReady}
                  direction="right"
                  show={true}
                  primaryColor={primaryColor}
                  carouselRef={carouselRef}
                  handleFlickingNavigation={handleFlickingNavigation}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
