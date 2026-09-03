import React from "react";
import { useInView } from "react-intersection-observer";
import { Loop } from "../../../interfaces";
import { VideoCard } from "../../../major";

interface VideoCardWrapperProps {
  loop: Loop;
  index: number;
  isActive: boolean;
  primaryColor?: string;
  openModal: (index: number) => void;
}

export const VideoCardWrapper: React.FC<VideoCardWrapperProps> = ({ loop, index, isActive, primaryColor, openModal }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  return (
    <div ref={ref} className="m-2 flex h-full max-w-full items-start justify-center overflow-hidden rounded-md">
      <VideoCard
        loop={inView ? loop : undefined}
        size="max-h-[90dvh] w-full aspect-[1/1.8]"
        isPlaying={isActive}
        backgroundColor={primaryColor}
        onClick={() => openModal(index)}
        muted
      />
    </div>
  );
};
