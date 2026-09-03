import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";
import React, { useState } from "react";
import carouselPreview from "../../icons/iconFiles/carouselPreview.svg";
import { Presence, StorefrontComponentProps } from "../../interfaces";
import { VideoCard } from "../../major/videos/VideoCard";

export const BuilderShoppableCarousel: React.FC<StorefrontComponentProps> = ({ data }) => {
  const isLoopExist = !!data?.loops?.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const plugins = [new Perspective({ rotate: 0.1 })];

  const handleChanged = (e: { index: number }) => {
    setActiveIndex(e.index);
  };

  const Videos = data?.loops?.filter(loop => loop.presence === Presence.CAROUSEL) || [];
  if (!isLoopExist) {
    return (
      <div className="relative flex h-[40vh] min-h-56 w-full justify-center">
        <Image src={carouselPreview} draggable={false} alt="Video Feed Preview" fill className="!relative h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div className="slider-container flex w-full items-center justify-center">
      <Flicking
        circular={true}
        plugins={plugins}
        onChanged={handleChanged}
        defaultIndex={activeIndex}
        className="flex w-full justify-center overflow-hidden"
        moveType="strict"
        size="w-full"
        bound={true}
      >
        {Videos.map((loop, index) => (
          <div key={index} className={`my-7 flex items-center justify-center`}>
            <VideoCard muted={true} loop={loop} size={"w-[300px] h-[540px]"} index={index} isPlaying={index === activeIndex} />
          </div>
        ))}
      </Flicking>
    </div>
  );
};
