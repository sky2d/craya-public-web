import React from "react";

interface ProgressBarProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

export const ProgressBar_2: React.FC<ProgressBarProps> = ({ progress = 0, size = 56, strokeWidth = 5 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute" style={{ transform: "rotate(-90deg)" }}>
        {/* Background Circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F3D67E" strokeWidth={strokeWidth} fill="none" />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.9s ease-in-out",
          }}
        />
      </svg>
      {/* Center Text */}
      <span className="text-sm font-bold text-[#F3D67E]">{progress}%</span>
    </div>
  );
};
