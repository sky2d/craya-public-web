import { Perspective } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { Loop } from "../../../interfaces";
import { VideoCard } from "../../../major";
import { getCardWidthClass } from "../../../utils/cardWidthUtil";
import { handleFlickingNavigation } from "../../../utils/flickingNavigation";

interface CarouselVideoListProps {
  videos: Loop[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  openModal: (index: number) => void;
  primaryColor?: string;
}

export const CarouselVideoList: React.FC<CarouselVideoListProps> = ({ videos, activeIndex, setActiveIndex, openModal, primaryColor }) => {
  const carouselRef = useRef<Flicking | null>(null);
  const plugins = [new Perspective({ rotate: 0.1 })];
  const windowWidth = useWindowWidth();
  const [isFlickingReady, setIsFlickingReady] = useState(false);
  const length = videos.length;

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
              <VideoCard
                loop={loop}
                size="max-h-[90dvh] w-auto aspect-[1/1.8]"
                isPlaying={index === activeIndex}
                backgroundColor={primaryColor}
                onClick={() => openModal(index)}
                muted={true}
              />
            </div>
          );
        })}
      </Flicking>
      {length > 1 && (
        <>
          <div className="flex w-full items-center justify-center">
            <button
              className="hover:bg-gray-100 rounded-full p-2 focus:outline-none sm:block"
              onClick={() => handleFlickingNavigation(isFlickingReady, carouselRef, "prev")}
              disabled={!isFlickingReady}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${primaryColor}50` || "transparent",
                  color: primaryColor || "inherit",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = primaryColor || "";
                  e.currentTarget.style.color = `#c4b8b7`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}50`;
                  e.currentTarget.style.color = primaryColor || "inherit";
                }}
              >
                <MdOutlineArrowBackIos />
              </span>
            </button>
            <button
              className="hover:bg-gray-100 rounded-full p-2 focus:outline-none sm:block"
              onClick={() => handleFlickingNavigation(isFlickingReady, carouselRef, "next")}
              disabled={!isFlickingReady}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${primaryColor}50` || "transparent",
                  color: primaryColor || "inherit",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = primaryColor || "";
                  e.currentTarget.style.color = `#c4b8b7`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}50`;
                  e.currentTarget.style.color = primaryColor || "inherit";
                }}
              >
                <MdOutlineArrowForwardIos />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
