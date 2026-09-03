"use client";

import RulerIcon from "@/assets/icons/Ruler.svg?component";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

interface SizeChartProps {
  primaryColor?: string;
  imageUrl: string;
  alt?: string;
}

export default function SizeChart({ primaryColor, imageUrl, alt = "Size Chart" }: SizeChartProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        style={{
          border: `1px solid ${primaryColor}`,
          color: primaryColor,
          backgroundColor: "transparent",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = primaryColor ?? "#000";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = primaryColor ?? "#000";
        }}
        onClick={() => setVisible(true)}
        className="rounded-[8px] px-2 py-1 text-xs font-semibold"
      >
        Size chart
        <RulerIcon strokeWidth={1} className="ml-2 inline h-4 w-4 text-sm font-semibold hover:text-white-light4" />
      </button>

      <Modal open={visible} footer={null} onCancel={() => setVisible(false)} centered width={600}>
        <div className="relative h-[400px] w-full sm:h-[600px]">
          <Image src={imageUrl} alt={alt} fill style={{ objectFit: "contain" }} priority />
        </div>
      </Modal>
    </>
  );
}
