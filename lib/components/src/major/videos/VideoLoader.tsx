import React from "react";
import { FaSpinner } from "react-icons/fa";

export const VideoLoader: React.FC = () => (
  <div className="bg-black absolute inset-0 z-10 flex items-center justify-center bg-opacity-50">
    <FaSpinner className="text-white animate-spin text-4xl" />
  </div>
);
