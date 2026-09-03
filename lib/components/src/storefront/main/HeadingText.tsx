import React, { memo } from "react";
import { ImageSizeType, StorefrontComponentProps } from "../../interfaces";
import { HEADING_TEXT_PREVIEW_DATA } from "../data";

const HeadingTextComponent: React.FC<StorefrontComponentProps> = ({ data = HEADING_TEXT_PREVIEW_DATA }) => {
  const backgroundColor = data.store?.primaryColor ?? "transparent"; // Ensures valid CSS
  const textColor = "text-white-light4";

  const textSizeMap = {
    [ImageSizeType.SMALL]: "text-base sm:text-lg md:text-[2vw]",
    [ImageSizeType.MEDIUM]: "text-xl sm:text-2xl md:text-[3.3vw]",
    [ImageSizeType.LARGE]: "text-3xl sm:text-3xl md:text-[4.8vw]",
  };

  const paddingMap = {
    [ImageSizeType.SMALL]: "py-7",
    [ImageSizeType.MEDIUM]: "py-[50px]",
    [ImageSizeType.LARGE]: "py-[70px]",
  };

  const textSize = data.imageSize ? textSizeMap[data.imageSize] : textSizeMap[ImageSizeType.LARGE];
  const heightClass = data.imageSize ? paddingMap[data.imageSize] : paddingMap[ImageSizeType.LARGE];

  return (
    <div
      className={`relative flex h-full items-center justify-center text-center ${textColor} ${heightClass} ${textSize}`}
      style={{ backgroundColor }}
    >
      {data.texts?.[0] ?? ""}
    </div>
  );
};

export default HeadingTextComponent;

// export const HeadingText = memo(HeadingTextComponent);
export const HeadingText = memo(HeadingTextComponent);
