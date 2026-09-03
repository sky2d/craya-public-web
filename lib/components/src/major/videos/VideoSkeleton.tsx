import React from "react";

export const VideoSkeleton: React.FC<{ roundedClass: string }> = ({ roundedClass }) => (
  <div className={`bg-gray-300 dark:bg-gray-700 h-full w-full animate-pulse ${roundedClass}`}></div>
);
