import React from "react";
import { InfoPopover } from "./InfoPopoverProps";

interface StatDetail {
  label: string;
  value: string | number;
  change?: string;
  changeColor?: "red" | "green";
}

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  stats: StatDetail[];
  infoText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, icon, stats, infoText }) => {
  return (
    <div className="border-gray-200 rounded-xl border-[1px] border-[#CDCDCD] bg-[#FFFFFF] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100/80 text-orange-500">{icon}</div>
          <h3 className="text-[clamp(14px,1.2vw,22px)] font-medium">{title}</h3>
        </div>
        {infoText && (
          <InfoPopover infoText={infoText}>
            <i className="hover:text-gray-600 border-1 cursor-pointer rounded-full text-black-dark1">i</i>
          </InfoPopover>
        )}
      </div>

      <div className="mt-6 flex justify-between text-center">
        {stats.map(stat => (
          <div key={stat.label} className="flex-1">
            <p className="text-[clamp(10px,0.8vw,15px)] font-normal text-[#8B8D97]">{stat.label}</p>
            <p className="mt-1 text-[clamp(14px,1.1vw,20px)] font-medium">{stat.value}</p>
            {stat.change && (
              <p className={`text-[clamp(8px,0.6vw,14px)] font-medium ${stat.changeColor === "red" ? "text-red-500" : "text-green-500"}`}>
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
