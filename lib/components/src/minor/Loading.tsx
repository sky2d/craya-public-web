import Image from "next/image";
import Loader from "../icons/iconFiles/krayaGif/Loader.gif";

const loaderColors = {
  brandColor: "#7C54E9",
  white: "#FFFFFF",
};

const trackColors = {
  brandColor: `${loaderColors.brandColor}33`,
  white: "#E5E7EB",
};

type LoaderProps = {
  color?: keyof typeof loaderColors;
  size?: number;
  isCentre?: boolean;
};

export const Loading: React.FC<LoaderProps> = ({ color = "brandColor", size = 24, isCentre = false }) => {
  const loaderColor = loaderColors[color];
  const trackColor = trackColors[color];
  const loaderWidth = Math.min(size / 6, 6);

  return (
    <div className={`${isCentre ? "flex h-full w-full items-center justify-center" : "inline-flex"}`}>
      <div
        className="animate-spin rounded-full border-solid"
        style={{
          borderColor: `${loaderColor} ${trackColor} ${trackColor} ${trackColor}`,
          borderWidth: `${loaderWidth}px`,
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

type GifLoaderProps = {
  size?: number;
  isCentre?: boolean;
};

export const LoadingWithGif: React.FC<GifLoaderProps> = ({ size = 100, isCentre = false }) => {
  return (
    <div className={`${isCentre ? "flex h-full w-full items-center justify-center" : "inline-flex"}`}>
      <Image
        src={Loader}
        draggable={false}
        alt="Loading..."
        width={size}
        height={size}
        unoptimized // important for GIFs
        priority
      />
    </div>
  );
};
