import React from "react";
import { IoIosArrowUp, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { COLORS } from "../../constant/colors";
import { IconButton } from "../../minor";

interface VideoOverlaysProps {
  muted?: boolean;
  isPlaying?: boolean;
  toggleMute?: () => void;
  onClick?: () => void;
  onShareClick?: () => void;
  description?: string | null;
  showViewProductsButton: boolean;
  onViewProductsClick: () => void;
  backgroundColor?: string;
  isVisible: boolean;
}

export const VideoOverlays: React.FC<VideoOverlaysProps> = ({
  muted,
  isPlaying,
  toggleMute,
  onShareClick,
  onClick,
  description,
  showViewProductsButton,
  onViewProductsClick,
  backgroundColor,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <button
        className="absolute bottom-[32%] right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white-light4 bg-opacity-50 md:bottom-[30%]"
        onClick={e => {
          e.stopPropagation();
          isPlaying && toggleMute?.();
          onClick?.();
        }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <IoMdVolumeOff color="white" size={20} /> : <IoMdVolumeHigh color="white" size={20} />}
      </button>
      {/* )} */}

      {/* Share Button */}
      {onShareClick && (
        <button
          className="absolute bottom-[15%] right-4 z-20 cursor-pointer items-center justify-center rounded-full bg-white-light4 bg-opacity-50 p-2"
          onClick={e => {
            e.stopPropagation();
            isPlaying && onShareClick();
            onClick?.();
          }}
          aria-label="Share"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Path ... */}
            <path
              d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
              stroke="white"
              strokeWidth="1.5"
            />
            <path d="M6 18L21 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Description */}
      {description && (
        <div className="absolute bottom-4 left-0 z-10 hidden w-full justify-center p-2 sm:block">
          <p className="line-clamp-2 text-center text-sm text-white-light4 sm:text-base">{description}</p>
        </div>
      )}

      {showViewProductsButton && (
        <div className="absolute bottom-4 left-0 z-10 flex w-full justify-center p-2">
          <div
            className="flex w-[98%] cursor-pointer items-center justify-center rounded-xl py-1 hover:shadow-md md:hidden"
            style={{ backgroundColor: backgroundColor || "#B2B7F1" }}
            onClick={e => {
              e.stopPropagation();
              onViewProductsClick();
            }}
          >
            <p className="text-center text-xs text-white-light4 sm:text-base">View products</p>
            <IconButton buttonStyle="flex items-center justify-center p-2 h-8 " icon={IoIosArrowUp} iconColor={COLORS.white} />
          </div>
        </div>
      )}
    </>
  );
};
