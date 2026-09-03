"use client";

import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { INITIAL_LOOP_DATA, useLoopsContext } from "@/provider/LoopsProvider";
import { LoopStatus } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { VideoCard } from "components/src/major/videos/VideoCard";
import { Button2 } from "components/src/minor";
import { Modal } from "antd";
import { useState } from "react";
import { ProductTaggingSection } from "./ProductTaggingSection";
import { LoopDetail } from "./LoopDetail";

export const Loops = () => {
  const { loops } = useLoopsContext();
  const [activeTab, setActiveTab] = useState("Active");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredLoops = loops.filter(
    loop => loop.status === (activeTab === "Active" ? LoopStatus.ACTIVE : LoopStatus.ARCHIVE)
  );

  return (
    <div className="p-1">
      <Modal
        title="Add Loop"
        open={isAddModalOpen}
        centered
        onCancel={() => setIsAddModalOpen(false)}
        width={800}
        footer={null}
        destroyOnClose={true}
      >
        <LoopDetail loop={INITIAL_LOOP_DATA} onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      {/* Header Tabs */}
      <WhiteBackgroundWrapper className="h-screen">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("Active")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "Active" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-gray-200 bg-transparent"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("Archive")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "Archive" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-gray-200 bg-transparent"
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
            <div key={loop.id} className="flex h-[400px] overflow-hidden rounded-2xl border border-white-light1 shadow-md">
              <div className="relative aspect-[0.665] flex-shrink-0">
                <VideoCard loop={loop} />
                <div className="absolute bottom-0 mb-2 flex w-full items-center justify-center space-x-2">
                  <button
                    onClick={() => {
                      /* Just decorative? No, maybe they don't do anything here, it just indicates status */
                    }}
                    className={`rounded-lg px-4 text-sm font-semibold transition-all duration-200 ${
                      loop.status === LoopStatus.ACTIVE ? "bg-brand-color1 text-white-light4 shadow-sm" : "text-white-light4 opacity-10"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => {
                      /* Status buttons in card are decorative based on current status */
                    }}
                    className={`rounded-lg px-4 text-sm font-semibold transition-all duration-200 ${
                      loop.status === LoopStatus.ARCHIVE ? "bg-brand-color1 text-white-light4 shadow-sm" : "bg-[#515052A3] text-white-light4"
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
