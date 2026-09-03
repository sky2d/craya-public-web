import { Skeleton } from "antd";
import React from "react";

interface ImageSkeletonLoaderProps {
  aspectRatio?: string; // default to 1/1.6
  className?: string;
  rounded?: boolean;
}

const ImageSkeletonLoader: React.FC<ImageSkeletonLoaderProps> = ({ aspectRatio = "1/1.6", className = "", rounded }) => {
  return rounded ? (
    <Skeleton.Avatar
      active
      shape="circle"
      style={{
        aspectRatio,
        width: "100%",
        height: "100%",
      }}
      className={`absolute left-0 top-0 z-0 h-full !w-full ${className}`}
    />
  ) : (
    <Skeleton.Image
      active
      style={{
        aspectRatio,
        width: "100%",
        height: "100%",
      }}
      className={`absolute left-0 top-0 z-0 h-full !w-full rounded-[10px] ${className}`}
    />
  );
};

export default ImageSkeletonLoader;
