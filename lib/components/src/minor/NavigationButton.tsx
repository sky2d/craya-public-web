"use client";

import Flicking from "@egjs/react-flicking";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";

type Direction = "up" | "down" | "left" | "right";

interface NavigationButtonProps {
  direction: Direction;
  isFlickingReady: boolean;
  carouselRef: React.RefObject<Flicking>;
  show?: boolean;
  primaryColor?: string;
  handleFlickingNavigation?: (isReady: boolean, ref: React.RefObject<Flicking>, dir: "next" | "prev") => void;
}

export default function NavigationButton({
  direction,
  primaryColor,
  isFlickingReady,
  show,
  carouselRef,
  handleFlickingNavigation,
}: NavigationButtonProps) {
  const icons: Record<Direction, JSX.Element> = {
    up: <FaChevronUp />,
    down: <FaChevronDown />,
    left: <FaChevronLeft />,
    right: <FaChevronRight />,
  };

  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      className="aspect-square rounded-full p-2 focus:outline-none disabled:opacity-50 sm:block"
      onClick={() => {
        if (handleFlickingNavigation) {
          const dirMap: Record<Direction, "next" | "prev"> = {
            left: "prev",
            up: "prev",
            right: "next",
            down: "next",
          };
          handleFlickingNavigation(isFlickingReady ?? false, carouselRef, dirMap[direction]);
        }
      }}
      disabled={!isFlickingReady}
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200`}
        style={{
          backgroundColor: `${primaryColor}50` || "transparent",
          color: primaryColor || "inherit",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = primaryColor || "";
          e.currentTarget.style.color = "#c4b8b7";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = `${primaryColor}50`;
          e.currentTarget.style.color = primaryColor || "inherit";
        }}
      >
        {icons[direction]}
      </span>
    </button>
  );
}
