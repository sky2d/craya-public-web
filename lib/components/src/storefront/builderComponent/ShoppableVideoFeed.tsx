import { default as Flicking } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";
import React, { useState } from "react";
import videoFeedPreview from "../../icons/iconFiles/videoFeedPreview.svg";
import { Presence, StorefrontComponentProps } from "../../interfaces";
import { VideoCard } from "../../major/videos/VideoCard";
import { createStorefrontData } from "../../services/storefront";
import { BuilderFeedVideoCard } from "./ProductGrid";

export const BuilderShoppableVideoFeed: React.FC<StorefrontComponentProps> = ({ data, handlerFunction }) => {
  const [currLoopId, setCurrLoopId] = useState(0);

  const primaryColor = data?.store?.primaryColor;
  const Videos = data?.loops?.filter(loop => loop.presence === Presence.FEED) || [];
  const isLoopExist = Videos.length > 0;

  const handleLoopChange = (id: number) => {
    setCurrLoopId(id);
  };

  // Show preview image if no data or no feed videos
  if (!isLoopExist) {
    return (
      <div className="relative flex h-[40vh] min-h-56 w-full justify-center">
        <Image src={videoFeedPreview} draggable={false} alt="Video Feed Preview" fill className="!relative h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`grid h-full w-full p-2 ${
          Videos[currLoopId]?.products?.length ? "grid-cols-[repeat(auto-fill,_minmax(22vw,_1fr))]" : "grid-cols-1"
        } place-content-center place-items-center gap-2`}
      >
        {/* Video Section */}
        <div className="flex h-full max-h-[70vh] w-auto justify-center" style={{ aspectRatio: "1/1.8" }}>
          <Flicking
            circular={true}
            horizontal={false}
            align="center"
            className="h-full w-full"
            threshold={120}
            moveType="strict"
            onChanged={({ index }) => handleLoopChange(index)}
          >
            {Videos.map((item, id) => (
              <div key={id} className="flicking-panel h-full w-full">
                <VideoCard
                  loop={item}
                  size="h-full w-full "
                  muted={true}
                  handlerFunction={handlerFunction}
                  isPlaying={id === currLoopId}
                  backgroundColor={primaryColor}
                  index={id}
                />
              </div>
            ))}
          </Flicking>
        </div>

        {/* Product Grid */}
        {(() => {
          const storefrontData = createStorefrontData({
            products: Videos[currLoopId]?.products,
            store: data?.store,
          });

          return storefrontData.products.length > 0 ? <BuilderFeedVideoCard key={storefrontData.id || currLoopId} data={storefrontData} /> : null;
        })()}
      </div>
    </div>
  );
};
