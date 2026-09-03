"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { INITIAL_LOOP_DATA, useLoopsContext } from "@/provider/LoopsProvider";
import { Modal } from "antd";
import { Loop, LoopStatus } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { VideoCard } from "components/src/major/videos/VideoCard";
import { Button2 } from "components/src/minor";
import { useState } from "react";
import { LoopDetail } from "./LoopDetail";
import { ProductTaggingSection } from "./ProductTaggingSection";

export const Loops = () => {
  const { loops } = useLoopsContext();
  const [activeTab, setActiveTab] = useState("Active");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLoop, setSelectedLoop] = useState<Loop | null>(null);
  const [hoveredLoopId, setHoveredLoopId] = useState<string | null>(null);

  const filteredLoops = loops.filter(loop => loop.status === (activeTab === "Active" ? LoopStatus.ACTIVE : LoopStatus.ARCHIVE));

  const handleEditClick = (loop: Loop) => {
    setSelectedLoop(loop);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedLoop(null);
  };

  return (
    <div className="p-1">
      <Modal
        title={selectedLoop ? "Edit Loop" : "Add Loop"}
        open={isAddModalOpen}
        centered
        onCancel={handleCloseModal}
        width={800}
        footer={null}
        destroyOnClose={true}
      >
        <LoopDetail loop={selectedLoop || INITIAL_LOOP_DATA} onClose={handleCloseModal} />
      </Modal>

      {/* Header Tabs */}
      <WhiteBackgroundWrapper className="h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("Active")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "Active" ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-gray-500 hover:bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("Archive")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "Archive" ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-gray-500 hover:bg-gray-200"
              }`}
            >
              Archive
            </button>
          </div>
          <div className="w-32">
            <Button2 label="Add Loop" type={ButtonType.PRIMARY} handleClick={() => setIsAddModalOpen(true)} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLoops.map(loop => (
            <div
              key={loop.id}
              className="flex h-[400px] overflow-hidden rounded-2xl border border-white-light1 shadow-md relative group"
              onMouseEnter={() => setHoveredLoopId(loop.id || null)}
              onMouseLeave={() => setHoveredLoopId(null)}
            >
              <div className="relative aspect-[0.665] flex-shrink-0 cursor-pointer">
                <VideoCard loop={loop} isPlaying={hoveredLoopId === loop.id} />

                {/* Play Button Overlay on Hover */}
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredLoopId === loop.id ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white-light4 shadow-lg backdrop-blur-sm">
                    <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 mb-2 flex w-full items-center justify-center space-x-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleEditClick(loop);
                    }}
                    className="z-10 rounded-lg bg-blue-500/80 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 backdrop-blur-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    className={`rounded-lg px-4 py-1 text-sm font-semibold transition-all duration-200 ${
                      loop.status === LoopStatus.ACTIVE
                        ? "bg-brand-color1/80 text-white shadow-sm backdrop-blur-sm"
                        : "bg-black/30 text-white/50 backdrop-blur-sm"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    className={`rounded-lg px-4 py-1 text-sm font-semibold transition-all duration-200 ${
                      loop.status === LoopStatus.ARCHIVE
                        ? "bg-brand-color1/80 text-white shadow-sm backdrop-blur-sm"
                        : "bg-black/30 text-white/50 backdrop-blur-sm"
                    }`}
                  >
                    Archive
                  </button>
                </div>
              </div>

              <ProductTaggingSection loop={loop} />
            </div>
          ))}
        </div>
      </WhiteBackgroundWrapper>
    </div>
  );
};
