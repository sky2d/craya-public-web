"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Loop, StorefrontActions, StorefrontComponentData, StorefrontHandlerFunction, WishlistItems } from "../../interfaces";
import { createStorefrontData } from "../../services/storefront";
import { ProductDrawer } from "./ProductDrawer";
import { VideoOverlays } from "./VideoOverlay";

type VideoCardProps = {
  index?: number;
  loop?: Loop;
  handlerFunction?: StorefrontHandlerFunction;
  size?: string;
  isPlaying?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  storefrontData?: StorefrontComponentData;
  wishlistItems?: WishlistItems[];
  muted?: boolean;
  toggleMute?: () => void;
  showProduct?: boolean;
};

const VideoLoader: React.FC = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black-dark1 bg-opacity-50">
    <FaSpinner className="animate-spin text-4xl text-white-light4" />
  </div>
);

export const VideoCard = React.memo(function VideoCard(props: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const [isLoading, setIsLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  const playVid = async () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.muted = props.muted ?? true;
      if (videoRef.current.readyState < 3) {
        setIsLoading(true);
      }
      try {
        await videoRef.current.play().catch(() => {
          setIsLoading(false);
        });
      } catch {
        setIsLoading(false);
      }
    } else if (videoRef.current && !videoRef.current.paused) {
      setIsLoading(false);
    }
  };
  const pauseVid = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };
  useEffect(() => {
    if (!props.loop?.video?.fileUrl) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
      setVideoSrc(undefined);
      setIsLoading(false);
    } else {
      setVideoSrc(props.loop.video.fileUrl);
      setIsLoading(false);
    }
  }, [props.loop?.video?.fileUrl]);

  useEffect(() => {
    if (props.isPlaying && videoSrc && videoRef.current) {
      videoRef.current.muted = props.muted ?? true;
      playVid();
    } else if (videoRef.current) {
      pauseVid();
    }
  }, [props.isPlaying, videoSrc, props.muted]);

  const handleMouseDown = () => {
    holdTimeout.current = setTimeout(() => {
      pauseVid();
    }, 500);
  };

  const handleMouseUp = () => {
    if (holdTimeout.current && props.isPlaying) {
      clearTimeout(holdTimeout.current);
      playVid();
    }
  };

  const handleShareClick = () => {
    if (props.handlerFunction && props.loop) {
      props.handlerFunction(StorefrontActions.SHARE_PRESS, createStorefrontData({ loops: [props.loop] }));
    }
  };

  const videoRoundingClass = !props.onClick ? "rounded-lg" : "sm:rounded-lg";

  return (
    <div className={`${props.size} relative h-full flex-col`} onClick={props.onClick}>
      <>
        {videoSrc ? (
          <video
            key={videoSrc || props.index}
            className={`h-full w-full bg-black-dark1 object-cover ${videoRoundingClass} ${isLoading ? "opacity-50" : ""}`}
            src={`${videoSrc}#t=0.001`}
            loop
            playsInline
            muted={props.muted}
            ref={videoRef}
            preload="auto"
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onContextMenu={e => e.preventDefault()}
          />
        ) : (
          <div className={`h-full w-full bg-black-dark1 ${videoRoundingClass} flex items-center justify-center`}>
            <FaSpinner className="animate-spin text-2xl text-white-light4" />
          </div>
        )}

        {isLoading && <VideoLoader />}
        {!isDrawerOpen && (
          <>
            <VideoOverlays
              isVisible={!isLoading}
              isPlaying={props.isPlaying}
              muted={props.muted}
              onClick={props.onClick}
              toggleMute={props.toggleMute}
              onShareClick={handleShareClick}
              description={props.loop?.description}
              showViewProductsButton={!!props.showProduct && !!props.storefrontData?.products?.length}
              onViewProductsClick={openDrawer}
              backgroundColor={props.backgroundColor}
            />
          </>
        )}
        <ProductDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          storefrontData={props.storefrontData}
          wishlistItems={props.wishlistItems}
          handlerFunction={props.handlerFunction}
        />
      </>
    </div>
  );
});
